import axios from 'axios';
import baseUrl from './apiConfig';

export const fetchBoard = ({ value }) => {
  return axios.get(`${baseUrl}/${ value }`);
};
export const readBoard = ({ value, postId }) => {
  return axios.get(`${baseUrl}/${ value }/${ postId }`);
};
export const deleteBoard = ({ value, postId }) => {
  return axios.delete(`${baseUrl}/${ value }/${ postId }`);
};
