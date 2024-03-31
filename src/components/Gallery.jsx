import Card from './Card';

const Gallery = ({ characters }) => {
  return (
    <section className="flex flex-wrap gap-10 px-10 justify-center">
      {Object.values(characters.byIds).map(character => {
        return <Card character={character} key={character.id} />;
      })}
    </section>
  );
};

export default Gallery;
