import { Link } from 'react-router-dom';
import { navigationRoutes } from '../routes';
import FavoriteButton from './FavoriteButton';
import { StorageContext } from '../contexts/StorageProvider';
import { useContext } from 'react';
import { Character } from '../slices/types';
import { StorageContextType } from '../contexts/StorageProvider';

interface CardPreviewProps {
  character: Character;
}

const CardPreview: React.FC<CardPreviewProps> = ({ character }) => {
  const storage = useContext<StorageContextType>(StorageContext);

  return (
    <div className="relative w-9/12 lg:w-2/5 bg-gray-light rounded-lg">
      {storage.isAuthtoraized && <FavoriteButton id={character.id} />}
      <Link to={navigationRoutes.card(`${character.id}`)}>
        <div className="flex h-full" key={character.id}>
          <img
            alt="gallery"
            className=" w-2/5 object-cover object-center rounded-l-lg"
            src={character.image}
          />
          <div className="flex flex-col ml-4 my-4 justify-between">
            <div>
              <h3 className="text-2xl font-black text-white max-w-52">
                {character.name}
              </h3>
              <span className="font-semibold text-white flex items-center">
                <span
                  className={`w-2 h-2 rounded-full mr-1 ${character.status === 'Dead' ? 'bg-red' : character.status === 'unknown' ? 'bg-gray-superLight' : 'bg-green'}`}
                ></span>
                {character.status}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-superLight">{'Race:'}</h3>
              <p className="font-normal text-white"> {character.species}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-superLight">
                {'Last known location:'}
              </h3>
              <p className="font-normal text-white">
                {character.location?.name}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardPreview;
