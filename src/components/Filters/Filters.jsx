import React from 'react';
import FilterSearch from './FilterSearch';

import { genders, statuses } from './constants';
import { FilterSelect } from './FilterSelect';

const Filters = () => {
  const filterConfigs = [
    { options: statuses, id: 'status', label: 'Status' },
    { options: genders, id: 'gender', label: 'Gender' },
  ];
  return (
    <div className="flex flex-row gap-12 items-end mb-10 mx-auto w-full justify-center">
      <FilterSearch />
      {filterConfigs.map(filter => (
        <div key={filter.id} className="w-1/7">
          <FilterSelect
            options={filter.options}
            id={filter.id}
            label={filter.label}
          />
        </div>
      ))}
    </div>
  );
};

export default Filters;