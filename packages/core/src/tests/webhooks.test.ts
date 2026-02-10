/// <reference types="jest" />

import * as crypto from 'crypto';
import { webhooks, SignatureVerificationError } from '../index';

describe('Webhooks', () => {
  const secret = 'test-secret-key';

  function createSignedPayload(payload: object) {
    const body = JSON.stringify(payload);
    const signature = crypto.createHmac('sha256', secret).update(body).digest('hex');
    return { body, signature };
  }

  describe('constructEvent', () => {
    it('should verify and parse valid webhook', async () => {
      const payload = {
        entity: 'ACCOUNT',
        action: 'CREATE',
        data: { id: '123', email: 'test@example.com' },
        metadata: {
          timestamp: new Date().toISOString(),
          source: 'core-api',
          eventId: 'evt_123',
          version: '1.0',
        },
      };
      const { body, signature } = createSignedPayload(payload);

      const event = await webhooks.constructEvent(body, signature, secret);

      expect(event.entity).toBe('ACCOUNT');
      expect(event.action).toBe('CREATE');

      // Type narrowing: after checking entity, data is typed as AccountData
      if (event.entity === 'ACCOUNT') {
        expect(event.data.email).toBe('test@example.com');
      }
    });

    it('should throw on invalid signature', async () => {
      const { body } = createSignedPayload({ test: true });

      await expect(webhooks.constructEvent(body, 'invalid-signature', secret)).rejects.toThrow(
        SignatureVerificationError
      );
    });

    it('should throw on missing signature', async () => {
      await expect(webhooks.constructEvent('{}', null, secret)).rejects.toThrow(SignatureVerificationError);
    });

    it('should throw on missing secret', async () => {
      await expect(webhooks.constructEvent('{}', 'sig', '')).rejects.toThrow(SignatureVerificationError);
    });

    it('should throw on invalid JSON', async () => {
      const invalidBody = 'not json';
      const signature = crypto.createHmac('sha256', secret).update(invalidBody).digest('hex');

      await expect(webhooks.constructEvent(invalidBody, signature, secret)).rejects.toThrow(
        SignatureVerificationError
      );
    });

    it('should handle Buffer payload', async () => {
      const payload = { entity: 'WORKSPACE', action: 'UPDATE', data: { id: '456' } };
      const body = JSON.stringify(payload);
      const signature = crypto.createHmac('sha256', secret).update(body).digest('hex');
      const bufferPayload = Buffer.from(body, 'utf-8');

      const event = await webhooks.constructEvent(bufferPayload, signature, secret);

      expect(event.entity).toBe('WORKSPACE');
      expect(event.action).toBe('UPDATE');
    });

    it('should provide descriptive error for missing signature', async () => {
      await expect(webhooks.constructEvent('{}', null, secret)).rejects.toThrow(
        'No webhook signature found. Expected X-Webhook-Signature header to be set.'
      );
    });

    it('should provide descriptive error for missing secret', async () => {
      await expect(webhooks.constructEvent('{}', 'sig', '')).rejects.toThrow(
        'No webhook secret provided. Make sure CORE_WEBHOOK_SECRET is set.'
      );
    });
  });

  describe('verifySignature', () => {
    it('should return true for valid signature', async () => {
      const { body, signature } = createSignedPayload({ test: true });
      const result = await webhooks.verifySignature(body, signature, secret);
      expect(result).toBe(true);
    });

    it('should return false for invalid signature', async () => {
      const result = await webhooks.verifySignature('{}', 'invalid', secret);
      expect(result).toBe(false);
    });

    it('should return false for missing signature', async () => {
      const result = await webhooks.verifySignature('{}', null, secret);
      expect(result).toBe(false);
    });
  });

  describe('SignatureVerificationError', () => {
    it('should have correct properties', () => {
      const error = new SignatureVerificationError('test message');
      expect(error.name).toBe('SignatureVerificationError');
      expect(error.type).toBe('SignatureVerificationError');
      expect(error.message).toBe('test message');
      expect(error instanceof Error).toBe(true);
    });
  });

  describe('extractPlatformData', () => {
    it('should extract only allowed fields', () => {
      const platformData = {
        profilePicUrl: 'https://example.com/pic.jpg',
        alternativeId: '12345',
        unknownField: 'should be ignored',
      };

      const result = webhooks.extractPlatformData(platformData, ['profilePicUrl', 'alternativeId']);

      expect(result).toEqual({
        profilePicUrl: 'https://example.com/pic.jpg',
        alternativeId: '12345',
      });
      expect(result).not.toHaveProperty('unknownField');
    });

    it('should return empty object for null/undefined', () => {
      expect(webhooks.extractPlatformData(null, ['foo'])).toEqual({});
      expect(webhooks.extractPlatformData(undefined, ['foo'])).toEqual({});
    });

    it('should skip undefined values', () => {
      const platformData = {
        profilePicUrl: 'https://example.com/pic.jpg',
        alternativeId: undefined,
      };

      const result = webhooks.extractPlatformData(platformData, ['profilePicUrl', 'alternativeId']);

      expect(result).toEqual({
        profilePicUrl: 'https://example.com/pic.jpg',
      });
    });

    it('should handle empty allowedFields', () => {
      const platformData = { foo: 'bar' };
      const result = webhooks.extractPlatformData(platformData, []);
      expect(result).toEqual({});
    });

    it('should return empty object for non-object types', () => {
      expect(webhooks.extractPlatformData('string', ['foo'])).toEqual({});
      expect(webhooks.extractPlatformData(123, ['foo'])).toEqual({});
      expect(webhooks.extractPlatformData(true, ['foo'])).toEqual({});
    });

    it('should handle missing fields gracefully', () => {
      const platformData = {
        profilePicUrl: 'https://example.com/pic.jpg',
      };

      const result = webhooks.extractPlatformData(platformData, [
        'profilePicUrl',
        'alternativeId',
        'language',
      ]);

      expect(result).toEqual({
        profilePicUrl: 'https://example.com/pic.jpg',
      });
    });

    it('should preserve null values (only skips undefined)', () => {
      const platformData = {
        profilePicUrl: null,
        alternativeId: '12345',
      };

      const result = webhooks.extractPlatformData(platformData, ['profilePicUrl', 'alternativeId']);

      expect(result).toEqual({
        profilePicUrl: null,
        alternativeId: '12345',
      });
    });
  });
});
