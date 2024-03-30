import { configureStore } from '@reduxjs/toolkit';
import { charactersReducer } from './charactersSlice';

export default configureStore({
  reducer: {
    characters: charactersReducer,
  },
});