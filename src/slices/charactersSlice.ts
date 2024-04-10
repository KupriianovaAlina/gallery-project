import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchData } from './sharedThunks';
import {
  Info,
  Payload,
  Status,
  Character,
  charactersState as State,
} from './types';
import { FETCH_STATUS } from '../utils/constants';

const initialState: State = {
  byIds: {},
  allIds: [],
  favoriteIds: [],
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
          if (!payload.results) {
            state.currentCharacter = payload;
            state.fetchStatus = FETCH_STATUS.Fulfilled;
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
            state.fetchStatus = FETCH_STATUS.Fulfilled;
          }
        },
      )
      .addCase(fetchData.pending, state => {
        state.fetchStatus = FETCH_STATUS.Pending;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.fetchStatus = FETCH_STATUS.Rejected;
        state.byIds = {};
      });
  },
});

export const { reducer: charactersReducer, actions: charactersActions } =
  charactersSlice;
