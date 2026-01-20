import { createTeamboksPlatform, TeamboksPlatform } from '../platform';

describe('TeamboksPlatform', () => {
  it('should create a client with apiKey', () => {
    const client = createTeamboksPlatform({ apiKey: 'test-key' });
    expect(client).toBeDefined();
    expect(client.workspaces).toBeDefined();
  });

  it('should throw if apiKey is missing', () => {
    expect(
      () =>
        new TeamboksPlatform({
          apiKey: '',
        })
    ).toThrow('apiKey is required');
  });
});
