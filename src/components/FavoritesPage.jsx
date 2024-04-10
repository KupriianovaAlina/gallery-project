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
  const favorites = storage.getUserFavorite();

  useEffect(() => {
    dispatch(fetchFavoriteCharacters(favorites));
  }, [dispatch, favorites]);

  return (
    <div className="flex flex-col justify-center items-center py-10 bg-gray">
      <section>
        <h2 className="font-black font-system text-white text-6xl mb-10">
          {"Favorite characters' gallery"}
        </h2>
      </section>
      <Gallery characters={characters} />
    </div>
  );
};
