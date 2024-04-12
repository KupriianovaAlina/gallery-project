import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { navigationRoutes } from './routes';
import StorageProvider from './contexts/StorageProvider';
import AuthGuard from './components/AuthGuard';

const MainPage = lazy(() => import('./components/MainPage'));
const Header = lazy(() =>
  import('./components/Header').then(module => ({
    default: module.Header,
  })),
);
const SignInPage = lazy(() =>
  import('./components/SignInPage').then(module => ({
    default: module.SignInPage,
  })),
);
const SignUpPage = lazy(() =>
  import('./components/SignUpPage/SignUpPage').then(module => ({
    default: module.SignUpPage,
  })),
);
const NotFound = lazy(() =>
  import('./components/NotFound').then(module => ({
    default: module.NotFound,
  })),
);
const Favorites = lazy(() =>
  import('./components/FavoritesPage').then(module => ({
    default: module.Favorites,
  })),
);
const History = lazy(() =>
  import('./components/HistoryPage').then(module => ({
    default: module.History,
  })),
);
const Card = lazy(() =>
  import('./components/Card').then(module => ({
    default: module.Card,
  })),
);

function App() {
  return (
    <StorageProvider>
      <BrowserRouter>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path={navigationRoutes.main()} element={<MainPage />} />
            <Route path={navigationRoutes.signin()} element={<SignInPage />} />
            <Route path={navigationRoutes.card()} element={<Card />} />
            <Route path={navigationRoutes.signup()} element={<SignUpPage />} />
            <Route
              path={navigationRoutes.favorites()}
              element={
                <AuthGuard>
                  <Favorites />{' '}
                </AuthGuard>
              }
            />
            <Route
              path={navigationRoutes.history()}
              element={
                <AuthGuard>
                  <History />{' '}
                </AuthGuard>
              }
            />{' '}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </StorageProvider>
  );
}

export default App;
