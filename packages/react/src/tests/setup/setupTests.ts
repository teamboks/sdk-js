import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

// Mock fetch globally
global.fetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});
