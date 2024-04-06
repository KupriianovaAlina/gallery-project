import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_ROOT } from '../utils/constants';

const pageUrl = (pageNumber: number = 1): string => `${API_URL_ROOT}?page=${pageNumber}`;
const idUrl = (id: number): string => `${API_URL_ROOT}/${id}`

export const fetchData = createAsyncThunk(
  'fetchData',
  async (pageNumber: number, { rejectWithValue }) => {
    try {
      const response = await fetch(pageUrl(pageNumber));
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Ошибка при загрузке данных');
      }
    } catch (error: any) {
      console.error('Произошла ошибка:', error.message);
      rejectWithValue(error);
    }
  }
);

export const fetchCharacter = createAsyncThunk(
  'fetchCharacter',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(idUrl(id));
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Ошибка при загрузке персонажа');
      }
    } catch (error: any) {
      console.error('Произошла ошибка:', error.message);
      rejectWithValue(error);
    }
  }
);