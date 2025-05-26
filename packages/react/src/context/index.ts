import { createContext } from 'react';

export interface TeamboksContextType {
  apiKey: string;
}

export const TeamboksContext = createContext<TeamboksContextType | undefined>(undefined);
