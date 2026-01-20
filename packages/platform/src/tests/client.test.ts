import { createTeamboksClient, TeamboksClient } from '../client';

describe('TeamboksClient', () => {
  it('should create a client with apiKey', () => {
    const client = createTeamboksClient({ apiKey: 'test-key' });
    expect(client).toBeDefined();
    expect(client.workspaces).toBeDefined();
  });

  it('should throw if apiKey is missing', () => {
    expect(
      () =>
        new TeamboksClient({
          apiKey: '',
        })
    ).toThrow('apiKey is required');
  });
});
