import { configureStore } from '@reduxjs/toolkit';
import { charactersReducer } from './charactersSlice';
import { pagesReducer } from './pagesSlice';
import { filtersReducer } from './filtersSlice';

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    pages: pagesReducer,
    filters: filtersReducer,
  },
});
