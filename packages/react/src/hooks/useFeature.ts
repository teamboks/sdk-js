import { useEffect, useState } from 'react';

import { features } from '@teamboks/core';
import useTeamboks from './useTeamboks';

interface UseFeatureParams {
  feature: string;
  segment?: string | null;
}

interface UseFeatureResult {
  isEnabled: boolean;
  isLoading: boolean;
  error: Error | null;
}

const useFeature = ({ feature, segment = null }: UseFeatureParams): UseFeatureResult => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { apiKey } = useTeamboks();

  useEffect(() => {
    let isMounted = true;

    const checkFeature = async () => {
      try {
        const { isEnabled } = await features.check({
          feature,
          apiKey,
          segment,
        });

        if (isMounted) {
          setIsEnabled(isEnabled);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Unknown error occurred'));
          setIsEnabled(false);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    checkFeature();
    return () => {
      isMounted = false;
    };
  }, [feature, apiKey, segment]);

  if (error) {
    console.error('Feature check error:', error);
  }

  return { isEnabled, isLoading, error };
};

export default useFeature;
