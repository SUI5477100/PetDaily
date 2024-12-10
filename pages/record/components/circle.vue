<template>
	<view class="content" :class="{ active: active }" @click="handleClick">
		<slot></slot>
		<view class="circle">
			<view class="circleActive circle1"></view>
			<view class="circleActive circle2"></view>
		</view>

		<view class="bc" v-if="active">
			<view class="rectangle1"></view>
			<view class="rectangle2"></view>
		</view>
		<view class="circle" v-if="active">
			<view class="circleActive circle3"></view>
			<view class="circleActive circle4"></view>
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
				// 触发父组件的事件，通知父组件切换 active 状态
				this.$emit('click');
			}
		}
	};
</script>

<style scoped lang="less">
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
		transition: background-color 0.5s ease;
	}

	.content.active {
		background-color: #ffeb3b;
	}

	.circleActive {
		position: absolute;
		width: 18rpx;
		height: 18rpx;
		border-radius: 100rpx;
		background-color: #fff1b4;
		border: #000 4rpx solid;
	}

	.circle1 {
		top: 30%;
		left: 8%;
	}

	.circle2 {
		top: 30%;
		right: 8%;
	}

	.bc {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.rectangle1,
	.rectangle2 {
		width: 4px;
		height: 105rpx;
		background-color: #fff1b4;
		border: #000 4rpx solid;
		border-radius: 30rpx;
		margin-top: 10rpx;
		
	}

	.bc {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.rectangle1,
	.rectangle2 {
		width: 4px;
		height: 7vh;
		background-color: #fff1b4;
		border: #000 4rpx solid;
		border-radius: 30rpx;
		margin-top: 10rpx;
		z-index: 10;
		
	}

	.circle3 {
		top: calc(30% + 7vh);
		left: 8%;

	}

	.circle4 {
		top: calc(30% + 7vh);
		right: 8%;
	}

	.rectangle1 {
		position: absolute;
		top: 28%;
		left: 10%;
	}

	.rectangle2 {
		position: absolute;
		top: 28%;
		right: 10%;
	}
</style>