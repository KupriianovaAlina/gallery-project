import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchData } from './sharedThunks';
import { Info, Payload, Status, Character, charactersState as State } from './types'

const initialState: State = {
  byIds: {},
  allIds: [],
  favoriteIds: [],
  fetchStatus: 'idle',
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, { payload }: PayloadAction<Payload>) => {
      const byId: Record<number, Character> = payload.results.reduce((byId, character) => {
        byId[character.id] = character;
        return byId;
      }, {} as Record<number, Character>);
      state.byIds = byId;
      state.allIds = Object.keys(byId).map(Number);
      state.fetchStatus = 'fulfilled';

    })
      .addCase(fetchData.pending, (state) => {
        state.fetchStatus = 'pending';
      })
      .addCase(fetchData.rejected, (state) => {
        state.fetchStatus = 'rejected';
      })
  },
});

export const { reducer: charactersReducer, actions: charactersActions } = charactersSlice;
