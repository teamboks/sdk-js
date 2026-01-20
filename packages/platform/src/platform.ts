import { WorkspacesClient } from './workspaces/client';

export interface TeamboksPlatformConfig {
  apiKey: string;
}

export class TeamboksPlatform {
  public workspaces: WorkspacesClient;

  constructor(config: TeamboksPlatformConfig) {
    if (!config.apiKey) {
      throw new Error('apiKey is required');
    }

    this.workspaces = new WorkspacesClient(config.apiKey);
  }
}

export const createTeamboksPlatform = (config: TeamboksPlatformConfig): TeamboksPlatform => {
  return new TeamboksPlatform(config);
};
