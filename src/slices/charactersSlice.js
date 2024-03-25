import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getApiResource } from '../utils/networks';

export const uploadCharacters = createAsyncThunk(
  'characters/uploadCharacters',
  async () => {
    const response = await getApiResource();
    console.log(response);
    return response;
  }
);

const initialState = {
  byIds: {},
  allIds: [],
  favoriteIds: [],
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadCharacters.fulfilled, (state, { payload }) => {
      const byId = payload.results.reduce((byId, user) => {
        byId[user.id] = user;
        return byId;
      }, {}
      );
      state.byIds = byId;
      state.allIds = Object.keys(byId);
    })
  },
});

export const { reducer: charactersReducer, actions: charactersActions } = charactersSlice;
