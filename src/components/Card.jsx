import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { charactersSelector } from '../slices/selectors';
import FavoriteButton from './FavoriteButton';
import { navigationRoutes } from '../routes';
import { fetchCharacter } from '../slices/sharedThunks';
import { NavLink } from 'react-router-dom';
import { useFeatureFlags } from '../contexts/FeatureFlagsContext';
import ShareButton from './ShareButton';
import { StorageContext } from './StorageProvider';

export const Card = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const storage = useContext(StorageContext);

  const id = params.id.slice(1);
  const characters = useSelector(charactersSelector);
  const character = characters.currentCharacter;

  const { isTelegramShareEnabled } = useFeatureFlags();

  useEffect(() => {
    dispatch(fetchCharacter(id));
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-center items-center my-20">
      <div className="relative flex w-full max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md relative">
        <button className="absolute left-0 -top-12 text-acid hover:opacity-60 text-3xl font-acme">
          <NavLink to={navigationRoutes.main()}>{'<<< Go back'}</NavLink>
        </button>
        {storage.isAuthtoraized && <FavoriteButton id={character.id} />}
        <div className="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700 font-acme">
          <img
            src={character.image}
            alt="character image"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-6">
          <h6 className="mb-4 block font-sans font-semibold uppercase leading-relaxed tracking-normal text-gray-900 font-acme">
            {`CHARACTER'S INFO`}
          </h6>
          <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-acid font-acme">
            {character.name}
          </h4>
          <div className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 font-acme">
            <p>
              <strong>Gender: </strong>
              {character.gender}
            </p>
            <p>
              <strong>Species: </strong>
              {character.species}
            </p>
            <p>
              <strong>Status: </strong>
              {character.status}
            </p>
            <p>
              <strong>Origin: </strong>
              {character.origin?.name}
            </p>
            <p>
              <strong>Location: </strong>
              {character.location?.name}
            </p>
            <p>
              <strong>Episodes: </strong>
              {character.episode?.reduce((acc, episode) => {
                if (acc === '') return episode.match(/\d+/)[0];
                return `${acc}, ${episode.match(/\d+/)[0]}`;
              }, '')}
            </p>
            {isTelegramShareEnabled && (
              <ShareButton text={`Learn about ${character.name}`} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
