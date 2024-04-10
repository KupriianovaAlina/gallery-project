import CardPreview from './CardPreview';
import { useSelector } from 'react-redux';
import { charactersSelector } from '../slices/selectors';
import { useEffect, useState } from 'react';

const Gallery = ({ setImagesLoading }) => {
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);
  const characters = useSelector(charactersSelector);

  useEffect(() => {
    if (Object.values(characters.byIds).length === 0) {
      setImagesLoading(false);
    }
  }, [characters.byIds, setImagesLoading]);

  const handleImageLoaded = () => {
    setLoadedImagesCount(prevCount => {
      const updatedCount = prevCount + 1;
      // Если все изображения загружены, обновляем состояние в MainPage
      if (updatedCount === Object.values(characters.byIds).length) {
        setImagesLoading(false);
      }
      return updatedCount;
    });
  };
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
    <section className="flex flex-wrap gap-10 px-10 justify-center">
      {Object.values(characters.byIds).map(character => {
        return (
          <CardPreview
            character={character}
            key={character.id}
            onImageLoaded={() => handleImageLoaded()}
          />
        );
      })}
    </section>
  );
};

export default Gallery;
