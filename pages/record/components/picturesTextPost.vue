<template>
	<view class="content">
		<img src="https://www.serverzhu.com/petImg/cat.png" alt="" class="img" />
		<view class="button-text w90">
			<view style="margin: 30rpx;font-size: 36rpx;font-weight: 600;">
				描述
			</view>
			<uni-easyinput type="textarea" v-model="value" placeholder="记录小宠的生活吧~"
				placeholderStyle="font-size: 32rpx"></uni-easyinput>
			<view class="button-text m10">
				<uni-file-picker :key="fileKey":image-styles="imageStyles"
					mode="grid"></uni-file-picker>
			</view>
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
				imageStyles: {
					border: {
						color: "#f1f1f1",
						width: 2,
						radius: '20rpx',

					},
				}

			}
		},
		methods: {
			
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

	.m10 {
		margin: 20rpx;
	}

	/deep/.is-input-border {
		width: 100%;
		// margin: 5%;
		border: #fff 2rpx solid !important;
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
		flex-direction: column;
		// justify-content: space-between;
		// align-items: center;
		border-radius: 40rpx;
		background-color: #fff
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