<template>
	<view class="content" :class="{ active: active }" @click="handleClick">
		<slot></slot>
		<view class="circle">
			<view class="circle1"></view>
			<view class="circle2"></view>
		</view>
		<view class="bc">
			<view class="rectangle1"></view>
			<view class="rectangle2"></view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			active: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			handleClick() {
				// 触发父组件的事件，通知父组件切换插槽
				this.$emit('click');
			}
		}
	};
</script>

<style scoped>
	.content {
		position: relative;
		background-color: #fff;
		width: 100%;
		height: 100%;
		border-radius: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border: #000 4rpx solid;
	}

	.content.active {
		background-color: #ffeb3b;
		/* 激活时的背景颜色 */
	}

	.circle1 {
		position: absolute;
		top: 30%;
		left: 8%;
		width: 18rpx;
		height: 18rpx;
		border-radius: 100rpx;
		background-color: #fff1b4;
		border: #000 4rpx solid;
	}


	.circle2 {
		position: absolute;
		top: 30%;
		right: 8%;
		width: 18rpx;
		height: 18rpx;
		border-radius: 100rpx;
		background-color: #fff1b4;
		border: #000 4rpx solid;
	}

	.rectangle1 {
		position: absolute;
		top: 28%;
		border-radius: 30rpx;
		left: 10%;
		width: 4px;
		height: 110rpx;
		background-color: #fff1b4;
		border: #000 4rpx solid;
		margin-top: 10rpx;
	}

	.rectangle2 {
		position: absolute;
		top: 28%;
		border-radius: 30rpx;
		right: 10%;
		width: 4px;
		height: 110rpx;
		background-color: #fff1b4;
		border: #000 4rpx solid;
		margin-top: 10rpx;
	}
</style>