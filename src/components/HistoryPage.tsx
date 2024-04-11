import { useContext } from 'react';
import { StorageContext } from '../contexts/StorageProvider';
import { FaLink } from 'react-icons/fa';

export const History = () => {
  const storage = useContext(StorageContext);
  const urls = storage.getUserSearchHistory().reverse();

  return (
    <div className="flex flex-col justify-center items-center py-10 bg-gray">
      <h2 className="font-black font-system text-white text-6xl mb-10">
        {'User history'}
      </h2>
      <ul>
        {urls.map((url, index) => {
          return (
            <li key={index} className="text-white mb-2">
              <a href={url}>
                <p>
                  <FaLink className="inline" style={{ color: '#ffffff' }} />{' '}
                  {url}
                </p>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
