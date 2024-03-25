import { useEffect } from 'react';
import { getApiResource } from '../utils/networks'
import { useSelector, useDispatch } from 'react-redux';
import { charactersActions } from '../slices/charactersSlice.js';
import { charactersSelector } from '../slices/selectors';

const MainPage = () => {
  const characters = useSelector(charactersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    getApiResource()
      .then((res) => dispatch(charactersActions.uploadCharacters(res)))
  }, [])

  console.log(characters)

  return (
    <>
      <div>{'Код галереи персонажей 🦋'}</div>
      {Object.values(characters.byIds).map((character) => <p key={character.id}>{`${character.name}, ${character.id}`}</p>
      )}
    </>
  )
}

export default MainPage;