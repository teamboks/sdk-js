import { init, apiKey, permissions, API_CONFIG } from '../index';

// Mock fetch globally
global.fetch = jest.fn();

describe('@teamboks/core', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('API Configuration', () => {
    it('should export API_CONFIG with correct structure', () => {
      expect(API_CONFIG).toBeDefined();
      expect(API_CONFIG.BASE_URL).toBe('https://core.teamboks.com');
      expect(API_CONFIG.ENDPOINTS.PERMISSIONS).toBe('/v1/permissions');
    });
  });

  describe('API Key Management', () => {
    it('should initialize API key', () => {
      init('test-api-key');
      expect(apiKey).toBe('test-api-key');
    });
  });

  describe('Permissions Service', () => {
    it('should throw error when API key is missing', async () => {
      await expect(
        permissions.check({
          feature: 'test',
          action: 'read',
          role: 'user',
          apiKey: null,
        })
      ).rejects.toThrow('Missing API key.');
    });

    it('should make API call with correct parameters', async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({ status: 200 }),
      };
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await permissions.check({
        feature: 'dashboard',
        action: 'read',
        role: 'admin',
        apiKey: 'test-key',
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('https://core.teamboks.com/v1/permissions'),
        expect.objectContaining({
          headers: {
            'X-API-KEY': 'test-key',
            'Content-Type': 'application/json',
          },
        })
      );

      expect(result).toEqual({ status: 200 });
    });
  });
});
