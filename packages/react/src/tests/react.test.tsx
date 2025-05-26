import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';

import { usePermission } from '../hooks';
import { TeamboksProvider } from '../components';
import { API_CONFIG } from '../constants';

// Create a wrapper component for the provider
const createWrapper = (apiKey: string) => {
  return ({ children }: { children: React.ReactNode }) => (
    <TeamboksProvider apiKey={apiKey}>{children}</TeamboksProvider>
  );
};

describe('usePermission', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should return true when permission is granted', async () => {
    // Mock successful API response
    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ status: 200 }),
    } as Response);

    const wrapper = createWrapper('test-api-key');
    const { result } = renderHook(
      () =>
        usePermission({
          feature: 'users',
          action: 'edit',
          role: 'admin',
        }),
      { wrapper }
    );

    // Initially should be loading
    expect(result.current.isLoading).toBe(true);
    expect(result.current.canActivate).toBe(false);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.canActivate).toBe(true);
    expect(result.current.error).toBe(null);

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

    const wrapper = createWrapper('test-api-key');
    const { result } = renderHook(
      () =>
        usePermission({
          feature: 'users',
          action: 'edit',
          role: 'user',
        }),
      { wrapper }
    );

    // Initially should be loading
    expect(result.current.isLoading).toBe(true);
    expect(result.current.canActivate).toBe(false);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.canActivate).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle API errors', async () => {
    // Mock API error
    (global.fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(
      new Error('API Error')
    );

    const wrapper = createWrapper('test-api-key');
    const { result } = renderHook(
      () =>
        usePermission({
          feature: 'users',
          action: 'edit',
          role: 'admin',
        }),
      { wrapper }
    );

    // Initially should be loading
    expect(result.current.isLoading).toBe(true);
    expect(result.current.canActivate).toBe(false);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.canActivate).toBe(false);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('API Error');
  });
});
