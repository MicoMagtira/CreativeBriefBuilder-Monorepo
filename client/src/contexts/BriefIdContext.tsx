import React, { createContext, useContext, useState, useEffect } from 'react';

interface BriefIdContextType {
  briefId: string | null;
  setBriefId: (id: string | null) => void;
}

const BriefIdContext = createContext<BriefIdContextType | undefined>(undefined);

export const BriefIdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [briefId, setBriefIdState] = useState<string | null>(() => {
    return localStorage.getItem('briefId');
  });

  useEffect(() => {
    if (briefId) {
      localStorage.setItem('briefId', briefId);
    } else {
      localStorage.removeItem('briefId');
    }
  }, [briefId]);

  const setBriefId = (id: string | null) => {
    setBriefIdState(id);
  };

  return (
    <BriefIdContext.Provider value={{ briefId, setBriefId }}>
      {children}
    </BriefIdContext.Provider>
  );
};

export const useBriefId = () => {
  const context = useContext(BriefIdContext);
  if (!context) {
    throw new Error('useBriefId must be used within a BriefIdProvider');
  }
  return context;
};
