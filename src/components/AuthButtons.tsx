import { Button } from './Button';
import { navigationRoutes } from '../routes';

export const AuthButtons = () => (
  <div className="lg:absolute lg:top-7 lg:right-7 min-[320px]:text-center">
    <Button text="Login" to={navigationRoutes.signin()} />
    <Button text="Sign Up" to={navigationRoutes.signup()} />
  </div>
);
