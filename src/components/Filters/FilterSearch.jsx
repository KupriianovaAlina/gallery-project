import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from '../hooks/useDebounce';
import { filtersSelector } from '../../slices/selectors';
import { CloseButton } from '../shared/CloseButton';
import { useUrlQueryParams } from '../hooks/useUrlQueryParams';
import { filtersActions } from '../../slices/filtersSlice';
import { pagesActions } from '../../slices/pagesSlice';

const FilterSearch = () => {
  const [inputValue, setInputValue] = useState('');
  const { updateQueryParams } = useUrlQueryParams();

  const debouncedSearchTerm = useDebounce(inputValue, 500);
  const dispatch = useDispatch();
  const filter = useSelector(filtersSelector);

  const resetActivePage = () => {
    dispatch(pagesActions.setActivePage(1));
    updateQueryParams({ page: 1 });
  };

  const resetSearch = () => {
    setInputValue('');
    resetActivePage();
  };

  const handleInputChange = e => {
    setInputValue(e.target.value);
    e.preventDefault();
    resetActivePage();
  };

  useEffect(() => {
    dispatch(filtersActions.setNameFilter(debouncedSearchTerm));

    updateQueryParams({ name: debouncedSearchTerm });
  }, [debouncedSearchTerm, dispatch]);

  useEffect(() => {
    setInputValue(filter[`nameFilter`]);
  }, [filter[`nameFilter`]]);

  return (
    <div className="relative mt-2 rounded-md shadow-sm">
      <input
        type="text"
        name="name"
        id="name"
        className="block w-full font-sans text-2xl font-semibold rounded-md border py-1.5 pl-4 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-10"
        placeholder="Name"
        value={inputValue}
        onChange={handleInputChange}
      />
      {inputValue && <CloseButton resetFunction={resetSearch} />}
    </div>
  );
};

export default FilterSearch;
