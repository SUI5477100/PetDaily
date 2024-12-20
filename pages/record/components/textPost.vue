<template>
	<!--记录页面 -->
	<view class="content">
		<img src="../../../static/cat.png" alt="" class="img" />
		<uni-easyinput type="textarea" v-model="value" placeholder="请输入内容" class="input"
			placeholderStyle="font-size: 32rpx"></uni-easyinput>
		<div class="button-text" @click="toggle('bottom')">
			<div style="margin-left: 20rpx;">类型</div>
			<div class="center">
				<div style="margin-right: 20rpx;">
					{{record}}
				</div>
				>
			</div>
		</div>
		<div class="button-text">
			<div style="margin-left: 20rpx;">时间</div>
			<div style="margin-right: 20rpx;">></div>
		</div>
		<div class="button-text">
			<div style="margin-left: 20rpx;">提醒</div>
			<div style="margin-right: 20rpx;">></div>
		</div>
		<div class="button-add">
			保存
		</div>
		<!-- 普通弹窗 -->
		<uni-popup ref="popup" background-color="#fff" @change="change" :show="show">
			<view class="popup-content">
				<img src="https://pet-daily-zm.oss-cn-beijing.aliyuncs.com/dailyLife.png" alt="" class="img2" />
				<uni-section title="类型" type="line"></uni-section>
				<uni-list>
					<uni-list-item title="日常提醒" clickable @click="onClick('日常提醒')" />
					<uni-list-item title="洗护提醒" clickable @click="onClick('洗护提醒')" />
					<uni-list-item title="清洁提醒" clickable @click="onClick('清洁提醒')" />
					<uni-list-item title="用药提醒" clickable @click="onClick('用药提醒')" />
				</uni-list>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				record: ''
			}
		},
		methods: {

			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			onClick(e) {
				console.log('执行click事件', e)
				this.record = e
				console.log(this.record)
				uni.showToast({
					title: '保存成功',
				});
				this.$refs.popup.close()
			},
		}
	}
</script>

<style scoped lang="less">
	.content {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-image: url('https://pet-daily-zm.oss-cn-beijing.aliyuncs.com/background.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-color: #fffce0;
		padding-top: 5%;
		// padding: 5%;
		width: 100%;
		height: 100vh;
	}

	.img {
		position: absolute;
		height: 40vh;
		bottom: 20%;
		left: -20%;
	}

	.img2 {
		position: absolute;
		height: 40vh;
		// bottom: 20%;
		right: -20%;
		z-index: 10000;
	}

	/deep/.is-input-border {
		width: 90%;
		margin: 5%;
		border: #000 4rpx solid !important;
		height: 20vh;
		border-radius: 20rpx;
	}

	/deep/ .uni-easyinput__content-textarea {
		height: 17vh;
	}

	/deep/ .uni-easyinput {
		flex: 0;
	}

	.button-text {
		border-radius: 20rpx;
		background-color: #fff;
		display: flex;
		margin-bottom: 30rpx;
		justify-content: space-between;
		align-items: center;
		// padding: 5%;
		// margin: 5%;
		width: 90%;
		border: #000 4rpx solid;
		height: 8vh;

	}

	.button-text:active {
		background-color: #f1f1f1;
	}

	.button-add {
		border-radius: 50rpx;
		background-color: #fff;
		display: flex;
		margin-bottom: 30rpx;
		justify-content: center;
		align-items: center;
		background-color: #ffeb3b;
		width: 80%;
		border: #000 4rpx solid;
		height: 6vh;
		z-index: 10;
	}

	/deep/ .popup-content {
		position: relative;
		padding-top: 40rpx;
		height: 35vh;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}



	.center {
		margin-right: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>