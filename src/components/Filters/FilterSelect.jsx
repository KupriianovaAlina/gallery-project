import React, { useEffect, useState } from 'react';
import { filtersActions } from '../../slices/filtersSlice';
import { pagesActions } from '../../slices/pagesSlice';
import { fetchData } from '../../slices/sharedThunks';
import { useDispatch, useSelector } from 'react-redux';
import { filtersSelector } from '../../slices/selectors';
import { CloseButton } from '../shared/CloseButton';

export const FilterSelect = ({ options, id, label }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const dispatch = useDispatch();
  const filter = useSelector(filtersSelector);

  const handleSelectChange = e => {
    setSelectedOption(e.target.value);
    e.preventDefault();
  };
  const resetSelection = () => {
    setSelectedOption('');
  };

  const setFilterAction = (filterId, value) => {
    switch (filterId) {
      case 'status':
        return filtersActions.setStatusFilter(value);
      case 'gender':
        return filtersActions.setGenderFilter(value);
      default:
        break;
    }
  };

  useEffect(() => {
    const params = {
      pageNumber: 1,
      name: filter?.nameFilter,
      status: filter?.statusFilter,
      gender: filter?.genderFilter,
    };
    params[id] = selectedOption;

    const filterAction = setFilterAction(id, selectedOption);
    dispatch(filterAction);
    dispatch(pagesActions.setActivePage(1));
    dispatch(fetchData(params));
  }, [selectedOption, id, dispatch]);

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