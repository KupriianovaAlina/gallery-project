import { API_URL_ROOT } from './constants'

export const getApiResource = () => {
  return fetch(API_URL_ROOT)
    .then((res) => res.json())
}