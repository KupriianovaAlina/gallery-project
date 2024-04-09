import { createContext, useState } from 'react';

export const StorageContext = createContext({});

const StorageProvider = ({ children }) => {
  const getUsers = () => JSON.parse(localStorage.getItem('users'));

  const setUsers = users =>
    localStorage.setItem('users', JSON.stringify(users));

  const getCurrentUserEmail = () => localStorage.getItem('currentUserEmail');

  const getCurrentUser = () => {
    const currentUserEmail = getCurrentUserEmail();
    const [currentUser] = JSON.parse(localStorage.getItem('users')).filter(
      user => user.email === currentUserEmail,
    );
    return currentUser;
  };

  const [isAuthtoraized, setAuth] = useState(Boolean(getCurrentUserEmail()));

  const addCardToFavorite = id => {
    const users = getUsers();
    const currentUser = getCurrentUser();
    currentUser.favoriteIds.push(id);
    const updatedUsers = users.map(user =>
      user.email === currentUser.email ? currentUser : user,
    );
    setUsers(updatedUsers);
  };

  const removeCardFromFavorite = id => {
    const users = getUsers();
    const currentUser = getCurrentUser();
    const updatedFavoriteIds = currentUser.favoriteIds.filter(
      favoriteId => favoriteId !== id,
    );
    currentUser.favoriteIds = updatedFavoriteIds;
    const updatedUsers = users.map(user =>
      user.email === currentUser.email ? currentUser : user,
    );
    setUsers(updatedUsers);
  };

  const addSearchToHistory = url => {
    const users = getUsers();
    const currentUser = getCurrentUser();
    currentUser.history.filter(el => el === url).length === 0 &&
      currentUser.history.push(url);
    const updatedUsers = users.map(user =>
      user.email === currentUser.email ? currentUser : user,
    );
    setUsers(updatedUsers);
  };

  const getUserSearchHistory = () => {
    const currentUser = getCurrentUser();
    return currentUser.history;
  };

  const getUserFavorite = () => {
    const currentUser = getCurrentUser();
    return currentUser.favoriteIds;
  };

  const logIn = curentUserEmail => {
    localStorage.setItem('currentUserEmail', curentUserEmail);
    setAuth(true);
  };

  const logOut = () => {
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
