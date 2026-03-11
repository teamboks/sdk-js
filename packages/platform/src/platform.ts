import { WorkspacesClient } from './workspaces/client';
import { UsersClient } from './users/client';

export interface TeamboksPlatformConfig {
  apiKey: string;
}

export class TeamboksPlatform {
  public workspaces: WorkspacesClient;
  public users: UsersClient;

  constructor(config: TeamboksPlatformConfig) {
    if (!config.apiKey) {
      throw new Error('apiKey is required');
    }

    this.workspaces = new WorkspacesClient(config.apiKey);
    this.users = new UsersClient(config.apiKey);
  }
}

export const createTeamboksPlatform = (config: TeamboksPlatformConfig): TeamboksPlatform => {
  return new TeamboksPlatform(config);
};
