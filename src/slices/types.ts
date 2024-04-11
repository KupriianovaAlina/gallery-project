import { store } from './index';

export type pagesState = {
  numberOfPages: number | null;
  activePage: number;
  fetchStatus: Status;
  error: string | null;
};

export type charactersState = {
  byIds: Record<number, Character>;
  allIds: number[];
  currentCharacter: Character | Record<string, never>;
  fetchStatus: Status;
};

export type Character = {
  id: number;
  name: string;
  status: string;
  created: string;
  episode: string[];
  gender: string;
  image: string;
  location: {
    name: string;
    url: string;
  };
  origin: {
    name: string;
    url: string;
  };
  species: string;
  type: string;
  url: string;
};

export type Info = {
  count: number;
  next: string;
  pages: number;
  prev: null | string;
  filters: string | undefined;
};

export type Payload = {
  info: Info;
  results: Character[];
};

export type Status = 'idle' | 'pending' | 'rejected' | 'fulfilled';

export type filtersState = {
  nameFilter: string;
  statusFilter: string;
  genderFilter: string;
  fetchStatus: Status;
};

export type FetchDataParams = {
  pageNumber?: number;
  name?: string;
  status?: string;
  gender?: string;
  [key: string]: any;
  id?: number;
  ids?: number[];
};

export type FilterSelectProps = {
  options: { label: string; value: string }[];
  id: string;
  label: string;
};

export type AppDispatch = typeof store.dispatch;
