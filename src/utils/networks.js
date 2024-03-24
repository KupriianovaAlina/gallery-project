const URL_ROOT = 'https://rickandmortyapi.com/api/character';

export const getApiResource = () => {
  return fetch(URL_ROOT)
    .then((res) => res.json())
}