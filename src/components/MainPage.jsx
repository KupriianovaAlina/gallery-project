import { useEffect } from 'react';
import { getApiResource } from '../utils/networks'
import { useSelector, useDispatch } from 'react-redux';
import { uploadCharacters } from '../slices/charactersSlice.js';

const MainPage = () => {
  const characters = useSelector((state) => state.characters);
  const dispatch = useDispatch();

  useEffect(() => {
    getApiResource()
      .then((res) => dispatch(uploadCharacters(res)))
  }, [])

  console.log(characters)

  return (
    <>
      <div>{'Код галереи персонажей 🦋'}</div>
      {Object.values(characters.byIds).map((character) => <p>{`${character.name}, ${character.id}`}</p>
      )}
    </>
  )
}

export default MainPage;