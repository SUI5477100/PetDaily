<template>
	<view class="content">
		<view class="title">
			<view>hi 铲屎官</view>
			<view>欢迎来到宠日迹</view>
		</view>
		<!-- 宠物信息 -->
		<petInfo style="width: 90%;"></petInfo>
		<!-- 中间主体内容 -->
		<view class="main">
			<!-- 记事本-具体详情 -->
			<view class="detail-left">
				<view class="detail-left-y">
					<view class="detail-text">● 喂饭</view>
					<view class="detail-text">● 喂饭</view>
				</view>
				<img class="corner-image" src="https://www.serverzhu.com/petImg/clouds.png" alt="" />
			</view>
			<view class="detail-right">
				<!-- 记录 -->
				<view class="record">
					<view class="record-left">
						<view class="record-title">
							记录本
						</view>
						<view class="record-text">
							见证小宠的成长
						</view>
					</view>
					<img src="https://www.serverzhu.com/petImg/recordPet.png" style="width: 44%;" class="record-right" />
				</view>
				<!-- 提醒 -->
				<view class="record">
					<view class="record-left">
						<view class="record-title">
							提醒
						</view>
						<view class="record-text">
							更好的照顾小宠
						</view>
					</view>
					<img src="https://www.serverzhu.com/petImg/tips.png" style="width: 38%;" class="record-right" />
				</view>
			</view>
		</view>
		<!-- 今日科普 -->
		<view class="knowledge">
			<view class="knowledge-title">
				<img src="https://www.serverzhu.com/petImg/knowledge-title.png" class="knowledge-title-img" />
				<view class="knowledge-title-info">
					【长出蒜瓣毛】
				</view>
			</view>

			<view class="knowledge-detail">
				当你看到自己猫的毛发分层了，那是它的蒜瓣毛~猫咪有蒜瓣毛说明它营养充足，毛发密集，
				说明平时吃的很好很有营养，是被养的
				很好的表现哦～
			</view>
			<img src="https://www.serverzhu.com/petImg/sun.png"  class="knowledge-img-sun" />
			<img src="https://www.serverzhu.com/petImg/knowledge.png"  class="knowledge-img" />
		</view>

	</view>
</template>

<script>
	// 根据实际路径引入
	import petInfo from './components/petInfo.vue'
	// import api from "../../src/api/homeApi.js"
	export default {
		components: {
			petInfo
		},
		data() {
			return {
				// title: 'Hello',
				// petDetail: null
				showInfo: 1 //判断是否添加宠物了
			};
		},
		onLoad() {
			// this.fetchPetDetail();
		},
		methods: {
			// fetchPetDetail() {
			// 	api.getPetDetail()
			// 		.then(data => {
			// 			console.log(data, '000000000000');
			// 			this.petDetail = data; // 将获取到的数据赋值给 petDetail
			// 		})
			// 		.catch(err => {
			// 			console.error('请求失败', err);
			// 			uni.showToast({
			// 				title: '网络错误',
			// 				icon: 'none',
			// 			});
			// 		});
			// },
		}
	};
</script>

<style scoped lang="less">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-image: url('https://pet-daily-zm.oss-cn-beijing.aliyuncs.com/background.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		padding-top: 15%;
		width: 100%;
		height: 100vh;
		background-color: #000
	}

	.title {
		margin-left: 10%;
		width: 100%;
		margin-bottom: 40rpx;
	}

	.main {
		width: 90%;
		height: 30vh;
		display: flex;
		justify-content: space-between;
		margin-top: 40rpx;
	}

	.detail-left {
		width: 45%;
		height: 30vh;
		max-height: 30vh;
		border-radius: 40rpx;
		background-color: #fff;
		border: #000 4rpx solid;
		overflow-y: auto;
		position: relative;
		overflow: visible;
	}

	.detail-left-y {
		max-height: 30vh;
		overflow-y: auto;
	}

	.corner-image {
		position: absolute;
		right: -5%;
		bottom: -5%;
		width: 150rpx;
		height: 100rpx;
		z-index: 10;
	}


	.detail-text {
		margin: 20rpx;
	}

	.detail-right {
		width: 45%;
		height: 30vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.record {
		border-radius: 40rpx;
		width: 100%;
		height: 45%;
		border: #000 4rpx solid;
		background-color: #fff;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.record:active {
		background-color: #f4f4f4;
	}

	.record-left {
		width: 50%;
		height: 70%;
		margin-left: 4%;
		display: flex;
		flex-direction: column;
		justify-content: center;

	}

	.record-title {
		font-weight: 600;
		font-size: 34rpx;
	}

	.record-text {
		margin-top: 10rpx;
		font-size: 20rpx;
	}

	.record-right {
		height: 70%;
	}

	.knowledge {
		border-radius: 40rpx;
		width: 90%;
		height: 25vh;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		margin-top: 40rpx;
		border: #000 4rpx solid;
		background-color: #fff;
		position: relative;
	}

	.knowledge-title {
		display: flex;
		align-items: flex-end;
		width: 80%;
		height: 17%;
		margin: 20rpx;
	}

	.knowledge-title-img {
		width: 35%;
		height: 100%;
	}

	.knowledge-title-info {
		font-size: 28rpx;
		margin-left: 15rpx;
	}

	.knowledge-detail {
		margin-left: 20rpx;
		width: 56%;
		height: 60%;
		font-size: 28rpx;
	}

	.knowledge-img {
		position: absolute;
		right: -5%;
		bottom: -5%;
		width: 40%;
		height: 230rpx;
		z-index: 10;
	}
	.knowledge-img-sun{
		position: absolute;
		border-radius: 100rpx;
		right: -8%;
		top: 6%;
		/* bottom: 35%; */
		width: 150rpx;
		height: 150rpx;
		z-index: 10;
	}
</style>