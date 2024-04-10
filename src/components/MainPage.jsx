import { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filtersSelector, pagesSelector } from '../slices/selectors';
import { fetchData } from '../slices/sharedThunks';
import Gallery from './Gallery';
import { Pagination } from './Pagination';
import { Filters } from './Filters/index';
import { filtersActions } from '../slices/filtersSlice';
import { pagesActions } from '../slices/pagesSlice';
import { useUrlQueryParams } from './hooks/useUrlQueryParams';
import { StorageContext } from './StorageProvider';

const MainPage = () => {
  const dispatch = useDispatch();
  const { nameFilter, statusFilter, genderFilter } =
    useSelector(filtersSelector);
  const { activePage } = useSelector(pagesSelector);
  const { getQueryParams } = useUrlQueryParams();
  const { isAuthtoraized, addSearchToHistory } = useContext(StorageContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { page, name, status, gender } = getQueryParams();

    dispatch(pagesActions.setActivePage(page || 1));
    dispatch(filtersActions.setNameFilter(name || ''));
    dispatch(filtersActions.setStatusFilter(status || ''));
    dispatch(filtersActions.setGenderFilter(gender || ''));
  }, [dispatch]);

  useEffect(() => {
    const fetchDataAndHandleLoading = async () => {
      setIsLoading(true);

      const params = {
        pageNumber: activePage,
        name: nameFilter,
        status: statusFilter,
        gender: genderFilter,
      };

      try {
        await dispatch(fetchData(params)).unwrap();
        setIsLoading(false);
        if (isAuthtoraized) {
          addSearchToHistory(window.location.href);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        setIsLoading(false);
      }
    };

    fetchDataAndHandleLoading();
  }, [
    dispatch,
    activePage,
    nameFilter,
    statusFilter,
    genderFilter,
    isAuthtoraized,
    addSearchToHistory,
  ]);

  return (
    <div className="flex flex-col justify-center items-center py-10">
      <section>
        <h2 className="font-acme text-white text-6xl mb-10">
          {"Characters' gallery"}
        </h2>
      </section>
      <Filters />
      {isLoading ? (
        <div className="text-center font-sans text-5xl font-semibold text-white">
          Loading...
        </div>
      ) : (
        <>
          <Gallery setImagesLoading={setIsLoading} />
          <Pagination />
        </>
      )}
    </div>
  );
};

export default MainPage;
