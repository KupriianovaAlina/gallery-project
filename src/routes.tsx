export const navigationRoutes = {
  main: () => '/',
  card: (id = 'id') => `/card/:${id}`,
  signin: () => '/signin',
  signup: () => '/signup',
  favorites: () => '/favorites',
  history: () => '/history',
};
