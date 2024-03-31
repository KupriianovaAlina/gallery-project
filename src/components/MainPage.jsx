import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { charactersSelector } from '../slices/selectors';
import { fetchData } from '../slices/sharedThunks';
// eslint-disable-next-line no-unused-vars
import { charactersActions } from '../slices/charactersSlice';
import Gallery from './Gallery';
import { Pagination } from '../components/CircularPagination';

const MainPage = () => {
  const characters = useSelector(charactersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div
      className="flex flex-col justify-center items-center bg-gray-800 py-10"
      style={{ backgroundImage: 'url(/images/galaxy.png)' }}
    >
      <section>
        <img className="w-1/2 mx-auto" src={'/images/gallery-title.png'} />
      </section>
      <Gallery characters={characters} />
      <Pagination />
    </div>
  );
};

export default MainPage;
