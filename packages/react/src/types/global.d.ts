import { Mock } from 'jest-mock';

declare global {
  interface Window {
    fetch: Mock;
  }
  // eslint-disable-next-line no-var
  var fetch: Mock;
}
