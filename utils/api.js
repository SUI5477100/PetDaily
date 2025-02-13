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
	return request(`/users/login`, 'POST', data);
};
// 获取注册接口
const register = (data) => {
	return request(`/users/register`, 'POST', data);
};
// 微信登录接口
const wxLogin = (data) => {
	return request(`/users/wxLogin`, 'POST', data);
};
// 获取用户信息接口
const getUserInfo = () => {
	return request(`/my/userInfo`, 'GET');
};
// 修改用户头像昵称接口
const updateUser = (data) => {
	return request(`/my/update/userInfo`, 'POST', data);
};
// 上传图片接口
const uploadImg = (data) => {
	return request(`/upload`, 'POST', data);
};
// 添加宠物信息
const addPet = (data) => {
	return request(`/petInfo/addPet`, 'POST', data)
}
// 获取宠物信息
const getPet = (id = null) => {
	// 如果 id 存在，拼接 id；否则请求所有宠物信息
	const url = id ? `/petInfo/getPet/${id}` : `/petInfo/getPet`;
	return request(url, 'GET');
};

// 修改宠物信息
const updatePet = (id, data) => {
	return request(`/petInfo/updatePet/${id}`, 'PUT', data)
}
// 删除宠物信息
const deletePet = (data) => {
	return request(`/petInfo/deletePet`, 'DELETE', data)
}
// 添加记录
const addRecord = (data) => {
	return request('/record/addRecord', 'POST', data)
}
// 获取记录
const getRecord = (params) => {
	return request('/record/getRecord', 'GET', params)
}
// 删除记录
const deleteRecord = (id) => {
	return request(`/record/deleteRecord/${id}`, 'DELETE')
}
// 将封装好的接口导出
export default {
	login,
	getUserInfo,
	wxLogin,
	register,
	uploadImg,
	updateUser,
	addPet,
	getPet,
	deletePet,
	updatePet,
	addRecord,
	getRecord,
	deleteRecord
};
