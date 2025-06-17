// 基础 URL
const BASE_URL = 'https://serverzhu.com:3000';

// 请求封装
const request = (url, method = 'GET', data = {}) => {
	let token = uni.getStorageSync('token'); // 获取 token

	// 检查 token 是否存在且未过期
	if (token && isTokenExpired(token)) {
		uni.removeStorageSync('token'); // 清除过期的 token
		redirectToLogin();
		return Promise.reject({
			message: "Token 过期"
		});
	}

	const headers = {
		'Authorization': token ? `Bearer ${token}` : '', // 保留 Bearer 前缀，用于请求头
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
					resolve(res.data);
				} else if (res.statusCode === 401) {
					uni.removeStorageSync('token');
					redirectToLogin();
					reject({
						message: "Token 失效"
					});
				} else {
					reject(res.data);
				}
			},
			fail: (err) => {
				reject(err);
			},
		});
	});
};

// 自定义 atob 函数 (Polyfill)
function myAtob(input) {
	// 兼容 padding
	let str = input.replace(/=+$/, '');
	let output = '';

	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	for (
		let bc = 0, bs = 0, buffer, i = 0;
		(buffer = str.charAt(i++)); ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4) ?
		output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) :
		0
	) {
		buffer = chars.indexOf(buffer);
	}
	return output;
}

const isTokenExpired = (token) => {
	try {
		// JWT 必须是由三段组成，中间是 payload
		const parts = token.split('.');
		if (parts.length !== 3) throw new Error('非法的 Token 格式');

		const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
		// 使用自定义的myAtob来解码
		const decodeStr = myAtob(base64);

		const jsonPayload = JSON.parse(decodeStr);

		const {
			exp
		} = jsonPayload;
		return exp * 1000 < Date.now();
	} catch (e) {
		console.error('Token 解析失败:', e);
		return true;
	}
};


// Token 过期后跳转到登录页
const redirectToLogin = () => {
	uni.showToast({
		title: '登录已过期，请重新登录',
		icon: 'none'
	});
	setTimeout(() => {
		uni.reLaunch({
			url: '/pages/firstPage/firstPage'
		});
	}, 1000);
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
// 获取全部帖子
const getPost = (params) => {
	return request(`/post/getPosts`, 'GET', params)
}
// 获取自己的帖子
const getMyPost = (params) => {
	return request(`/post/myselfPosts`, 'GET', params)
}
// 点赞帖子
const addLike = (data) => {
	return request(`/post/likes`, 'POST', data)
}
// 查看帖子评论
const getComment = (post_id) => {
	return request(`/post/comments/${post_id}`, 'GET')
}
// 提交评论接口
const postComment = (data) => {
	return request(`/post/comments`, `POST`, data)
}
// 提交评论接口
const commentReplies = (data) => {
	return request(`/post/comment_replies`, `POST`, data)
}
// 删除自己的评论
const deleteComment = (comment_id) => {
	return request(`/post/deleteComment/${comment_id}`, 'DELETE')
}
// 删除自己的帖子
const deletePost = (post_id) => {
	return request(`/post/deletePost/${post_id}`, 'DELETE')
}
// 发送帖子
const sendPost = (data) => {
	return request('/post/addPosts', 'POST', data)
}
// 添加提醒接口
const addReminders = (data) => {
	return request(`/reminders/add`, `POST`, data)
}
// 获取微信提醒列表
const getReminders = (data) => {
	return request(`/reminders/list?selected_date=${data}`, 'GET')
}

// 联调智能体
const askChatGPT = (messages) => {
	// messages: [{ role, content }, …]
	return request('/chatgpt/ask', 'POST', {
		messages
	});
}

// 新增记账
const addLedger = (data) => {
	return request('/ledger/add', 'POST', data)
}

// 获取记账列表
const getLedgerList = (params) => {
	return request('/ledger/list', 'GET', params)
}

// 删除一条记账
const deleteLedger = (id) => {
	return request(`/ledger/del?id=${id}`, 'DELETE')
}

// 更新记账
const updateLedger = (data) => {
	return request('/ledger/update', 'PUT', data)
}
// 获取记账列表
const getSummaryList = (params) => {
	return request('/ledger/summary', 'GET', params)
}
// 获取记账列表
const getUcharts = (params) => {
	return request('/ledger/uCharts', 'GET', params)
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
	deleteRecord,
	getPost,
	addLike,
	getComment,
	postComment,
	commentReplies,
	deleteComment,
	deletePost,
	sendPost,
	addReminders,
	getReminders,
	askChatGPT,
	updateLedger,
	deleteLedger,
	getLedgerList,
	addLedger,
	getSummaryList,
	getUcharts,
	getMyPost
};