import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchData } from './sharedThunks';
import { Info, Payload, Status, pagesState as State } from './types'

const initialState: State = {
  numberOfPages: null,
  activePage: 1,
  fetchStatus: 'idle',
};

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    setActivePage: (state, { payload: newActivePage }) => {
      state.activePage = newActivePage;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, { payload }: PayloadAction<Payload>) => {
      state.numberOfPages = payload.info.pages;
      state.fetchStatus = 'fulfilled';
    })
      .addCase(fetchData.pending, (state) => {
        state.fetchStatus = 'pending';
      })
      .addCase(fetchData.rejected, (state) => {
        state.fetchStatus = 'rejected';
      })
  }
});

export const { reducer: pagesReducer, actions: pagesActions } = pagesSlice;