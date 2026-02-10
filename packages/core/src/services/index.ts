let apiKey: string | null = null;

export const init = (key: string): void => {
  apiKey = key;
};

export { apiKey };

export * as permissions from './permissions';
export * as features from './features';
export * as webhooks from './webhooks';
export { SignatureVerificationError } from './webhooks';
