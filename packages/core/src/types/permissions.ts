export interface PermissionCheckParams {
  feature: string;
  action: string;
  role: string;
  apiKey?: string | null;
  segment?: string | null;
}

export interface PermissionCheckResponse {
  status: number;
  canActivate: boolean;
  error?: string;
  message?: string;
}
