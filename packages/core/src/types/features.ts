export interface FeatureCheckParams {
  feature: string;
  apiKey?: string | null;
  segment?: string | null;
}

export interface FeatureCheckResponse {
  status: number;
  isEnabled: boolean;
  error?: string;
  message?: string;
}
