<template>
	<view class="">
		<!-- 导航栏 -->
		<uni-nav-bar left-icon="left" title="编辑信息" @clickLeft="back" height="160rpx" />
		<!-- 消息弹框 -->
		<u-toast ref="uToast"></u-toast>

		<view class="container">
			<!-- 头像选择按钮 -->
			<button type="default" open-type="chooseAvatar" @chooseavatar="onChooseavatar">
				<image :src="newAvatar ? newAvatar : userInfo.user_pic" class="avatar"></image>
			</button>

			<!-- 昵称输入框 -->
			<view class="input-container">
				<input type="nickname" name="nickname" :value="userInfo.username" placeholder="请输入昵称"
					@blur='updateInput' />
			</view>

			<!-- 保存按钮 -->
			<view @click="saveInfo" class="record-book">保存信息</view>
		</view>
	</view>
</template>

<script>
	import api from '../../utils/api.js';
	export default {
		data() {
			return {
				userInfo: {
					user_pic: '', // 默认头像
					username: '' // 默认昵称
				},
				newAvatar: '', // 新选择的头像临时路径
				show: false,
				list: [{
						type: "error",
						message: "上传失败",
					},
					{
						type: "success",
						message: "上传成功",
					},
					{
						type: "success",
						message: "修改成功",
					},
					{
						type: "error",
						message: "修改失败",
					},
				],
			};
		},
		methods: {
			// 获取用户选择的头像
			onChooseavatar(e) {
				console.log('选择的头像信息：', e.detail);
				const avatarUrl = e.detail.avatarUrl; // 获取头像临时路径
				console.log(avatarUrl,'999')
				this.uploadAvatar(avatarUrl); // 上传头像到服务器
			},

			// 上传头像到服务器
			uploadAvatar(avatarUrl) {
				wx.uploadFile({
					filePath: avatarUrl,
					name: 'file',
					url: 'https://serverzhu.com:3000/upload', // 替换为你的服务器地址
					success: (res) => {
						console.log(res);
						const resObj = JSON.parse(res.data); // 确保返回的数据是正确的 JSON 格式
						console.log('头像上传成功，永久地址:', resObj.data.url);
						this.userInfo.user_pic = resObj.data.url[0]
						this.newAvatar = resObj.data.url; // 将永久地址保存到 newAvatar
						this.showToast(this.list[1])
					},
					fail: (err) => {
						console.log('头像上传失败:', err);
						this.showToast(this.list[0])
					}
				});
			},
			// 获取昵称
			updateInput(e) {
				console.log(e.target.value)
				this.userInfo.username = e.target.value
			},
			// 错误/正确信息提醒
			showToast(params) {
				this.$refs.uToast.show({
					...params,
				});
			},
			// 返回铲屎官页面
			back() {
				uni.switchTab({
					url: '/pages/master/master'
				});
			},
			// 保存用户信息
			async saveInfo() {
				console.log('保存的用户信息：', this.userInfo);
				try {
					const response = await api.updateUser(this.userInfo)
					console.log(response.message)
					this.showToast(this.list[2])
				} catch(err) {
					console.log('登录失败:', err);
					this.showToast(this.list[3])
				}
			},
			// 获取已有的头像和昵称
			async getUserInfo() {
				try {
					const response = await api.getUserInfo()
					this.userInfo.username = response.data.username
					this.userInfo.user_pic = response.data.user_pic
					console.log(response)
				} catch (err) {
					console.log(err)
				}
			}
		},
		onReady() {
			this.getUserInfo()
		}
	};
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		/* 横向居中 */
		/* justify-content: center; */
		/* 纵向居中 */
		background-image: url('https://pet-daily-zm.oss-cn-beijing.aliyuncs.com/background.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-color: #fffce0;
		width: 100%;
		height: 100vh;
	}

	.avatar {
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
	}

	.input-container {
		margin-top: 80rpx;
	}

	input {
		width: 90%;
		padding: 20rpx;
		border-radius: 10rpx;
		border: 4rpx solid #000;
		background-color: #fff;
	}

	button {
		margin-top: 10vh;
		/* background-color: #007aff; */
		color: white;
		/* padding: 10px 20px; */
		border-radius: 10rpx;
		width: 160rpx;
		height: 160rpx;
		border: 4rpx solid #000;
		display: flex;
		flex-direction: column;
		align-items: center;
		/* 横向居中 */
		justify-content: center;
		border-radius: 50%;
		padding: 0rpx;
	}

	.record-book {
		width: 60%;
		height: 80rpx;
		margin-top: 80rpx;
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

	/deep/.uni-navbar__header-container-inner {
		align-items: flex-end !important;
		margin-bottom: 20rpx;
	}

	/deep/.uni-navbar__header-btns-left {
		align-items: flex-end !important;
		margin-bottom: 20rpx;
	}

	/deep/.uni-navbar--border {
		border-bottom-color: #ffe68c !important;
	}

	/deep/.uni-navbar__header {
		background-color: #ffe68c !important;
	}
</style>
