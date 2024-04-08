import { Button } from './Button';
import { navigationRoutes } from '../routes';

export const NavigationLinks = () => (
  <div className="text-center">
    <Button text="Favorites" to={navigationRoutes.favorites()} />
    <Button text="History" to={navigationRoutes.history()} />
  </div>
);