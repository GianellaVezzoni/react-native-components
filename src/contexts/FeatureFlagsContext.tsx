import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { featureFlags as initialFlags } from '../config/featureFlags';

type FeatureFlags = typeof initialFlags;
type FeatureFlagKey = keyof FeatureFlags;

interface FeatureFlagsContextType extends FeatureFlags {
  toggleFlag: (flagName: FeatureFlagKey) => void;
  resetFlags: () => void;
}

const FeatureFlagsContext = createContext<FeatureFlagsContextType | undefined>(undefined);

export const FeatureFlagsProvider = ({ children }: { children: ReactNode }) => {
  const [flags, setFlags] = useState<FeatureFlags>(initialFlags);

  const toggleFlag = useCallback((flagName: FeatureFlagKey) => {
    setFlags(prev => ({
      ...prev,
      [flagName]: !prev[flagName],
    }));
  }, []);

  const resetFlags = useCallback(() => {
    setFlags(initialFlags);
  }, []);

  return (
    <FeatureFlagsContext.Provider value={{ ...flags, toggleFlag, resetFlags }}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagsContext);
  if (!context) {
    throw new Error('useFeatureFlags must be used within FeatureFlagsProvider');
  }
  return context;
};

