import { createSlice } from '@reduxjs/toolkit';

// Начальное значение
const initialState = {
  byIds: {},
  allIds: [],
  favoriteIds: [],
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    uploadCharacters: (state, { payload }) => {
      payload.results.forEach((character) => {
        state.byIds[character.id] = character;
        state.allIds.push(character.id);
      })
    },
  },
});

export const { uploadCharacters } = charactersSlice.actions;

export default charactersSlice.reducer;