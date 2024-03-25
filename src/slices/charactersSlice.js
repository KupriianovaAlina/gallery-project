import { createSlice } from '@reduxjs/toolkit';

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
        if (!state.byIds[character.id]) {
          state.byIds[character.id] = character;
          state.allIds.push(character.id)
        }
      })
    },
  },
});

export const { reducer: charactersReducer, actions: charactersActions } = charactersSlice;
