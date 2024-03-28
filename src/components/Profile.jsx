import { NavLink } from 'react-router-dom';
export const Profile = ({ handleLogout }) => (
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
  );