import axios from 'axios';
import baseUrl from './apiConfig';

export const fetchVideo = () => {
  return axios.get(`${baseUrl}/video`);
};
export const createVideo = ({ title, url, keyword }) => {
  return axios.post(`${baseUrl}/video`, { title, url, keyword });
};
export const updateVideo = ({ videoId, title, url, keyword }) => {
  return axios.put(`${baseUrl}/video/${ videoId }`, { title, url, keyword });
};
export const getVideo = ({ videoId }) => {
  return axios.get(`${baseUrl}/video/${ videoId }`);
};
export const deleteVideo = ({ videoId }) => {
  return axios.delete(`${baseUrl}/video/${ videoId }`);

};
