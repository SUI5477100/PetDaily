<template>
	<view class="content">
		<!-- https://www.serverzhu.com/petImg/wxLogin.png -->
		<!-- https://www.serverzhu.com/petImg/loginIcon.png -->
		<!-- <view class="input-container"> -->
		<!-- 	<view class="" style="width: 90%;">
				<u-subsection :list="listTitle" :current="current" activeColor="#f9a033" @change="sectionChange">
				</u-subsection>

				<view v-if="current === 0">
					<uni-easyinput v-model="emailValue" placeholder="请输入邮箱" @input="input"></uni-easyinput>
					<uni-easyinput v-model="passwordValue" placeholder="请输入密码" @input="inputPassword"></uni-easyinput>
					<view class="record-book" @click="loginBtn('登陆')">
						确认
					</view>
				</view>
				<view v-if="current === 1">
					<uni-easyinput v-model="usernameValue" placeholder="请输入用户名" @input="inputUserName"></uni-easyinput>
					<uni-easyinput v-model="emailValue" placeholder="请输入邮箱" @input="input"></uni-easyinput>
					<uni-easyinput v-model="passwordValue" placeholder="请输入密码" @input="inputPassword"></uni-easyinput>
					<view class="record-book" @click="loginBtn('注册')">
						确认
					</view>
				</view>
			</view> -->

		<!-- 这里是微信登录按钮，current === 0 时显示 -->
		<view class="weixin" v-if="current === 0" style="" @click="handleWxLogin">
			<u-icon size="36" name="weixin-fill" color="#fff"></u-icon>
			<view class="" style="color: #fff;">
				一键微信登陆
			</view>
			<!-- <view class="vx-login"></view> -->
		</view>

		<u-toast ref="uToast"></u-toast>

		<!-- </view> -->

	</view>
	</view>
</template>

<script>
	import api from '../../utils/api.js';
	export default {
		data() {
			return {
				emailValue: '',
				passwordValue: '',
				usernameValue: '',
				listTitle: [{
					name: '登陆'
				}, {
					name: '注册'
				}],
				list: [{
					type: "error",
					icon: false,
					title: "失败主题",
					message: "",
				}],
				current: 0 // 控制显示当前选项，0 是登陆，1 是注册
			};
		},

		methods: {
			input(e) {
				console.log('输入内容：', e);
			},
			inputPassword(e) {
				console.log('输入内容：', e);
			},
			inputUserName(e) {
				console.log('输入内容：', e);
			},
			sectionChange(index) {
				this.current = index;
				console.log(this.current, '0000')
			},
			loginBtn(text) {
				console.log(text);
				if (text === '登陆') {
					this.handleLogin();
				} else {
					this.handleRegister()
				}
			},

			// 邮箱密码登陆
			async handleLogin() {
				try {
					const response = await api.login({
						email: this.emailValue,
						password: this.passwordValue
					});
					const token = response.token;
					// 存储 token 到本地存储
					uni.setStorageSync('token', token);
					this.goRegirect()
				} catch (error) {
					console.log('登录失败:', error);
					this.list[0].message = error.message
					this.showToast(this.list[0])
				}
			},
			// 注册
			async handleRegister() {
				try {
					const response = await api.register({
						username: this.usernameValue,
						email: this.emailValue,
						password: this.passwordValue
					});
					console.log('注册成功');
					this.handleLogin()
				} catch (error) {
					console.log('注册失败:', error);
					this.list[0].message = error.message
					this.showToast(this.list[0])
				}
			},
			// 调用微信登录
			handleWxLogin() {
				uni.login({
					provider: 'weixin', // 微信登录
					success: async (res) => {
						if (res.code) {
							console.log('获取到微信登录 code:', res.code);
							try {
								const response = await api.wxLogin({
									code: res.code
								});
								console.log(response, '0000')
								const token = response.token
								const openid = response.openid
								if (token) {
									uni.setStorageSync('token', token);
									uni.setStorageSync('openID', openid);
									console.log('登录成功，Token:', token, openid);
									// this.getUserInfo()
									this.goRegirect()
								} else {
									console.error('登录失败:', data.message);
									this.list[0].message = "登陆失败"
									this.showToast(this.list[0])
								}
							} catch (error) {
								console.error('微信登录失败:', error);
								this.list[0].message = "微信登陆失败"
								this.showToast(this.list[0])

							}
						} else {
							console.error('微信登录失败:', res.errMsg);
							this.list[0].message = "微信登陆失败"
							this.showToast(this.list[0])
						}
					},
					fail: (err) => {
						console.error('调用 wx.login 失败:', err);
					},
				});
			},
			// 获取个人信息
			// async getUserInfo() {
			// 	try {
			// 		const response = await api.getUserInfo();
			// 		console.log('登录成功:', response);
			// 		// 登录成功后的逻辑
			// 	} catch (error) {
			// 		console.log('登录失败:', error);
			// 		// 登录失败后的逻辑
			// 	}
			// },
			//goregirect()为点击响应事件，可在HTML部分设置 @tap="goregirect()"
			goRegirect() {
				uni.switchTab({
					//关闭当前页面，跳转到应用内的某个页面。
					url: '../master/master'
				});
			},
			// 错误提示弹框
			showToast(params) {
				this.$refs.uToast.show({
					...params,
				});
			},
		}
	};
</script>

<style scoped lang="less">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		/* 横向居中 */
		justify-content: center;
		/* 纵向居中 */
		background-image: url('https://pet-daily-zm.oss-cn-beijing.aliyuncs.com/background.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-color: #fffce0;
		width: 100%;
		height: 100vh;
	}

	.input-container {
		width: 80%;
		height: 40vh;
		display: flex;
		// justify-content: space-around;
		flex-direction: column;
		align-items: center;
		// background-color: #fff;
		/* 控制输入框的宽度 */
		max-width: 400px;
		position: relative;
		/* 限制最大宽度 */
	}

	/deep/.u-subsection {
		background-color: transparent !important;
		// margin-bottom: 60rpx;
	}

	/deep/.u-subsection__bar {
		background-color: transparent !important;
	}

	/deep/.u-subsection__item {
		border-color: transparent !important;
	}

	/deep/.u-subsection__item__text {
		font-size: 36rpx !important;
	}

	/deep/.is-input-border {
		border-radius: 30rpx;
	}

	/deep/.uni-easyinput {
		margin-top: 60rpx;
	}

	.vx-login {
		width: 80rpx;
		height: 80rpx;
		background-image: url('https://www.serverzhu.com/petImg/wxLogin.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	.vx-login:active {
		background-image: url('https://www.serverzhu.com/petImg/wxLogin2.png');
	}

	.record-book {
		width: 100%;
		height: 80rpx;
		margin-top: 60rpx;
		border: #000 4rpx solid;
		background-color: #ffd553;
		border-radius: 100rpx;
		display: flex;
		justify-content: center;
		font-weight: 600;
		font-size: 34rpx;
		align-items: center;
	}

	.record-book:active {
		background-color: #eac34c;
	}

	.weixin {
		width: 65%;
		height: 100rpx;
		border-radius: 100rpx;
		background-color: #1ec700;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}

	.weixin:active {
		background-color: #1eb600;
	}
</style>
