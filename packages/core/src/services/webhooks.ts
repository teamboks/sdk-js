import type { WebhookEvent } from '../types';

export class SignatureVerificationError extends Error {
  readonly type = 'SignatureVerificationError';

  constructor(message: string) {
    super(message);
    this.name = 'SignatureVerificationError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SignatureVerificationError);
    }
  }
}

async function computeHmacSha256(payload: string, secret: string): Promise<string> {
  if (typeof globalThis.process !== 'undefined' && globalThis.process.versions?.node) {
    const crypto = await import('crypto');
    return crypto.createHmac('sha256', secret).update(payload).digest('hex');
  }

  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(payload);

  const key = await crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);

  const signature = await crypto.subtle.sign('HMAC', key, messageData);
  const hashArray = Array.from(new Uint8Array(signature));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

function payloadToString(payload: string | Buffer | ArrayBuffer): string {
  if (typeof payload === 'string') {
    return payload;
  }
  if (payload instanceof ArrayBuffer) {
    return new TextDecoder().decode(payload);
  }
  return payload.toString('utf-8');
}

export async function constructEvent(
  payload: string | Buffer | ArrayBuffer,
  signature: string | null | undefined,
  secret: string
): Promise<WebhookEvent> {
  if (!signature) {
    throw new SignatureVerificationError(
      'No webhook signature found. Expected X-Webhook-Signature header to be set.'
    );
  }

  if (!secret) {
    throw new SignatureVerificationError('No webhook secret provided. Make sure CORE_WEBHOOK_SECRET is set.');
  }

  const payloadString = payloadToString(payload);

  const expectedSignature = await computeHmacSha256(payloadString, secret);

  if (!timingSafeEqual(signature, expectedSignature)) {
    throw new SignatureVerificationError(
      'Webhook signature verification failed. The signature does not match the expected value. ' +
      'Make sure you are using the correct webhook secret and passing the raw request body.'
    );
  }

  try {
    return JSON.parse(payloadString) as WebhookEvent;
  } catch {
    throw new SignatureVerificationError(
      'Failed to parse webhook payload as JSON. Make sure you are passing the raw request body.'
    );
  }
}

export async function verifySignature(
  payload: string | Buffer | ArrayBuffer,
  signature: string | null | undefined,
  secret: string
): Promise<boolean> {
  try {
    await constructEvent(payload, signature, secret);
    return true;
  } catch {
    return false;
  }
}

export function extractPlatformData(platformData: unknown, allowedFields: string[]): Record<string, unknown> {
  if (!platformData || typeof platformData !== 'object') {
    return {};
  }

  const data = platformData as Record<string, unknown>;
  const result: Record<string, unknown> = {};
  const allowedSet = new Set(allowedFields);

  for (const [key, value] of Object.entries(data)) {
    if (allowedSet.has(key) && value !== undefined) {
      result[key] = value;
    }
  }

  return result;
}

