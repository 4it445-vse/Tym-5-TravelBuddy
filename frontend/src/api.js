import axios, { CancelToken } from 'axios';

const api = axios.create({
  baseURL: '/api/',
});

export function getCancelTokenSource() {
  return CancelToken.source();
}

export default api;
