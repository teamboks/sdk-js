import { API_CONFIG } from '../constants';

interface PermissionCheckParams {
  feature: string;
  action: string;
  role: string;
  apiKey?: string | null;
}

export const check = async ({
  feature,
  action,
  role,
  apiKey,
}: PermissionCheckParams): Promise<{ status: number }> => {
  if (!apiKey) {
    throw new Error('Missing API key.');
  }

  try {
    const url = new URL(API_CONFIG.ENDPOINTS.PERMISSIONS, API_CONFIG.BASE_URL);

    url.searchParams.append('feature', feature);
    url.searchParams.append('action', action);
    url.searchParams.append('role', role);

    const response = await fetch(url.toString(), {
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return { status: response.status };
    }
  } catch (error) {
    console.error('Network error during permission check:', error);
    throw error;
  }
};
