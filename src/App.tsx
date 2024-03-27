import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { navigationRoutes } from './routes.js';

const MainPage = lazy(() => import('./components/MainPage.jsx'));
const Header = lazy(() => import('./components/Header.jsx'));
const LoginPage = lazy(() => import('./components/LoginPage.jsx'));
const SIGN_UP_PAGE = lazy(() => import('./components/SignUpPage/SignUpPage').then(module => ({ default: module.SignUpPage })));
const NotFound = lazy(() => import('./components/NotFound.jsx'))


function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <Routes>
          <Route path={navigationRoutes.main()} element={(<MainPage />)} />
          <Route path={navigationRoutes.login()} element={<LoginPage />} />
          <Route path={navigationRoutes.signup()} element={<SIGN_UP_PAGE />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
