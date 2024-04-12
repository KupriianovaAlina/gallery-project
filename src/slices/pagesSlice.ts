import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from './sharedThunks';
import { pagesState as State } from './types';
import { FETCH_STATUS } from '../utils/constants';

const initialState: State = {
  numberOfPages: 1,
  activePage: 1,
  fetchStatus: FETCH_STATUS.Idle,
  error: null,
};

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    setActivePage: (state, { payload: newActivePage }) => {
      state.activePage = Number(newActivePage);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        if (payload && payload.info) {
          state.numberOfPages = payload.info.pages;
        }
        state.fetchStatus = FETCH_STATUS.Fulfilled;
      })
      .addCase(fetchData.pending, state => {
        state.fetchStatus = FETCH_STATUS.Pending;
      })
      .addCase(fetchData.rejected, (state, action) => {
        Object.assign(state, {
          ...initialState,
          fetchStatus: FETCH_STATUS.Rejected,
          error: action.error.message ?? null,
        });
      });
  },
});

export const { reducer: pagesReducer, actions: pagesActions } = pagesSlice;
