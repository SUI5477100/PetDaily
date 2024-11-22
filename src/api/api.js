// src/api/axiosInstance.js

import axios from 'axios';
import { BASE_URL } from '../BASE_URL.js'; // 确保路径正确


const uniAdapter = function uniAdapter(config) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: config.baseURL ? `${config.baseURL}${config.url}` : config.url,
      method: config.method,
      data: config.data,
      header: config.headers,
      dataType: config.dataType || 'json',
      responseType: config.responseType || 'text',
      success: (response) => {
        const { statusCode, data, header } = response;
        resolve({
          data: data,
          status: statusCode,
          statusText: '', // Uni-app 不提供 statusText
          headers: header,
          config: config,
          request: null, // Uni-app 不提供 request 对象
        });
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
}


// 创建一个 axios 实例
const axiosInstance = axios.create({
  baseURL: BASE_URL, // 替换为你的实际 base URL
  timeout: 10000, // 请求超时时间（毫秒）
  headers: {
    'Content-Type': 'application/json',
    // 其他默认头部信息
  },
  adapter: uniAdapter, // 使用自定义适配器
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 在发送请求之前添加 token（如果需要）
    const token = uni.getStorageSync('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('请求错误拦截器', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    // 假设服务器返回的数据格式为 { code: 200, data: {...}, message: 'success' }
    const res = response.data;
    if (res.code !== 200) {
      uni.showToast({
        title: res.message || '请求失败',
        icon: 'none',
      });
      return Promise.reject(new Error(res.message || 'Error'));
    }
    return res.data; // 返回 data 部分
  },
  (error) => {
    console.error('响应错误拦截器', error);
    if (error.statusCode) {
      const { statusCode, data } = error;
      switch (statusCode) {
        case 401:
          uni.showToast({
            title: '未授权，请登录',
            icon: 'none',
          });
          // 跳转到登录页面
          uni.navigateTo({
            url: '/pages/login/login',
          });
          break;
        case 404:
          uni.showToast({
            title: '资源未找到',
            icon: 'none',
          });
          break;
        case 500:
          uni.showToast({
            title: '服务器错误',
            icon: 'none',
          });
          break;
        default:
          uni.showToast({
            title: data.message || '网络错误',
            icon: 'none',
          });
          break;
      }
    } else {
      uni.showToast({
        title: '网络错误',
        icon: 'none',
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
