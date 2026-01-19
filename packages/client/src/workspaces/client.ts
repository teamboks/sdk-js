import { API_CONFIG } from '../constants';
import type {
  Workspace,
  CreateWorkspaceInput,
  UpdateWorkspaceParams,
  FindUniqueWorkspaceInput,
  DeleteWorkspaceInput,
  WorkspacesResponse,
  FindManyWorkspacesInput,
} from '../types/workspaces';

export class WorkspacesClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private getHeaders(): Record<string, string> {
    return {
      'X-API-KEY': this.apiKey,
      'Content-Type': 'application/json',
    };
  }

  async create(input: CreateWorkspaceInput): Promise<Workspace> {
    const url = new URL(API_CONFIG.BASE_URL, API_CONFIG.ENDPOINTS.WORKSPACES);

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create workspace');
    }

    const data = await response.json();
    return this.parseWorkspace(data);
  }

  async findMany(input: FindManyWorkspacesInput): Promise<Workspace[]> {
    const url = new URL(API_CONFIG.BASE_URL, API_CONFIG.ENDPOINTS.WORKSPACES);

    Object.entries(input).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch workspaces');
    }

    const data = (await response.json()) as WorkspacesResponse;
    return data.data.map((workspace) =>
      this.parseWorkspace(workspace as unknown as Record<string, unknown>)
    );
  }

  async findUnique(input: FindUniqueWorkspaceInput): Promise<Workspace | null> {
    const url = new URL(
      `${API_CONFIG.ENDPOINTS.WORKSPACES}/${encodeURIComponent(input.id)}`,
      API_CONFIG.BASE_URL
    );

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch workspace');
    }

    const data = await response.json();
    return this.parseWorkspace(data);
  }

  async update(params: UpdateWorkspaceParams): Promise<Workspace> {
    const url = new URL(
      `${API_CONFIG.ENDPOINTS.WORKSPACES}/${encodeURIComponent(params.id)}`,
      API_CONFIG.BASE_URL
    );

    const response = await fetch(url.toString(), {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(params.data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update workspace');
    }

    const data = await response.json();
    return this.parseWorkspace(data);
  }

  async delete(input: DeleteWorkspaceInput): Promise<void> {
    const url = new URL(
      `${API_CONFIG.ENDPOINTS.WORKSPACES}/${encodeURIComponent(input.id)}`,
      API_CONFIG.BASE_URL
    );

    const response = await fetch(url.toString(), {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete workspace');
    }
  }

  private parseWorkspace(data: Record<string, unknown>): Workspace {
    return {
      id: String(data.id),
      name: String(data.name),
      description: data.description ? String(data.description) : null,
      expiresAt: data.expiresAt ? new Date(String(data.expiresAt)) : null,
      segmentId: data.segmentId ? String(data.segmentId) : null,
      isPrivate: Boolean(data.isPrivate),
      isArchived: Boolean(data.isArchived),
      isIndependent: Boolean(data.isIndependent),
      createdAt: new Date(String(data.createdAt)),
      updatedAt: new Date(String(data.updatedAt)),
    };
  }
}

export const createWorkspacesClient = (apiKey: string): WorkspacesClient => {
  return new WorkspacesClient(apiKey);
};
