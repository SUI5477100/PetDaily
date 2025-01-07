<template>
	<view class="border-box">
		<view class="select-box" @click="toggle('bottom')">
			<view class="select-title">
				记录宠物
			</view>
			<view class="m40">
				<view class="m30">
					
				</view>
				<view> > </view>
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
	.border-box {
		background-color: #fff;
		height: 15vh;
		border-radius: 30rpx;
		border: 4rpx solid #000;
	}
	
	.select-box {
		flex: 1;
		height: 50%;
		border-radius: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.select-title {
		margin: 40rpx;
		font-size: 36rpx;
		font-weight: 600;
	}

	.m40 {
		display: flex;
		margin: 40rpx;
	}
	
	.m30 {
		margin: 0 30rpx;
	}
	
</style>