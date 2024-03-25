import { Suspense, lazy, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { navigationRoutes } from './routes.js';

const MainPage = lazy(() => import('./components/MainPage.jsx'));
const Header = lazy(() => import('./components/Header.jsx'));
const LoginPage = lazy(() => import('./components/LoginPage.jsx'));
const SignupPage = lazy(() => import('./components/SignupPage.jsx'));
const NotFound = lazy(() => import('./components/NotFound.jsx'));
const Favorites = lazy(() => import('./components/FavoritesPage.jsx'));
const History = lazy(() => import('./components/HistoryPage.jsx'));


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); 
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Header isAuthenticated={isAuthenticated}/>
        <Routes>
          <Route path={navigationRoutes.main()} element={(<MainPage />)} />
          <Route path={navigationRoutes.login()} element={<LoginPage />} />
          <Route path={navigationRoutes.signup()} element={<SignupPage />} />
          <Route path={navigationRoutes.favorites()} element={(<Favorites />)} />
          <Route path={navigationRoutes.history()} element={(<History />)} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
