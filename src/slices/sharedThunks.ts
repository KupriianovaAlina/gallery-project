import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_ROOT } from '../utils/constants';

const url = (pageNumber: number = 1): string => `${API_URL_ROOT}?page=${pageNumber}`;

export const fetchData = createAsyncThunk(
  'shared/fetchData',
  async (pageNumber: number, { rejectWithValue }) => {
    try {
      const response = await fetch(url(pageNumber));
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Ошибка при выполнении запроса');
      }
    } catch (error: any) {
      console.error('Произошла ошибка:', error.message);
      rejectWithValue(error);
    }
  }
);