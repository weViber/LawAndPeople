import axios from 'axios';
import baseUrl from './apiConfig';

export const fetchGuide = ({postId}) => {
    return axios.get(`${baseUrl}/guide`)
};
export const createGuide = ({ category, title, content }) => {
    return axios.post(`${baseUrl}/guide`, {
        category : category,
        title : title,
        content : content
    })
};

export const updateGuide = ({postId, category, title, content}) => {
    return axios.put(`${baseUrl}/guide/${postId}`, {
        category : category,
        title : title,
        content : content
    })
};
export const getGuide = ({postId}) => {
    return axios.get(`${baseUrl}/guide/${postId}`)
};

export const deleteGuide = ({postId}) => {
    return axios.get(`${baseUrl}/guide/${postId}`)
};