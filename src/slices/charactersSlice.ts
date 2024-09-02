import { createSlice } from '@reduxjs/toolkit';
import {
  fetchData,
  fetchCharacter,
  fetchFavoriteCharacters,
} from './sharedThunks';
import { Character, charactersState as State } from './types';
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
  reducers: {
    removeCharacter: (state, { payload }) => {
      const updatedAllIds = state.allIds.filter(elm => elm !== payload);
      const updatedByIds = { ...state.byIds };
      delete updatedByIds[payload];
      return { ...state, allIds: updatedAllIds, byIds: updatedByIds };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        const byId: Record<number, Character> = payload.results.reduce(
          (accumulator: Record<number, Character>, character: Character) => {
            accumulator[character.id] = character;
            return accumulator;
          },
          {} as Record<number, Character>,
        );
        return {
          ...state,
          byIds: byId,
          allIds: Object.keys(byId).map(Number),
          fetchStatus: FETCH_STATUS.Fulfilled,
        };
      })
      .addCase(fetchData.pending, state => ({
        ...state,
        fetchStatus: FETCH_STATUS.Pending,
      }))
      .addCase(fetchData.rejected, (state, action) => {
        Object.assign(state, {
          ...initialState,
          fetchStatus: FETCH_STATUS.Rejected,
          error: action.error.message ?? null,
        });
      })
      .addCase(fetchCharacter.fulfilled, (state, { payload }) => ({
        ...state,
        currentCharacter: payload,
        fetchStatus: FETCH_STATUS.Fulfilled,
      }))
      .addCase(fetchCharacter.pending, state => ({
        ...state,
        fetchStatus: FETCH_STATUS.Pending,
      }))
      .addCase(fetchCharacter.rejected, state => ({
        ...state,
        fetchStatus: FETCH_STATUS.Rejected,
      }))
      .addCase(fetchFavoriteCharacters.fulfilled, (state, { payload }) => {
        const characters = payload.length ? payload : [payload];
        const byId: Record<number, Character> = characters.reduce(
          (accumulator: Record<number, Character>, character: Character) => {
            accumulator[character.id] = character;
            return accumulator;
          },
          {} as Record<number, Character>,
        );
        return {
          ...state,
          byIds: byId,
          allIds: Object.keys(byId).map(Number),
          fetchStatus: FETCH_STATUS.Fulfilled,
        };
      })
      .addCase(fetchFavoriteCharacters.pending, state => ({
        ...state,
        fetchStatus: FETCH_STATUS.Pending,
      }))
      .addCase(fetchFavoriteCharacters.rejected, state => ({
        ...state,
        fetchStatus: FETCH_STATUS.Rejected,
      }));
  },
});

export const { reducer: charactersReducer, actions: charactersActions } =
  charactersSlice;
