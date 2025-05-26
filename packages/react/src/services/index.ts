let apiKey: string | null = null;

export const init = (key: string): void => {
  apiKey = key;
};

export { apiKey };

export * as permissions from './permissions';
