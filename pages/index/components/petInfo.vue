<template>
	<view class="content">
		<!-- 宠物信息 -->
		<view v-if="showInfo" class="introduce">
			<view class="icon"></view>
			<view class="introduce-info">
				<!-- 头像等信息 -->
				<view class="pet-img"></view>
				<view class="pet-info">
					<view class="edit">
						编辑
					</view>
					<view class="pet-detail">
						<!-- 名字 -->
						<view class="detail-name">
							<view class="name">
								宠物名
							</view>
							<view class="sex">
								女
							</view>
						</view>
						<!-- 年龄 -->
						<view class="detail-age">
							<view class="age">
								6个月
							</view>
							<view class="weight">
								| 5kg
							</view>
						</view>
						<!-- 性格 -->
						<view class="detail-character">
							<view class="character">
								活泼
							</view>
							<view class="character">
								活泼
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 没添加宠物信息 -->
		<view v-else class="introduce"></view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				showInfo: 1 //判断是否添加宠物了
			};
		},
		onLoad() {},
		methods: {

		}
	};
</script>

<style less scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		/* height: 100vh; */
	}



	.introduce {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  width: 100%;
	  height: 20vh;
	  background-color: #fff;
	  border-radius: 15px;
	  border: #000 4rpx solid;
	  box-shadow: 5rpx 8rpx 15rpx -5rpx #ffeb3b;  
	}



	.icon {
		margin-top: 10rpx;
		width: 15%;
		height: 20rpx;
		border-radius: 15px;
		background-color: #fff4c1;
		border: 4rpx solid #000;
	}

	.introduce-info {
		height: 250rpx;
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: flex-end;
	}

	.pet-img {
		border: 4rpx solid #000;
		width: 200rpx;
		height: 200rpx;
		transform: rotate(-10deg);
		border-radius: 10px;
		margin-bottom: 15rpx;
	}

	.pet-info {
		width: 350rpx;
		height: 250rpx;
		display: flex;
		flex-direction: column;

	}

	.edit {
		margin-left: auto;
		width: 100rpx;
		height: 50rpx;
		border-radius: 25rpx;
		background-color: #000;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.pet-detail {
		height: 70%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;

	}

	.detail-name {
		display: flex;
	}

	.sex {
		margin-left: 40rpx;
	}

	.detail-age {
		display: flex;
	}

	.age {
		margin-right: 15rpx;
	}

	.detail-character {
		display: flex;
	}

	.character {
		margin-right: 15rpx;
		font-size: 24rpx;
		background-color: #ffe68c;
		width: 84rpx;
		height: 44rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 25rpx;
	}
</style>