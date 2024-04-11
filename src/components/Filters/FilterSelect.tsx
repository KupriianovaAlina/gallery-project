import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtersSelector } from '../../slices/selectors';
import { CloseButton } from '../shared/CloseButton';
import { useUrlQueryParams } from '../hooks/useUrlQueryParams';
import { filtersActions } from '../../slices/filtersSlice';
import { pagesActions } from '../../slices/pagesSlice';
import { FilterSelectProps } from './types/types';
import { AppDispatch } from '../../slices/types';

export const FilterSelect: React.FC<FilterSelectProps> = ({
  options,
  id,
  label,
}) => {
  const filter = useSelector(filtersSelector);
  const [selectedOption, setSelectedOption] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const { updateQueryParams } = useUrlQueryParams();

  const resetActivePage = () => {
    dispatch(pagesActions.setActivePage(1));
    updateQueryParams({ page: 1 });
  };

  const handleSelectChange = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;
    e.preventDefault();
    setSelectedOption(value);
    resetActivePage();
  };

  const resetSelection = () => {
    setSelectedOption('');
    resetActivePage();
  };

  const setFilterAction = (filterId: string, value: string) => {
    switch (filterId) {
      case 'status':
        return filtersActions.setStatusFilter(value);
      case 'gender':
        return filtersActions.setGenderFilter(value);
      default:
        throw new Error(`Unknown filterId: ${filterId}`);
    }
  };

  useEffect(() => {
    const filterAction = setFilterAction(id, selectedOption);
    if (filterAction) {
      dispatch(filterAction);
      updateQueryParams({ [id]: selectedOption });
    }
  }, [selectedOption, id, dispatch]);

  useEffect(() => {
    setSelectedOption(filter[`${id}Filter`] || '');
  }, [filter[`${id}Filter`]]);

  return (
    <div>
      <div className="relative mt-2 rounded-md shadow-sm h-10">
        <select
          name={id}
          id={id}
          className="block w-full rounded-md font-sans text-2xl font-semibold border py-1.5 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-full"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="" disabled hidden>
            {label}
          </option>
          {options.map(option => (
            <option
              key={option}
              value={option}
              className={'font-sans text-xl font-semibold'}
            >
              {option}
            </option>
          ))}
        </select>
        {selectedOption && <CloseButton resetFunction={resetSelection} />}
      </div>
    </div>
  );
};
