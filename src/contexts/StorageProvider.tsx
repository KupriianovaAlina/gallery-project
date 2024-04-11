import React, { createContext, useState } from 'react';

export interface StorageContextType {
  getUsers: () => any;
  setUsers: (users: any) => void;
  logIn: (currentUserEmail: string) => void;
  logOut: () => void;
  isAuthtoraized: boolean;
  getUserFavorite: () => any;
  addCardToFavorite: (id: number) => void;
  removeCardFromFavorite: (id: number) => void;
  getCurrentUserEmail: () => string | null;
  addSearchToHistory: (url: string) => void;
  getUserSearchHistory: () => string[];
}

export const StorageContext = createContext<StorageContextType>({
  getUsers: function () {
    throw new Error('Function not implemented.');
  },
  setUsers: function (users: any): void {
    throw new Error('Function not implemented.');
  },
  logIn: function (currentUserEmail: string): void {
    throw new Error('Function not implemented.');
  },
  logOut: function (): void {
    throw new Error('Function not implemented.');
  },
  isAuthtoraized: false,
  getUserFavorite: function () {
    throw new Error('Function not implemented.');
  },
  addCardToFavorite: function (id: number): void {
    throw new Error('Function not implemented.');
  },
  removeCardFromFavorite: function (id: number): void {
    throw new Error('Function not implemented.');
  },
  getCurrentUserEmail: function (): string | null {
    throw new Error('Function not implemented.');
  },
  addSearchToHistory: function (url: string): void {
    throw new Error('Function not implemented.');
  },
  getUserSearchHistory: function (): string[] {
    throw new Error('Function not implemented.');
  },
});

type Props = {
  children?: React.ReactNode;
};

const StorageProvider: React.FC<Props> = ({ children }) => {
  const getUsers = (): any => JSON.parse(localStorage.getItem('users') || '[]');

  const setUsers = (users: any): void => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  const getCurrentUserEmail = (): string | null =>
    localStorage.getItem('currentUserEmail');

  const getCurrentUser = (): any => {
    const currentUserEmail = getCurrentUserEmail();
    const users = getUsers();
    const [currentUser] = users.filter(
      (user: any) => user.email === currentUserEmail,
    );
    return currentUser;
  };

  const [isAuthtoraized, setAuth] = useState<boolean>(
    Boolean(getCurrentUserEmail()),
  );

  const addCardToFavorite = (id: number): void => {
    const users = getUsers();
    const currentUser = getCurrentUser();
    currentUser.favoriteIds.push(id);
    const updatedUsers = users.map((user: any) =>
      user.email === currentUser.email ? currentUser : user,
    );
    setUsers(updatedUsers);
  };

  const removeCardFromFavorite = (id: number): void => {
    const users = getUsers();
    const currentUser = getCurrentUser();
    const updatedFavoriteIds = currentUser.favoriteIds.filter(
      (favoriteId: number) => favoriteId !== id,
    );
    currentUser.favoriteIds = updatedFavoriteIds;
    const updatedUsers = users.map((user: any) =>
      user.email === currentUser.email ? currentUser : user,
    );
    setUsers(updatedUsers);
  };

  const addSearchToHistory = (url: string): void => {
    const users = getUsers();
    const currentUser = getCurrentUser();
    if (currentUser.history.indexOf(url) === -1) {
      currentUser.history.push(url);
    }
    const updatedUsers = users.map((user: any) =>
      user.email === currentUser.email ? currentUser : user,
    );
    setUsers(updatedUsers);
  };

  const getUserSearchHistory = (): string[] => {
    const currentUser = getCurrentUser();
    return currentUser.history;
  };

  const getUserFavorite = (): any => {
    const currentUser = getCurrentUser();
    return currentUser.favoriteIds;
  };

  const logIn = (currentUserEmail: string): void => {
    localStorage.setItem('currentUserEmail', currentUserEmail);
    setAuth(true);
  };

  const logOut = (): void => {
    localStorage.removeItem('currentUserEmail');
    setAuth(false);
  };

  return (
    <StorageContext.Provider
      value={{
        getUsers,
        setUsers,
        logIn,
        logOut,
        isAuthtoraized,
        getUserFavorite,
        addCardToFavorite,
        removeCardFromFavorite,
        getCurrentUserEmail,
        addSearchToHistory,
        getUserSearchHistory,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export default StorageProvider;
