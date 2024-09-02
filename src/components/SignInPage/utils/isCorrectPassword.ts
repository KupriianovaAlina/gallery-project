import { User } from '../types/types';

export const isCorrectPassword = (user: User | undefined, password: string) => {
  return user ? password === user.password : false;
};
