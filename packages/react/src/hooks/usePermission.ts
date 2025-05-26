import { useEffect, useState } from 'react';

import { check } from '../services/permissions';
import useTeamboks from './useTeamboks';

interface UsePermissionParams {
  feature: string;
  action: string;
  role: string;
}

interface UsePermissionResult {
  canActivate: boolean;
  isLoading: boolean;
  error: Error | null;
}

const usePermission = ({ feature, action, role }: UsePermissionParams): UsePermissionResult => {
  const [canActivate, setCanActivate] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { apiKey } = useTeamboks();

  useEffect(() => {
    let isMounted = true;

    const checkPermission = async () => {
      try {
        const { status } = await check({
          feature,
          action,
          role,
          apiKey,
        });

        if (isMounted) {
          setCanActivate(status === 200 ? true : false);
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

    checkPermission();
    return () => {
      isMounted = false;
    };
  }, [feature, action, role, apiKey]);

  // Only log actual errors, not permission denials
  // Permission denials are now handled gracefully in the service
  if (error) {
    console.error('Permission check error:', error);
  }

  return { canActivate, isLoading, error };
};

export default usePermission;
