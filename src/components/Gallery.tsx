import CardPreview from './CardPreview';
import { useSelector } from 'react-redux';
import { charactersSelector } from '../slices/selectors';
import { Character } from '../slices/types';

const Gallery = () => {
  const characters = useSelector(charactersSelector);
  console.log(characters);

  if (characters.fetchStatus === 'pending') {
    return (
      <div className="text-center font-sans text-5xl font-semibold text-white">
        Loading...
      </div>
    );
  } else if (!characters.allIds[0] || characters.fetchStatus === 'rejected') {
    return (
      <div className="text-center font-sans text-5xl font-semibold text-white">
        No results
      </div>
    );
  }

  return (
    <section className="flex flex-col lg:flex-row lg:flex-wrap gap-7 px-10 w-full justify-center items-center">
      {Object.values(characters.byIds).map((character: Character) => (
        <CardPreview character={character} key={character.id} />
      ))}
    </section>
  );
};

export default Gallery;
