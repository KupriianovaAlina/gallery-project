import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { charactersActions } from '../slices/charactersSlice';
import { charactersSelector } from '../slices/selectors';
import { uploadCharacters } from '../slices/charactersSlice';

const MainPage = () => {
  const characters = useSelector(charactersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(uploadCharacters());
  }, [dispatch])

  return (
    <>
      <div>{'Код галереи персонажей 🦋'}</div>
      {Object.values(characters.byIds).map((character) => <p key={character.id}>{`${character.name}, ${character.id}`}</p>
      )}
    </>
  )
}

export default MainPage;