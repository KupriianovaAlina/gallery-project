import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface FeatureFlags {
  [key: string]: boolean;
}

const FeatureFlagsContext = createContext<FeatureFlags | null>(null);

export const FeatureFlagsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>({});

  useEffect(() => {
    const getToggles = async () => {
      try {
        const { data } = await axios.get('/api/feature-flags');
        setFeatureFlags(data);
      } catch (error) {
        console.error('Error fetching feature flags:', error);
      }
    };

    getToggles();
  }, []);

  return (
    <FeatureFlagsContext.Provider value={featureFlags}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};

export const useFeatureFlags = (): FeatureFlags | null => {
  return useContext(FeatureFlagsContext);
};
