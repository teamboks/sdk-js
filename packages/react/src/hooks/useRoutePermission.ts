import { useEffect, useState } from 'react';

import { permissions } from '@teamboks/core';
import useTeamboks from './useTeamboks';

interface UseRoutePermissionParams {
  feature: string;
  role: string;
  segmentId?: string | null;
}

interface UseRoutePermissionResult {
  canActivate: boolean;
  isLoading: boolean;
  error: Error | null;
}

const useRoutePermission = ({
  feature,
  role,
  segmentId = null,
}: UseRoutePermissionParams): UseRoutePermissionResult => {
  const [canActivate, setCanActivate] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { apiKey } = useTeamboks();

  useEffect(() => {
    let isMounted = true;

    const checkRoutePermission = async () => {
      try {
        const { canActivate } = await permissions.checkRoute({
          feature,
          role,
          apiKey,
          segmentId,
        });

        if (isMounted) {
          setCanActivate(canActivate);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Unknown error occurred'));
          setCanActivate(false);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    checkRoutePermission();
    return () => {
      isMounted = false;
    };
  }, [feature, role, apiKey, segmentId]);

  // Only log actual errors, not permission denials
  if (error) {
    console.error('Route permission check error:', error);
  }

  return { canActivate, isLoading, error };
};

export default useRoutePermission;
