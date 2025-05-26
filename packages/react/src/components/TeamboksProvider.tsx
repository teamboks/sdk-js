import React, { ReactNode } from 'react';

import { TeamboksContext } from '../context';

interface TeamboksProviderProps {
  apiKey: string;
  children: ReactNode;
}

export const TeamboksProvider: React.FC<TeamboksProviderProps> = ({ apiKey, children }) => {
  if (!apiKey) {
    throw new Error('TeamboksProvider requires an API key');
  }

  return <TeamboksContext.Provider value={{ apiKey }}>{children}</TeamboksContext.Provider>;
};
