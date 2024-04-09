import { useSelector, useDispatch } from 'react-redux';
import { charactersSelector } from '../slices/selectors';
import { useEffect, useContext } from 'react';
import { StorageContext } from './StorageProvider';
import { fetchFavoriteCharacters } from '../slices/sharedThunks';
import Gallery from './Gallery';

export const Favorites = () => {
  const characters = useSelector(charactersSelector);
  const dispatch = useDispatch();

  const storage = useContext(StorageContext);

  useEffect(() => {
    dispatch(fetchFavoriteCharacters(storage.getUserFavorite()));
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-center items-center py-10">
      <section>
        <h2 className="font-acme text-white text-6xl mb-10">
          {"Characters' gallery"}
        </h2>
      </section>
      <Gallery characters={characters} />
    </div>
  );
};