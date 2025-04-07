<template>
<view class="">
	<uni-nav-bar left-icon="left" title="发送帖子" @clickLeft="back" height="160rpx" />
	<view class="content">
		<img src="https://www.serverzhu.com/petImg/cat.png" class="img" />
	
		<view class="button-text w90">
			<view style="margin: 30rpx; font-size: 36rpx; font-weight: 600;">描述</view>
			<uni-easyinput type="textarea" v-model="description" placeholder="记录小宠的生活吧~"
				placeholderStyle="font-size: 32rpx" />
	
			<view class="button-text m10">
				<uni-file-picker v-model="fileLists" :image-styles="imageStyles" file-mediatype="image" mode="grid"
					@select="onFileSelect" />
			</view>
		</view>
	
		<view class="button-add" @click="sendPost">
			发送
		</view>
	</view>
</view>
</template>
<script>
	import api from '../../../utils/api.js'
	export default {
		data() {
			return {
				description: '',
				uploadedUrls: [],
				fileLists: [],
				imageStyles: {
					border: {
						color: "#f1f1f1",
						width: 2,
						radius: '20rpx'
					}
				}
			}
		},
		methods: {
			back() {
				uni.switchTab({
					url: '/pages/pet/pet'
				});
			},
			onFileSelect(e) {
				this.fileLists = [...this.fileLists, ...e.tempFiles]

			},
			async sendPost() {
				try {
					await this.upload()
					const response = await api.sendPost({
						content: this.description,
						post_pic: this.uploadedUrls
					})

					console.log(response, '发送帖子结果')
				} catch (err) {
					console.log(err)
				}
			},
			// 上传图片
			async upload() {
				if (!this.fileLists.length) {
					return uni.showToast({
						title: '请先选择图片',
						icon: 'none'
					})
				}

				// 重置
				this.uploadedUrls = []

				uni.showLoading({
					title: '上传中...'
				})

				try {
					for (let i = 0; i < this.fileLists.length; i++) {
						const file = this.fileLists[i]

						const res = await uni.uploadFile({
							url: 'https://serverzhu.com:3000/upload',
							filePath: file.path,
							name: 'file'
						})

						const result = JSON.parse(res.data)
						const urls = result.data.url // 后端返回的数组
						// 使用 this.uploadedUrls，而不是 uploadedUrls
						this.uploadedUrls.push(...urls)
					}

					console.log('所有上传成功的图片地址:', this.uploadedUrls)
					uni.hideLoading()
					uni.showToast({
						title: '上传成功',
						icon: 'success'
					})
				} catch (err) {
					uni.hideLoading()
					console.error('上传失败:', err)
					uni.showToast({
						title: '上传失败',
						icon: 'none'
					})
				}
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

	/deep/.uni-navbar__header-container-inner {
		align-items: flex-end !important;
		margin-bottom: 20rpx;
	}

	/deep/.uni-navbar__header-btns-left {
		align-items: flex-end !important;
		margin-bottom: 20rpx;
	}

	/deep/.uni-navbar--border {
		border-bottom-color: #ffe68e !important;
	}

	/deep/.uni-navbar__header {
		background-color: #ffe68e !important;
	}
	
</style>
