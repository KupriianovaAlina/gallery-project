export const navigationRoutes = {
  main: () => '/',
  card: (id?: string) => `/card/${id ?? ':id'}`,
  signin: () => '/signin',
  signup: () => '/signup',
  favorites: () => '/favorites',
  history: () => '/history',
};
