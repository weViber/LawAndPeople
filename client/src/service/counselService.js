import axios from 'axios';
import baseUrl from './apiConfig';

export const fetchCounsel = () => {
  return axios.get(`${baseUrl}/counsel`);
};

export const createCounsel = ({
            category,
            title,
            name,
            phone,
            password,
            content,
        }) => {     
    return axios.post(`${baseUrl}/counsel`, {
            category,
            title,
            name,
            phone,
            password,
            content,
    });
  };
  
export const readCounsel = ({ postId }) => {
  return axios.get(`${baseUrl}/counsel/${ postId }`);
};
export const updateCounsel = ({ 
        postId,
        category,
        title,
        name,
        phone,
        password,
        content,
 }) => {
  return axios.put(`${baseUrl}/counsel/${ postId }`, {
        category,
        title,
        name,
        phone,
        password,
        content,
  });
};
export const deleteCounsel = ({ postId }) => {
  return axios.delete(`${baseUrl}/counsel/${ postId }`);
};
