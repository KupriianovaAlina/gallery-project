import CardPreview from './CardPreview';
import { useSelector } from 'react-redux';
import { charactersSelector } from '../slices/selectors';

const Gallery = () => {
  const characters = useSelector(charactersSelector);

  if (
    Object.keys(characters.byIds).length === 0 ||
    characters.fetchStatus === 'rejected'
  ) {
    return (
      <div className="text-center font-sans text-5xl font-semibold text-white">
        No results
      </div>
    );
  }

  return (
    <section className="flex flex-col lg:flex-row lg:flex-wrap gap-7 px-10 w-full justify-center items-center">
      {Object.values(characters.byIds).map(character => {
        return <CardPreview character={character} key={character.id} />;
      })}
    </section>
  );
};

export default Gallery;
