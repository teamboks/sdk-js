export interface PermissionCheckParams {
  feature: string;
  action: string;
  role: string;
  apiKey?: string | null;
}

export interface PermissionCheckResponse {
  status: number;
}
