export type FormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export type ErrorMessages = Record<string, string>;

export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  history: string[];
  favoriteIds: string[];
}
