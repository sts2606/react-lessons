import * as axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '14ec49fd-fc4a-4b97-b635-fb9ce0fe9f8c',
  },
});

export const usersAPI = {
  getUsers(currentPage, pageSize) {
    return axiosInstance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((res) => res.data);
  },

  follow(userId) {
    return axiosInstance.post(`follow/${userId}`);
  },

  unfollow(userId) {
    return axiosInstance.delete(`follow/${userId}`);
  },

  getProfile(userId) {
    return axiosInstance.get(`profile/${userId}`);
  },
};

export const authAPI = {
  me() {
    return axiosInstance.get(`auth/me`);
  },

  login(email, password, rememberMe = false) {
    return axiosInstance.post(`auth/login`, { email, password, rememberMe });
  },

  logout() {
    return axiosInstance.delete('auth/login');
  },
};

export const profileAPI = {
  getProfile(userId) {
    return axiosInstance.get(`profile/${userId}`);
  },

  getStatus(userId) {
    return axiosInstance.get(`profile/status/${userId}`);
  },

  updateStatus(status) {
    return axiosInstance.put(`profile/status`, { status: status });
  },
};
