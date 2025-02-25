import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { charactersSelector } from '../slices/selectors';
import FavoriteButton from './FavoriteButton';
import { navigationRoutes } from '../routes';
import { fetchCharacter } from '../slices/sharedThunks';
import { NavLink } from 'react-router-dom';
import { useFeatureFlags } from '../contexts/FeatureFlagsProvider';
import ShareButton from './ShareButton';
import { AppDispatch } from '../slices/types';
import { StorageContext } from '../contexts/StorageProvider';
import { FETCH_STATUS } from '../utils/constants';

export const Card = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const storage = useContext(StorageContext);

  const id = Number(params.id);
  const characters = useSelector(charactersSelector);
  const character = characters.currentCharacter;

  const { isTelegramShareEnabled } = useFeatureFlags() || {};

  useEffect(() => {
    dispatch(fetchCharacter(id));
  }, [dispatch]);

  const Loader = () => (
    <div className="text-center font-sans text-5xl font-semibold text-white p-10">
      Loading...
    </div>
  );

  const CharacterCard = () => (
    <>
      <button className="absolute block w-32 left-0 -top-14 text-white text-center text-xl font-bold border border-orange rounded-md hover:bg-orange p-2">
        <NavLink to={navigationRoutes.main()}>{'< Back'}</NavLink>
      </button>
      {storage.isAuthtoraized && <FavoriteButton id={character.id} />}
      <div className="relative m-0 w-2/5 shrink-0 rounded-xl rounded-r-none bg-white bg-clip-border">
        <img
          src={character.image}
          alt="character image"
          className="h-full w-full object-cover rounded-l-lg"
        />
      </div>
      <div className="p-6 overflow-hidden">
        <h4 className="mb-2 text-4xl font-black text-orange max-w-80">
          {character.name}
        </h4>
        <p>
          <strong className="text-gray-superLight">Gender: </strong>
          {character.gender}
        </p>
        <p>
          <strong className="text-gray-superLight">Species: </strong>
          {character.species}
        </p>
        <p>
          <strong className="text-gray-superLight">Status: </strong>
          {character.status}
        </p>
        <p>
          <strong className="text-gray-superLight">Origin: </strong>
          {character.origin?.name}
        </p>
        <p>
          <strong className="text-gray-superLight">Location: </strong>
          {character.location?.name}
        </p>
        <p>
          <strong className="text-gray-superLight">Episodes: </strong>
          {character.episode?.reduce((acc: string, episode: string | null) => {
            if (acc === '') return episode?.match(/\d+/)?.[0] || '';
            return `${acc}, ${episode?.match(/\d+/)?.[0] || ''}`;
          }, '')}
        </p>
        {isTelegramShareEnabled && (
          <ShareButton text={`Learn about ${character.name}`} />
        )}
      </div>
    </>
  );

  return (
    <div className="flex flex-col justify-center items-center py-20 bg-gray font-system">
      <div className="relative flex w-full max-w-[48rem] flex-row rounded-xl bg-gray-light bg-clip-border text-white shadow-md relative">
        {Object.keys(character).length === 0 ||
        characters.fetchStatus === FETCH_STATUS.Pending ? (
          <Loader />
        ) : (
          <CharacterCard />
        )}
      </div>
    </div>
  );
};
