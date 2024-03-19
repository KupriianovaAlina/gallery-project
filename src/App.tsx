import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { navigationRoutes } from './routes.js';
import NotFound from './components/NotFound';
import Header from './components/Header.jsx';
import GalleryPage from './components/GalleryPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import SignupPage from './components/SignupPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={navigationRoutes.gallery()} element={(<GalleryPage />)} />
        <Route path={navigationRoutes.login()} element={<LoginPage />} />
        <Route path={navigationRoutes.signup()} element={<SignupPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
