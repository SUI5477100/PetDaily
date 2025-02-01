// utils/api.js

// 基础 URL
const BASE_URL = 'https://serverzhu.com:3000';

// 请求方法封装

// 请求拦截器：添加 token 到请求头
const request = (url, method = 'GET', data = {}) => {
	const token = uni.getStorageSync('token'); // 获取 token
	const headers = {
		'Authorization': `${token}`, // 使用 token
		'Content-Type': 'application/json',
	};

	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			method: method,
			header: headers,
			data: data,
			success: (res) => {
				if (res.statusCode === 200) {
					resolve(res.data); // 请求成功
				} else {
					reject(res.data); // 请求失败
				}
			},
			fail: (err) => {
				reject(err); // 请求失败
			},
		});
	});
};

// 登录接口
const login = (data) => {
	return request('/users/login', 'POST', data);
};
// 获取注册接口
const register = (data) => {
	return request(`/users/register`, 'POST', data);
};
// 微信登录接口
const wxLogin = (code) => {
	return request('/users/wxLogin', 'POST', {
		code
	});
};
// 获取用户信息接口
const getUserInfo = () => {
	return request(`/my/userInfo`, 'GET');
};
// 修改用户头像昵称接口
const updateUser = (date) => {
	return request('/my/update/userInfo', 'POST', date);
};
// 上传图片接口
const uploadImg = (date) => {
	return request('/upload', 'POST', date);
};
// 其他接口
// const getPets = (userId) => {
//   return request(`/user/${userId}/pets`, 'GET');
// };

// 将封装好的接口导出
export default {
	login,
	getUserInfo,
	wxLogin,
	register,
	uploadImg,
	updateUser
	// getPets
};
