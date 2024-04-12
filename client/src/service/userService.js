import axios from 'axios';
import baseUrl from './apiConfig';

export const signin = ({ id, password }) => {
  return axios.post(`${baseUrl}/user`, { id, password });
};
