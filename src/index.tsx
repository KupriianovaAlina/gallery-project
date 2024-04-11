import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './slices/index';
import './index.css';
import { FeatureFlagsProvider } from './contexts/FeatureFlagsProvider';
import ErrorBoundary from './components/ErrorBoundary';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <FeatureFlagsProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </FeatureFlagsProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
