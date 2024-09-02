import { useContext } from 'react';
import { StorageContext } from '../contexts/StorageProvider';
import { Button } from './Button';
import { FaUser } from 'react-icons/fa';

export const Profile = () => {
  const storage = useContext(StorageContext);

  const handleLogout = () => {
    storage.logOut();
  };

  return (
    <div className="absolute top-2 right-10 min-[320px]:text-center">
      <div className="flex mb-10">
        <div className="lg:flex hidden flex items-center justify-center text-gray my-2">
          <FaUser className="mr-2" style={{ color: '#272B33' }} />
          <p className="text-gray md:text-base text-sm">
            {storage.getCurrentUserEmail()}
          </p>
        </div>
        <Button text="Log Out" onClick={handleLogout} />
      </div>
    </div>
  );
};
