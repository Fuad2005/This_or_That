"use client";

import { createContext, useState, useEffect } from 'react';
import { getUserByToken } from '@/utils/functions';

// Define the props type for AppInitializer
interface AppInitializerProps {
  children: React.ReactNode;
}

interface AppContextProps { 
  tokenCheck: number; 
  setTokenCheck: React.Dispatch<React.SetStateAction<number>>; 
  refreshUserData: number;
  setRefreshUserData: React.Dispatch<React.SetStateAction<number>>;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined)

const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  const [tokenCheck, setTokenCheck] = useState<number>(0)
  const [refreshUserData, setRefreshUserData] = useState<number>(0)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserByToken(token);
    }
  }, []);

  return (
    <AppContext.Provider value={{tokenCheck, setTokenCheck, refreshUserData, setRefreshUserData}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppInitializer;