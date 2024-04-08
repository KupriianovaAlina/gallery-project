import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchData,
  fetchCharacter,
  fetchFavoriteCharacters,
} from './sharedThunks';
import { Payload, Character, charactersState as State } from './types';

const initialState: State = {
  byIds: {},
  allIds: [],
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
      })
      .addCase(fetchFavoriteCharacters.fulfilled, (state, { payload }) => {
        const characters = payload.length ? payload : [payload];
        const byId: Record<number, Character> = characters.reduce(
          (byId, character) => {
            byId[character.id] = character;
            return byId;
          },
          {} as Record<number, Character>,
        );
        state.byIds = byId;
        state.allIds = Object.keys(byId).map(Number);
      })
      .addCase(fetchFavoriteCharacters.pending, state => {
        state.fetchStatus = 'pending';
      })
      .addCase(fetchFavoriteCharacters.rejected, state => {
        state.fetchStatus = 'fulfilled';
      });
  },
});

export const { reducer: charactersReducer, actions: charactersActions } =
  charactersSlice;
