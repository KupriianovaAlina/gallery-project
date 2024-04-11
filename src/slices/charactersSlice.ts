import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchData,
  fetchCharacter,
  fetchFavoriteCharacters,
} from './sharedThunks';
import { Payload, Character, charactersState as State } from './types';
import { FETCH_STATUS } from '../utils/constants';

const initialState: State = {
  byIds: {},
  allIds: [],
  currentCharacter: {},
  fetchStatus: FETCH_STATUS.Idle,
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
            (byId: Record<number, Character>, character: Character) => {
              byId[character.id] = character;
              return byId;
            },
            {} as Record<number, Character>,
          );
          state.byIds = byId;
          state.allIds = Object.keys(byId).map(Number);
          state.fetchStatus = FETCH_STATUS.Fulfilled;
        },
      )
      .addCase(fetchData.pending, state => {
        state.fetchStatus = FETCH_STATUS.Pending;
      })
      .addCase(fetchData.rejected, (state, action) => {
        Object.assign(state, {
          ...initialState,
          fetchStatus: FETCH_STATUS.Rejected,
          error: action.error.message ?? null,
        });
      })
      .addCase(
        fetchCharacter.fulfilled,
        (state, { payload }: PayloadAction<Payload>) => {
          state.currentCharacter = payload;
          state.fetchStatus = FETCH_STATUS.Fulfilled;
        },
      )
      .addCase(fetchCharacter.pending, state => {
        state.fetchStatus = FETCH_STATUS.Pending;
      })
      .addCase(fetchCharacter.rejected, state => {
        state.fetchStatus = FETCH_STATUS.Rejected;
      })
      .addCase(fetchFavoriteCharacters.fulfilled, (state, { payload }) => {
        const characters = payload.length ? payload : [payload];
        const byId: Record<number, Character> = characters.reduce(
          (byId: Record<number, Character>, character: Character) => {
            byId[character.id] = character;
            return byId;
          },
          {} as Record<number, Character>,
        );
        state.byIds = byId;
        state.allIds = Object.keys(byId).map(Number);
      })
      .addCase(fetchFavoriteCharacters.pending, state => {
        state.fetchStatus = FETCH_STATUS.Pending;
      })
      .addCase(fetchFavoriteCharacters.rejected, state => {
        state.fetchStatus = FETCH_STATUS.Rejected;
      });
  },
});

export const { reducer: charactersReducer, actions: charactersActions } =
  charactersSlice;
