import { store } from './index';
import { charactersState, filtersState, pagesState } from './types';

export type RootState = ReturnType<typeof store.getState>;

export const charactersSelector = (state: RootState): charactersState =>
  state.characters;
export const pagesSelector = (state: RootState): pagesState => state.pages;
export const filtersSelector = (state: RootState): filtersState =>
  state.filters;
