import { API_CONFIG } from '../constants';
import type { FeatureCheckParams, FeatureCheckResponse } from '../types';

export const check = async ({
  feature,
  apiKey,
  segment,
}: FeatureCheckParams): Promise<FeatureCheckResponse> => {
  if (!apiKey) {
    throw new Error('Missing API key.');
  }

  try {
    const url = new URL(API_CONFIG.ENDPOINTS.FEATURES, API_CONFIG.BASE_URL);

    url.searchParams.append('feature', feature);
    if (segment) {
      url.searchParams.append('segment', segment);
    }

    const response = await fetch(url.toString(), {
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return { status: response.status, isEnabled: data === true };
    } else {
      const errorData = await response.json();
      return {
        status: response.status,
        isEnabled: false,
        error: errorData.error,
        message: errorData.message,
      };
    }
  } catch (error) {
    console.error('Network error during feature check:', error);
    throw error;
  }
};
