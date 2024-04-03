export const navigationRoutes = {
  main: () => '/',
  card: (id = 'id') => `/card/:${id}`,
  login: () => '/login',
  signup: () => '/signup',
  favorites: () => '/favorites',
  history: () => '/history',
};
