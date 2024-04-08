import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './slices/index'
import './index.css';
import { FeatureFlagsProvider } from './contexts/FeatureFlagsContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <FeatureFlagsProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </FeatureFlagsProvider>
  </React.StrictMode>
);