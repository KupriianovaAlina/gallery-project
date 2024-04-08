import CardPreview from './CardPreview';

const Gallery = ({ characters }) => {
  const { byIds } = characters;

  if (Object.keys(byIds).length === 0) {
    return (
      <div className="text-center font-sans text-5xl font-semibold text-white">
        No results
      </div>
    );
  }

  return (
    <section className="flex flex-wrap gap-10 px-10 justify-center">
      {Object.values(characters.byIds).map(character => {
        return <CardPreview character={character} key={character.id} />;
      })}
    </section>
  );
};

export default Gallery;
