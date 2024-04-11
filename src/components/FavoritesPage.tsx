import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useContext } from 'react';
import { StorageContext } from '../contexts/StorageProvider';
import { fetchFavoriteCharacters } from '../slices/sharedThunks';
import Gallery from './Gallery';
import { AppDispatch } from '../slices/types';
import { charactersSelector } from '../slices/selectors';

export const Favorites = () => {
  const characters = useSelector(charactersSelector);
  const dispatch = useDispatch<AppDispatch>();
  const storage = useContext(StorageContext);
  const favorites = storage.getUserFavorite();

  useEffect(() => {
    dispatch(fetchFavoriteCharacters(favorites));
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-center items-center py-10 bg-gray grow">
      <section>
        <h2 className="font-black font-system text-white text-6xl mb-10">
          {"Favorite characters' gallery"}
        </h2>
      </section>
      <Gallery />
    </div>
  );
};
