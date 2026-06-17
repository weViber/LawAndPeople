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

// 비밀번호 확인(서버 검증). 관리자는 token 으로 통과.
export const verifyCounsel = ({ postId, password, token }) => {
  return axios.post(`${baseUrl}/counsel/${ postId }/verify`, { password, token });
};

export const updateCounsel = ({
        postId,
        category,
        title,
        name,
        phone,
        content,
        password,
        token,
 }) => {
  return axios.put(`${baseUrl}/counsel/${ postId }`, {
        category,
        title,
        name,
        phone,
        content,
        password,
        token,
  });
};

export const deleteCounsel = ({ postId, password, token }) => {
  // DELETE 요청 본문으로 비밀번호/토큰 전달
  return axios.delete(`${baseUrl}/counsel/${ postId }`, { data: { password, token } });
};
