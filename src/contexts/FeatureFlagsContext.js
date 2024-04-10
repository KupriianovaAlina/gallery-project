import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const FeatureFlagsContext = createContext(null);

export const FeatureFlagsProvider = ({ children }) => {
  const [featureFlags, setFeatureFlags] = useState({});

  useEffect(() => {
    const getToggles = async () => {
      const { data } = await axios.get('/api/feature-flags');

      setFeatureFlags(data);
    };

    getToggles();
  }, []);

  return (
    <FeatureFlagsContext.Provider value={featureFlags}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};

export const useFeatureFlags = () => {
  return useContext(FeatureFlagsContext);
};
