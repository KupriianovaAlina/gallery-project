import React from 'react';
import { pagesSelector } from '../slices/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { pagesActions } from '../slices/pagesSlice';
import { useUrlQueryParams } from './hooks/useUrlQueryParams';

export function Pagination() {
  const pages = useSelector(pagesSelector);
  const dispatch = useDispatch();
  const { updateQueryParams } = useUrlQueryParams();

  const next = () => {
    if (pages.activePage === pages.numberOfPages) return;
    const newPage = pages.activePage + 1;
    dispatch(pagesActions.setActivePage(newPage));
    updateQueryParams({ page: newPage });
  };

  const prev = () => {
    if (pages.activePage === 1) return;
    const newPage = pages.activePage - 1;
    dispatch(pagesActions.setActivePage(newPage));
    updateQueryParams({ page: newPage });
  };

  return (
    <div className="flex items-center gap-4 py-6">
      <button
        disabled={pages.activePage === 1}
        onClick={prev}
        className="bg-white align-middle text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] inheret"
        type="button"
      >
        <span className="flex justify-center">
          <img
            className="h-6 w-6 rounded"
            src="./images/leftArrow.svg"
            alt="left arrow"
          />
        </span>
      </button>
      <p color="gray" className="text-white">
        Page <strong>{pages.activePage}</strong> of{' '}
        <strong>{pages.numberOfPages}</strong>
      </p>
      <button
        onClick={next}
        disabled={pages.activePage === pages.numberOfPages}
        className="bg-white font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85]"
        type="button"
      >
        <span className="flex justify-center">
          <img
            className="h-6 w-6 rounded"
            src="./images/rightArrow.svg"
            alt="right arrow"
          />
        </span>
      </button>
    </div>
  );
}
