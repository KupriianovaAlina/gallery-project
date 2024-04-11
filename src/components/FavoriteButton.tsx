import cn from 'classnames';
import { useState, useContext, useEffect } from 'react';
import { StorageContext } from '../contexts/StorageProvider';

interface FavoriteButtonProps {
  id: number;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ id }) => {
  const storage = useContext(StorageContext);

  const [isFavorite, setIsFavorite] = useState(
    storage.getUserFavorite().includes(id),
  );

  useEffect(() => {
    setIsFavorite(storage.getUserFavorite().includes(id));
  }, [id]);

  const toggleFavorite = () => {
    if (isFavorite) {
      setIsFavorite(false);
      storage.removeCardFromFavorite(id);
      return;
    }
    setIsFavorite(true);
    storage.addCardToFavorite(id);
  };

  const buttonClasses = cn(
    'absolute right-3 top-3 z-20 flex items-center transition-colors',
    {
      'text-gray-500 hover:text-yellow-500 hover:fill-yellow-500': !isFavorite,
      'text-yellow-500': isFavorite,
    },
  );

  return (
    <button className={buttonClasses} onClick={toggleFavorite}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-10"
        viewBox="0 0 20 25"
        fill="currentColor"
      >
        {!isFavorite && (
          <path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524-4.721 2.525.942-5.27-3.861-3.71 5.305-.733 2.335-4.817zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z" />
        )}
        {isFavorite && (
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
        )}
      </svg>
    </button>
  );
};

export default FavoriteButton;
