import axios from 'axios';
import baseUrl from './apiConfig';


export const getUsers = () => {
  return axios.get(`${baseUrl}/api/users`);
};

export const createUser = (user) => {
  return axios.post(`${baseUrl}/api/users`, user);
};
