import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { charactersSelector } from '../slices/selectors';

export const Card = () => {
  const params = useParams();
  const characterId = params.id.slice(1);
  const characters = useSelector(charactersSelector);
  const character = characters.byIds[characterId];

  return (
    <div className="flex my-20 items-center justify-center">
      <div className="relative flex w-full max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
          <img
            src={character.image}
            alt="character image"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-6">
          <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
            {`CHARACTER'S INFO`}
          </h6>
          <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            {character.name}
          </h4>
          <p className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
            Информация
          </p>
        </div>
      </div>
    </div>
  );
};
