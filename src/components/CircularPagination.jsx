import React from 'react';
import { IconButton, Typography } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { pagesSelector } from '../slices/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { pagesActions } from '../slices/pagesSlice';
import { fetchData } from '../slices/sharedThunks';


export function Pagination() {
  const pages = useSelector(pagesSelector);
  const dispatch = useDispatch();

  const next = () => {
    if (pages.activePage === pages.numberOfPages) return;

    dispatch(pagesActions.setActivePage(pages.activePage + 1));
    dispatch(fetchData(pages.activePage + 1));
  };

  const prev = () => {
    if (pages.activePage === 1) return;

    dispatch(pagesActions.setActivePage(pages.activePage - 1));
    dispatch(fetchData(pages.activePage - 1));
  };

  return (
    <div className="flex items-center gap-8 text-white py-6">
      <IconButton
        size="sm"
        variant="outlined"
        onClick={prev}
        disabled={pages.activePage === 1}
        className="bg-white"
      >
        <ArrowLeftIcon strokeWidth={2} className="h-5 w-5 rounded bg-white" />
      </IconButton>
      <Typography color="gray" className="font-normal">
        Page <strong className="">{pages.activePage}</strong> of{' '}
        <strong className="">{pages.numberOfPages}</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={next}
        disabled={pages.activePage === pages.numberOfPages}
        className="bg-white"
      >
        <ArrowRightIcon strokeWidth={2} className="h-5 w-5 rounded" />
      </IconButton>
    </div>
  );
}
