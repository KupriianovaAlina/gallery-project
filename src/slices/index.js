import { configureStore } from '@reduxjs/toolkit';
import { charactersReducer } from './charactersSlice';
import { pagesReducer } from './pagesSlice';

export default configureStore({
  reducer: {
    characters: charactersReducer,
    pages: pagesReducer,
  },
});
