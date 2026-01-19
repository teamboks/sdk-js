import { PaginatedRequest } from '../pagination';

export interface Workspace {
  id: string;
  name: string;
  description?: string | null;
  expiresAt?: Date | null;
  segmentId?: string | null;
  isPrivate: boolean;
  isArchived: boolean;
  isIndependent: boolean;
  createdAt: Date;
  updatedAt: Date;
  parentWorkspaceId?: string | null;
}

export interface CreateWorkspaceInput {
  name: string;
  description?: string;
  segmentId?: string;
  isPrivate?: boolean;
  isArchived?: boolean;
  isIndependent?: boolean;
  expiresAt?: Date;
  parentWorkspaceId?: string;
}

export interface UpdateWorkspaceInput {
  name?: string;
  description?: string | null;
  segmentId?: string | null;
  isPrivate?: boolean;
  isArchived?: boolean;
  isIndependent?: boolean;
  expiresAt?: Date | null;
}

export interface FindUniqueWorkspaceInput {
  id: string;
}

export interface FindManyWorkspacesInput extends PaginatedRequest {
  segment?: string | null;
}

export interface UpdateWorkspaceParams {
  id: string;
  data: UpdateWorkspaceInput;
}

export interface DeleteWorkspaceInput {
  id: string;
}

export interface WorkspacesResponse {
  data: Workspace[];
  total: number;
  page: number;
  limit: number;
}
