import React, { SyntheticEvent, useEffect, useState } from 'react';
import { fetchData } from '../../slices/sharedThunks';
import { useDispatch, useSelector } from 'react-redux';
import { filtersActions } from '../../slices/filtersSlice';
import { pagesActions } from '../../slices/pagesSlice';
import { useDebounce } from '../hooks/debounce';
import { filtersSelector } from '../../slices/selectors';
import { CloseButton } from '../shared/CloseButton';
import { AppDispatch } from '../../slices/types';

const FilterSearch = () => {
  const [inputValue, setInputValue] = useState('');
  const debouncedSearchTerm = useDebounce(inputValue, 500);
  const dispatch: AppDispatch = useDispatch();
  const filter = useSelector(filtersSelector);

  const resetSearch = () => {
    setInputValue('');
  };
  const handleInputChange = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;
    setInputValue(value);
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(filtersActions.setNameFilter(debouncedSearchTerm));
    dispatch(pagesActions.setActivePage(1));
    dispatch(
      fetchData({
        pageNumber: 1,
        name: debouncedSearchTerm,
        status: filter?.statusFilter,
        gender: filter?.genderFilter,
      }),
    );
  }, [debouncedSearchTerm, dispatch]);

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
