<template>
	<view class="content">
		<img src="../../../static/cat.png" alt="" class="img" />
		<uni-easyinput type="textarea" v-model="value" placeholder="请输入内容" class="input"
			placeholderStyle="font-size: 32rpx"></uni-easyinput>
		<view class="button-text w90">
			<uni-file-picker :key="fileKey" ref="imageContainer" :image-styles="imageStyles"
				mode="grid"></uni-file-picker>
		</view>
		<view class="button-add">
			保存
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileKey: 0,
				// imageStyles: {
				// 	border: {
				// 		color: "#000",
				// 		width: 2,
				// 		radius: '20rpx',

				// 	},
				// }

			}
		},
		methods: {
			removeImage() {
			 // 获取需要重绘的元素
			    const element = this.$refs.imageContainer;
			    
			    // 强制触发浏览器的重绘
			    element.style.display = 'none';
			    element.offsetHeight; // 读取属性强制重绘
			    element.style.display = ''; // 恢复显示
			}
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
		width: 100%;
		height: 100vh;
	}

	.img {
		position: absolute;
		height: 40vh;
		bottom: 20%;
		pointer-events: none;
		left: -20%;
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
		display: flex;
		justify-content: space-between;
		align-items: center;

	}

	.w90 {
		width: 90%;
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
		margin-top: 50rpx;
	}

	.button-add:active {
		background-color: #f5df36;
	}
</style>