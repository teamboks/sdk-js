import { renderHook, waitFor } from '@testing-library/react';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

import { usePermission } from '../hooks';
import { init } from '../services';
import { API_CONFIG } from '../constants';

describe('usePermission', () => {
  beforeEach(() => {
    // Reset the API key before each test
    init('test-api-key');
  });

  it('should return true when permission is granted', async () => {
    // Mock successful API response
    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ status: 200 }),
    } as Response);

    const { result } = renderHook(() =>
      usePermission({
        feature: 'users',
        action: 'edit',
        role: 'admin',
      })
    );

    await waitFor(() => {
      expect(result.current).toBe(true);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PERMISSIONS}`),
      expect.any(Object)
    );
  });

  it('should return false when permission is denied', async () => {
    // Mock failed API response
    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ status: 403 }),
    } as Response);

    const { result } = renderHook(() =>
      usePermission({
        feature: 'users',
        action: 'edit',
        role: 'user',
      })
    );

    await waitFor(() => {
      expect(result.current).toBe(false);
    });
  });

  it('should handle API errors', async () => {
    // Mock API error
    (global.fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(
      new Error('API Error')
    );

    const { result } = renderHook(() =>
      usePermission({
        feature: 'users',
        action: 'edit',
        role: 'admin',
      })
    );

    await waitFor(() => {
      expect(result.current).toBe(false);
    });
  });
});
