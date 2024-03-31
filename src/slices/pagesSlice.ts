import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchData } from './sharedThunks';

type State = {
  numberOfPages: number | null,
  activePage: number,
  fetchStatus: Status,
}

type Character = {
  created: string,
  episode: string[],
  gender: string,
  id: number,
  image: string,
  location: {
    name: string,
    url: string
  },
  name: string,
  origin: {
    name: string, url: string
  },
  species: string,
  status: string,
  type: string,
  url: string
}

type Info = {
  count: number,
  next: string,
  pages: number,
  prev: null | string,
}

type Payload = {
  info: Info,
  results: Character[]
}

type Status = 'idle' | 'pending' | 'rejected' | 'fulfilled';

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