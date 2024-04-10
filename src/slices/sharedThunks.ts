import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_ROOT } from '../utils/constants';
import { FetchDataParams } from './types';

const url = ({
  pageNumber = 1,
  name,
  status,
  gender,
  id,
  ids,
}: FetchDataParams): string => {
  if (id) return `${API_URL_ROOT}/${id}`;
  if (ids) return `${API_URL_ROOT}/${ids.join(",")}`;

  const params = new URLSearchParams(`page=${pageNumber}`);

  if (name) params.append('name', name);
  if (status) params.append('status', status);
  if (gender) params.append('gender', gender);

  return `${API_URL_ROOT}?${params}`;
};

export const fetchData = createAsyncThunk<
  any, // Тип данных, который возвращается из выполненного promise
  FetchDataParams, // Первый параметр для payloadCreator
  {
    rejectValue: string // Тип ошибки
  }
>
(
  'fetchData',
  async (params: FetchDataParams, { rejectWithValue }) => {
    try {
      const response = await fetch(url(params));
      const data = await response.json();

  if (!response.ok || data.error) {
    const errorMessage = data.error?.message || 'Ошибка при выполнении запроса';
    if (errorMessage === 'There is nothing here') {
      return rejectWithValue('Нет результатов');
    }
    return rejectWithValue(errorMessage);
  }
  return data;
} catch (error: any) {
  console.error('Произошла ошибка:', error.message);
  return rejectWithValue(error.toString());
}
  },
);

export const fetchCharacter = createAsyncThunk<
  any, // Тип данных, который возвращается из выполненного promise
  number, // Первый параметр для payloadCreator
  {
    rejectValue: string // Тип ошибки
  }
>
(
  'fetchCharacter',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(url({ id }));
      const data = await response.json();

  if (!response.ok || data.error) {
        const errorMessage = data.error?.message || 'Ошибка при выполнении запроса';
        if (errorMessage === 'There is nothing here') {
          return rejectWithValue('Нет результатов');
        }
        return rejectWithValue(errorMessage);
      }
      return data;
    } catch (error: any) {
      console.error('Произошла ошибка:', error.message);
      return rejectWithValue(error.toString());
    }
  },
);

export const fetchFavoriteCharacters = createAsyncThunk<
  any, // Тип данных, который возвращается из выполненного promise
  number[], // Первый параметр для payloadCreator
  {
    rejectValue: string // Тип ошибки
  }
>(
  'fetchFavoriteCharacters',
  async (ids: number[], { rejectWithValue }) => {
    try {
      const response = await fetch(url({ ids }));
      const data = await response.json();

      if (!response.ok || data.error) {
        const errorMessage = data.error?.message || 'Ошибка при выполнении запроса';
        if (errorMessage === 'There is nothing here') {
          return rejectWithValue('Нет результатов');
        }
        return rejectWithValue(errorMessage);
      }
      return data;
    } catch (error: any) {
      console.error('Произошла ошибка:', error.message);
      return rejectWithValue(error.toString());
    }
  },
);