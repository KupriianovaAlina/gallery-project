import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API_URL_ROOT } from '../utils/constants'

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

type State = {
  byIds: Record<number, Character>,
  allIds: number[],
  favoriteIds: number[],
  fetchStatus: Status
}

export const uploadCharacters = createAsyncThunk(
  'characters/uploadCharacters',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL_ROOT);

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

const initialState: State = {
  byIds: {},
  allIds: [],
  favoriteIds: [],
  fetchStatus: 'idle',
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadCharacters.fulfilled, (state, { payload }: PayloadAction<Payload>) => {
      const byId: Record<number, Character> = payload.results.reduce((byId, character) => {
        byId[character.id] = character;
        return byId;
      }, {} as Record<number, Character>);
      state.byIds = byId;
      state.allIds = Object.keys(byId).map(Number);
      state.fetchStatus = 'fulfilled'
    })
      .addCase(uploadCharacters.pending, (state) => {
        state.fetchStatus = 'pending'
      })
      .addCase(uploadCharacters.rejected, (state) => {
        state.fetchStatus = 'rejected'
      })
  },
});

export const { reducer: charactersReducer, actions: charactersActions } = charactersSlice;
