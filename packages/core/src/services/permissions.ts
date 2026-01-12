import { API_CONFIG } from '../constants';
import type {
  PermissionCheckParams,
  PermissionCheckResponse,
  PermissionCheckRouteParams,
  PermissionCheckRouteResponse,
} from '../types';

export const check = async ({
  feature,
  action,
  role,
  apiKey,
  segmentId,
}: PermissionCheckParams): Promise<PermissionCheckResponse> => {
  if (!apiKey) {
    throw new Error('Missing API key.');
  }

  try {
    const url = new URL(API_CONFIG.ENDPOINTS.PERMISSIONS, API_CONFIG.BASE_URL);

    url.searchParams.append('feature', feature);
    url.searchParams.append('action', action);
    url.searchParams.append('role', role);
    if (segmentId) {
      url.searchParams.append('segmentId', segmentId);
    }

    const response = await fetch(url.toString(), {
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return { status: response.status, canActivate: data === true };
    } else {
      const errorData = await response.json();
      return {
        status: response.status,
        canActivate: false,
        error: errorData.error,
        message: errorData.message,
      };
    }
  } catch (error) {
    console.error('Network error during permission check:', error);
    throw error;
  }
};

export const checkRoute = async ({
  feature,
  role,
  apiKey,
  segmentId,
}: PermissionCheckRouteParams): Promise<PermissionCheckRouteResponse> => {
  if (!apiKey) {
    throw new Error('Missing API key.');
  }

  try {
    const url = new URL(API_CONFIG.ENDPOINTS.ROUTE_PERMISSIONS, API_CONFIG.BASE_URL);

    url.searchParams.append('feature', feature);
    url.searchParams.append('role', role);
    if (segmentId) {
      url.searchParams.append('segmentId', segmentId);
    }

    const response = await fetch(url.toString(), {
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return { status: response.status, canActivate: data === true };
    } else {
      const errorData = await response.json();
      return {
        status: response.status,
        canActivate: false,
        error: errorData.error,
        message: errorData.message,
      };
    }
  } catch (error) {
    console.error('Network error during route permission check:', error);
    throw error;
  }
};
