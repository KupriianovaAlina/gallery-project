import { useContext } from 'react';
import { StorageContext } from './StorageProvider';

export const History = () => {
  const storage = useContext(StorageContext);

  const urls = storage.getUserSearchHistory().reverse();
  console.log(urls);

  return (
    <div className="flex flex-col justify-center items-center py-10">
      <h2 className="font-acme text-white text-6xl mb-10">{'User history'}</h2>
      <ul>
        {urls.map((url, index) => {
          console.log(url);
          return (
            <li key={index} className="text-white">
              <a href={url}>
                <p>{url}</p>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
