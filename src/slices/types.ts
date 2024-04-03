export type pagesState = {
  numberOfPages: number | null,
  activePage: number,
  fetchStatus: Status,
}

export type charactersState = {
  byIds: Record<number, Character>,
  allIds: number[],
  favoriteIds: number[],
  fetchStatus: Status,
}

export type Character = {
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

export type Info = {
  count: number,
  next: string,
  pages: number,
  prev: null | string,
}

export type Payload = {
  info: Info,
  results: Character[]
}

export type Status = 'idle' | 'pending' | 'rejected' | 'fulfilled';
