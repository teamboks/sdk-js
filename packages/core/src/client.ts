import * as permissionsService from './services/permissions';
import * as featuresService from './services/features';
import * as webhooksService from './services/webhooks';
import type { WebhookEvent } from './types';

export interface TeamboksCoreConfig {
  apiKey: string;
}

export class PermissionsClient {
  constructor(private apiKey: string) { }

  async check(params: Omit<Parameters<typeof permissionsService.check>[0], 'apiKey'>) {
    return permissionsService.check({
      ...params,
      apiKey: this.apiKey,
    });
  }
}

export class FeaturesClient {
  constructor(private apiKey: string) { }

  async check(params: Omit<Parameters<typeof featuresService.check>[0], 'apiKey'>) {
    return featuresService.check({
      ...params,
      apiKey: this.apiKey,
    });
  }
}

export class WebhooksClient {
  async constructEvent(
    payload: string | Buffer | ArrayBuffer,
    signature: string | null | undefined,
    secret: string
  ): Promise<WebhookEvent> {
    return webhooksService.constructEvent(payload, signature, secret);
  }

  async verifySignature(
    payload: string | Buffer | ArrayBuffer,
    signature: string | null | undefined,
    secret: string
  ): Promise<boolean> {
    return webhooksService.verifySignature(payload, signature, secret);
  }
}

export class TeamboksCore {
  public permissions: PermissionsClient;
  public features: FeaturesClient;
  public webhooks: WebhooksClient;

  constructor(config: TeamboksCoreConfig) {
    if (!config.apiKey) {
      throw new Error('apiKey is required');
    }

    this.permissions = new PermissionsClient(config.apiKey);
    this.features = new FeaturesClient(config.apiKey);
    this.webhooks = new WebhooksClient();
  }
}

export const createTeamboksCore = (config: TeamboksCoreConfig): TeamboksCore => {
  return new TeamboksCore(config);
};
