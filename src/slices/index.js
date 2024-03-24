import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './charactersSlice.js';

export default configureStore({
  reducer: {
    characters: charactersReducer,
  },
});