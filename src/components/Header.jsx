import { NavLink } from 'react-router-dom';
import { navigationRoutes } from '../routes';
import { Profile } from './Profile';
import { AuthButtons } from './AuthButtons';
import { NavigationLinks } from './NavigationLinks';

export const Header = () => {
  const auth = {
    isAuthtoraized: true
  };

  const handleLogout = () => {
  };

  return (
    <div>
      <NavLink to={navigationRoutes.main()}>
        <img className="mx-auto w-1/2" src="/images/logo.svg" alt="Logo" />
      </NavLink>
      {auth.isAuthtoraized ? (
        <Profile handleLogout={handleLogout} />
      ) : (
        <AuthButtons />
      )}
      {auth.isAuthtoraized && <NavigationLinks />}
    </div>
  )
}