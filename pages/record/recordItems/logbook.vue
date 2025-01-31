<template>
	<view class="content">
		<view class="log">
			<view class="" style="display: flex;">
				<!-- 标签 -->
				<view class="tips">
					饮食
				</view>
				<!-- 时间 -->
				<view class="time">
					2025.12.32 16:09
				</view>
			</view>
			<view class="log-content">
				<view class="log-text">
					个人消费者购买单件销售价格不超过6000元的手机、平板、智能手表（手环）3类数码产品可享受购新补贴，每人每类可补贴1件，每件补贴比例为减去生产、流通环节及移动运营商所有优惠后最终销售价格的15%，每件最高不超过500元。
					<view class="" style="display: flex; flex-wrap: wrap; justify-content: space-evenly;">
						<img v-for="(item,index) in 9" :key="index" src="https://www.serverzhu.com/man.png" alt=""
							style="width: 180rpx;margin-bottom: 20rpx;height: 180rpx;background-color: #ddd;border-radius: 8rpx;margin-top: 20rpx;">
					</view>
				</view>

			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-image: url('https://pet-daily-zm.oss-cn-beijing.aliyuncs.com/background.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-color: #fffce0;
		width: 100%;
		height: 100vh;
	}

	.log {
		width: 90%;
		// height: 300rpx;
		background-color: #fefefe;
		// border: 4rpx solid #99621b;
		border-radius: 40rpx;

	}

	.tips {
		width: 120rpx;
		height: 60rpx;
		border-radius: 40rpx;
		border-bottom-left-radius: 0rpx;
		// border-bottom-right-radius: 0rpx;
		border-top-right-radius: 0rpx;
		background-color: #fdd666;
		border: 4rpx solid #99621b;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 600;
		color: #754712;
	}

	.time {
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 600;
		color: #754712;
		// font-size: 18px;
		margin-left: 40rpx;
	}

	.log-content {
		width: 100%;
		// height: 200rpx;
		// background-color: #f1f1f1
		display: flex;

		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.log-text {
		width: 85%;
		// margin-top: 20rpx;
		border-radius: 40rpx;
		padding: 10rpx 20rpx;
		margin: 20rpx 0rpx;
		// height: 200rpx;
		background-color: #f8f9f4;
	}
</style>
