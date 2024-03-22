import { NavLink } from 'react-router-dom';
import { navigationRoutes } from '../routes';

const Header = () => {
  return (
    <div>
      <NavLink to={navigationRoutes.main()}>
        <img className="mx-auto w-1/2" src="/images/logo.svg" alt="Logo" />
      </NavLink>
      <div className='lg:absolute lg:top-7 lg:right-7 min-[320px]:text-center'>
        <NavLink className='header-button inline-block w-28 text-center py-2 mx-5 text-black rounded-md transition-colors duration-300'
        to={navigationRoutes.login()}>
          Login
        </NavLink>
        <NavLink className='header-button inline-block w-28 text-center py-2 text-black rounded-md transition-colors duration-300' 
        to={navigationRoutes.signup()}>
          Sign Up
        </NavLink>
      </div>
    </div>
  )
}

export default Header;