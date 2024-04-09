import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { navigationRoutes } from './routes.js';
import StorageProvider from './components/StorageProvider.jsx'

const MainPage = lazy(() => import('./components/MainPage.jsx'));
const Header = lazy(() =>
  import('./components/Header.jsx').then(module => ({
    default: module.Header,
  })),
);
const SignInPage = lazy(() => import('./components/SignInPage').then(module => ({ default: module.SignInPage })));
const SignUpPage = lazy(() =>
  import('./components/SignUpPage/SignUpPage').then(module => ({
    default: module.SignUpPage,
  })),
);
const NotFound = lazy(() =>
  import('./components/NotFound.jsx').then(module => ({
    default: module.NotFound,
  })),
);
const Favorites = lazy(() =>
  import('./components/FavoritesPage.jsx').then(module => ({
    default: module.Favorites,
  })),
);
const History = lazy(() =>
  import('./components/HistoryPage.jsx').then(module => ({
    default: module.History,
  })),
);
const Card = lazy(() =>
  import('./components/Card.jsx').then(module => ({
    default: module.Card,
  })),
);

function App() {
  return (
    <StorageProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <Routes>
            <Route path={navigationRoutes.main()} element={(<MainPage />)} />
            <Route path={navigationRoutes.signin()} element={<SignInPage />} />
            <Route path={navigationRoutes.card()} element={(<Card />)} />
            <Route path={navigationRoutes.signup()} element={<SignUpPage />} />
            <Route path={navigationRoutes.favorites()} element={<Favorites />} />
            <Route path={navigationRoutes.history()} element={<History />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </StorageProvider>
  );
}

export default App;