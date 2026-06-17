import axios from 'axios';
import store from '../redux/store';

// 로그인 시 redux 에 저장된 관리자 토큰을 모든 요청 헤더에 자동으로 첨부한다.
// 서버(cases/guide/video/counsel)의 관리자 권한 검증(isAdminRequest)이 이 헤더를 읽는다.
axios.interceptors.request.use((config) => {
  try {
    const token = store.getState()?.user?.value?.token;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // store 미초기화 등은 무시 (비관리자 요청은 토큰 없이 진행)
  }
  return config;
});
