/// <reference types="jest" />

import type { jest } from '@jest/globals';
import { init, apiKey, permissions, API_CONFIG } from '../index';

// Extend the global object with fetch
declare global {
  // eslint-disable-next-line no-var
  var fetch: jest.Mock;
}

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('@teamboks/core', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('API Configuration', () => {
    it('should export API_CONFIG with correct structure', () => {
      expect(API_CONFIG).toBeDefined();
      expect(API_CONFIG.BASE_URL).toBe('https://core.teamboks.com');
      expect(API_CONFIG.ENDPOINTS.PERMISSIONS).toBe('/v1/permissions');
    });
  });

  describe('API Key Management', () => {
    it('should initialize API key', () => {
      init('test-api-key');
      expect(apiKey).toBe('test-api-key');
    });
  });

  describe('Permissions Service', () => {
    it('should throw error when API key is missing', async () => {
      await expect(
        permissions.check({
          feature: 'test',
          action: 'read',
          role: 'user',
          apiKey: null,
        })
      ).rejects.toThrow('Missing API key.');
    });

    it('should handle successful API response', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: () => Promise.resolve(true),
      };
      mockFetch.mockResolvedValueOnce(mockResponse as Response);

      const result = await permissions.check({
        feature: 'dashboard',
        action: 'read',
        role: 'admin',
        apiKey: 'test-key',
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('https://core.teamboks.com/v1/permissions'),
        expect.objectContaining({
          headers: {
            'X-API-KEY': 'test-key',
            'Content-Type': 'application/json',
          },
        })
      );

      expect(result).toEqual({
        status: 200,
        canActivate: true,
      });
    });

    it('should handle forbidden API response', async () => {
      const mockResponse = {
        ok: false,
        status: 403,
        json: () =>
          Promise.resolve({
            message: 'No permission found',
            error: 'Forbidden',
            statusCode: 403,
          }),
      };
      mockFetch.mockResolvedValueOnce(mockResponse as Response);

      const result = await permissions.check({
        feature: 'dashboard',
        action: 'write',
        role: 'user',
        apiKey: 'test-key',
      });

      expect(result).toEqual({
        status: 403,
        canActivate: false,
        error: 'Forbidden',
        message: 'No permission found',
      });
    });
  });
});
