import { useSearchParams } from 'react-router-dom';

export const useUrlQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getQueryParams = () => {
    return Array.from(searchParams.entries()).reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
  };

  const updateQueryParams = newParams => {
    Object.keys(newParams).forEach(key => {
      if (newParams[key] === '') {
        searchParams.delete(key);
      } else {
        searchParams.set(key, newParams[key]);
      }
    });

    setSearchParams(searchParams);
  };

  return { searchParams, getQueryParams, updateQueryParams };
};
