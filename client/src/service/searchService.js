import axios from 'axios';
import baseUrl from './apiConfig';

export const searchData = ({ keyword }) => {
    return axios.post(`${baseUrl}/search`, { keyword })
};