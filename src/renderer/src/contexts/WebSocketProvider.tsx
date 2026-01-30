import { createContext } from 'react';
import { useWebSocket } from './../hooks/useWebSocket';

export const WSContext = createContext<any>(null);

export const WSProvider = ({ children }: { children: React.ReactNode }) => {
  const ws = useWebSocket();

  return <WSContext.Provider value={ws}>{children}</WSContext.Provider>;
};
