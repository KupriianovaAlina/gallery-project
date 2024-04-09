import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { charactersSelector, pagesSelector } from '../slices/selectors';
import { fetchData } from '../slices/sharedThunks';
import Gallery from './Gallery';
import { Pagination } from '../components/Pagination';
import { Filters } from './Filters/Filters';

const MainPage = () => {
  const characters = useSelector(charactersSelector);
  const pages = useSelector(pagesSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData(pages.activePage));
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-center items-center py-10">
      <section>
        <h2 className="font-acme text-white text-6xl mb-10">
          {"Characters' gallery"}
        </h2>
      </section>
      <Filters />
      <Gallery characters={characters} />
      <Pagination />
    </div>
  );
};

export default MainPage;
