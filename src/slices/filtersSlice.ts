import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchData } from './sharedThunks';
import { Payload, filtersState } from './types';

const initialState: filtersState = {
  nameFilter: '',
  statusFilter: '',
  genderFilter: '',
  fetchStatus: 'idle',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setNameFilter: (state, action: PayloadAction<string>) => {
      state.nameFilter = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload;
    },
    setGenderFilter: (state, action: PayloadAction<string>) => {
      state.genderFilter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        fetchData.fulfilled,
        (state, action: PayloadAction<Payload | undefined>) => {
          state.fetchStatus = 'fulfilled';
        },
      )
      .addCase(fetchData.pending, state => {
        state.fetchStatus = 'pending';
      })
      .addCase(fetchData.rejected, state => {
        state.fetchStatus = 'rejected';
      });
  },
});

export const { reducer: filtersReducer, actions: filtersActions } =
  filtersSlice;