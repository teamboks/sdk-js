import { useContext } from 'react';
import { TeamboksContext, TeamboksContextType } from '../context';

const useTeamboks = (): TeamboksContextType => {
  const context = useContext(TeamboksContext);
  if (context === undefined) {
    throw new Error('useTeamboks must be used within a TeamboksProvider');
  }
  return context;
};

export default useTeamboks;
