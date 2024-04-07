import { NavLink } from 'react-router-dom';
import { navigationRoutes } from '../routes';
import { Profile } from './Profile';
import { AuthButtons } from './AuthButtons';
import { NavigationLinks } from './NavigationLinks';
import { StorageContext } from './StorageProvider';
import { useContext } from 'react';

export const Header = () => {
  const storage = useContext(StorageContext);

  return (
    <div>
      <NavLink to={navigationRoutes.main()}>
        <img className="mx-auto w-1/2" src="/images/logo.svg" alt="Logo" />
      </NavLink>
      {storage.isAuthtoraized ? <Profile /> : <AuthButtons />}
      {storage.isAuthtoraized && <NavigationLinks />}
    </div>
  );
};
