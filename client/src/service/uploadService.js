import axios from 'axios';
import baseUrl from './apiConfig';

export const uploadImg = ({ formData }) => {
  return axios.post(`${baseUrl}/uploads`, formData);
};