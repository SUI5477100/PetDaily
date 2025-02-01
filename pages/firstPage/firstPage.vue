<template>
	<view class="content">
		<!-- 倒计时按钮 -->
		<button class="countdown-btn" @click="skip">
			{{ countdown > 0 ? `跳过 (${countdown}s)` : "进入应用" }}
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				countdown: 5, // 5秒倒计时
				timer: null
			};
		},
		created() {
			this.startCountdown(); // 开始倒计时
		},
		methods: {
			// **检查本地存储是否有 token**
			checkToken() {
				const token = uni.getStorageSync('token'); // 获取 token
				if (token) {
					console.log('检测到本地 Token:', token);
					this.goToMaster(); // 有 token 直接跳转到主页面
				}
			},

			// **开始倒计时**
			startCountdown() {
				this.timer = setInterval(() => {
					if (this.countdown > 0) {
						this.countdown--;
					} else {
						this.skip(); 
						this.checkToken(); // 页面加载时检查 token
					}
				}, 1000);
			},

			// **跳转到主界面**
			goToMaster() {
				clearInterval(this.timer); // 清除定时器
				uni.switchTab({
					url: '/pages/master/master'
				});
			},

			// **跳转到登录页面**
			goToLoginPage() {
				clearInterval(this.timer); // 清除定时器
				uni.redirectTo({
					url: '/pages/loginPage/loginPage'
				});
			},

			// **点击跳过，或者倒计时结束后自动跳转**
			skip() {
				const token = uni.getStorageSync('token');
				if (token) {
					this.goToMaster();
				} else {
					this.goToLoginPage();
				}
			}
		}
	};
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-image: url('https://pet-daily-zm.oss-cn-beijing.aliyuncs.com/firstPage.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-color: #fffce0;
		width: 100%;
		height: 100vh;
		position: relative;
	}

	/* 让按钮固定在左上角 */
	.countdown-btn {
		position: absolute;
		top: 60rpx;
		left: 20px;
		width: 100px;
		z-index: 1000;
		height: 40px;
		font-size: 14px;
		background-color: rgba(0, 0, 0, 0.6);
		color: white;
		border-radius: 20px;
		text-align: center;
		line-height: 40px;
		border: none;
	}
</style>
