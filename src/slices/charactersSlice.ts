import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchData, fetchCharacter } from './sharedThunks';
import { Payload, Character, charactersState as State } from './types';

const initialState: State = {
  byIds: {},
  allIds: [],
  favoriteIds: [],
  currentCharacter: {},
  fetchStatus: 'idle',
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        fetchData.fulfilled,
        (state, { payload }: PayloadAction<Payload>) => {
          if (!payload.results) {
            state.currentCharacter = payload;
            state.fetchStatus = 'fulfilled';
            return;
          } else {
            const byId: Record<number, Character> = payload.results.reduce(
              (byId, character) => {
                byId[character.id] = character;
                return byId;
              },
              {} as Record<number, Character>,
            );
            state.byIds = byId;
            state.allIds = Object.keys(byId).map(Number);
            state.fetchStatus = 'fulfilled';
          }
        },
      )
      .addCase(fetchData.pending, state => {
        state.fetchStatus = 'pending';
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.fetchStatus = 'rejected';
      })
      .addCase(
        fetchCharacter.fulfilled,
        (state, { payload }: PayloadAction<Payload>) => {
          state.currentCharacter = payload;
          state.fetchStatus = 'fulfilled';
        },
      )
      .addCase(fetchCharacter.pending, state => {
        state.fetchStatus = 'pending';
      })
      .addCase(fetchCharacter.rejected, state => {
        state.fetchStatus = 'fulfilled';
      });
  },
});

export const { reducer: charactersReducer, actions: charactersActions } =
  charactersSlice;
