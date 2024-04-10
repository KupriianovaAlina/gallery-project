import { Button } from './Button';
import { navigationRoutes } from '../routes';

export const NavigationLinks = () => (
  <div className="text-center">
    <Button text="Main Page" to={navigationRoutes.main()} />
    <Button text="Favorites" to={navigationRoutes.favorites()} />
    <Button text="History" to={navigationRoutes.history()} />
  </div>
);