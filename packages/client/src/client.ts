import { WorkspacesClient } from './workspaces/client';

export interface TeamboksClientConfig {
  apiKey: string;
}

export class TeamboksClient {
  public workspaces: WorkspacesClient;

  constructor(config: TeamboksClientConfig) {
    if (!config.apiKey) {
      throw new Error('apiKey is required');
    }

    this.workspaces = new WorkspacesClient(config.apiKey);
  }
}

export const createTeamboksClient = (config: TeamboksClientConfig): TeamboksClient => {
  return new TeamboksClient(config);
};
