import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchData } from './sharedThunks';
import { Payload, filtersState } from './types';
import { FETCH_STATUS } from '../utils/constants';

const initialState: filtersState = {
  nameFilter: '',
  statusFilter: '',
  genderFilter: '',
  fetchStatus: FETCH_STATUS.Idle,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setNameFilter: (state, action: PayloadAction<string>) => ({
      ...state,
      nameFilter: action.payload,
    }),
    setStatusFilter: (state, action: PayloadAction<string>) => ({
      ...state,
      statusFilter: action.payload,
    }),
    setGenderFilter: (state, action: PayloadAction<string>) => ({
      ...state,
      genderFilter: action.payload,
    }),
  },
  extraReducers: builder => {
    builder
      .addCase(fetchData.fulfilled, state => ({
        ...state,
        fetchStatus: FETCH_STATUS.Fulfilled,
      }))
      .addCase(fetchData.pending, state => ({
        ...state,
        fetchStatus: FETCH_STATUS.Pending,
      }))
      .addCase(fetchData.rejected, state => ({
        ...state,
        fetchStatus: FETCH_STATUS.Rejected,
      }));
  },
});

export const { reducer: filtersReducer, actions: filtersActions } =
  filtersSlice;
