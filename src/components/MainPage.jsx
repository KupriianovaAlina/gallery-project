import { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  charactersSelector,
  filtersSelector,
  pagesSelector,
} from '../slices/selectors';
import { fetchData } from '../slices/sharedThunks';
import Gallery from './Gallery';
import { Pagination } from '../components/Pagination';
import Filters from './Filters/Filters';
import { filtersActions } from '../slices/filtersSlice';
import { pagesActions } from '../slices/pagesSlice';
import { useUrlQueryParams } from './hooks/useUrlQueryParams';
import { StorageContext } from './StorageProvider';

const MainPage = () => {
  const dispatch = useDispatch();
  const characters = useSelector(charactersSelector);
  const { nameFilter, statusFilter, genderFilter } =
    useSelector(filtersSelector);
  const { activePage } = useSelector(pagesSelector);
  const { getQueryParams } = useUrlQueryParams();
  const { isAuthtoraized, addSearchToHistory } = useContext(StorageContext);

  useEffect(() => {
    const { page, name, status, gender } = getQueryParams();

    dispatch(pagesActions.setActivePage(page || 1));
    dispatch(filtersActions.setNameFilter(name || ''));
    dispatch(filtersActions.setStatusFilter(status || ''));
    dispatch(filtersActions.setGenderFilter(gender || ''));
  }, [dispatch]);

  useEffect(() => {
    const params = {
      pageNumber: activePage,
      name: nameFilter,
      status: statusFilter,
      gender: genderFilter,
    };

    dispatch(fetchData(params));
    isAuthtoraized && addSearchToHistory(window.location.href);
  }, [nameFilter, statusFilter, genderFilter, activePage]);

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
