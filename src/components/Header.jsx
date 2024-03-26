import { NavLink } from 'react-router-dom';
import { navigationRoutes } from '../routes';
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';

const Header = () => {
  // const auth = useContext(AuthContext);
  const auth = {
    isAuthtoraized: true
  };

  // const dispatch = useDispatch();

  const handleLogout = () => {
    // dispatch(logoutUser());
    // here will be log out
  };

  return (
    <div>
      <NavLink to={navigationRoutes.main()}>
        <img className="mx-auto w-1/2" src="/images/logo.svg" alt="Logo" />
      </NavLink>
      {auth.isAuthtoraized ? (
        <div className='lg:absolute lg:top-5 lg:right-7 min-[320px]:text-center'>
          <div className='mb-10'>
            <div className='flex items-center justify-center text-white my-5'>
              <img className='w-10 h-10' src="/images/userIcon.png" alt="UserIcon" />
              <p>User Name will be soon</p> 
            </div> 
            <NavLink className='header-button inline-block w-28 text-center py-2 text-black rounded-md transition-colors duration-300'
              onClick={handleLogout}>
              Exit
            </NavLink>
          </div>
        </div>
      ) : (
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
      )}
      {auth.isAuthtoraized && (
        <div className='text-center'>
          <NavLink className='header-button inline-block w-28 text-center py-2 mx-10 text-black rounded-md transition-colors duration-300'
            to={navigationRoutes.favorites()}>
            Favorites
          </NavLink>
          <NavLink className='header-button inline-block w-28 text-center py-2 text-black rounded-md transition-colors duration-300'
            to={navigationRoutes.history()}>
            History
          </NavLink>
        </div>
      )}
    </div>
  )
}

export default Header;
