<template>
	<view class="content">
		<view class=""
			style="width: 90%; height: 15vh; background-color: #fff; border: 4rpx solid #000;border-radius: 40rpx;">
			<!-- 选择宠物 -->
			<view class="" style="background-color: #fff;flex: 1;height: 50%; border-radius: 40rpx;">

			</view>
			<view class="" style="border-bottom: 2rpx solid #dcdfe6; flex: 1; width: 70%; margin: auto;">
				
			</view>
			<!-- 选择时间 -->
			<view class="">

			</view>
		</view>
		<button class="button" type="primary" @click="toggle('bottom')"><text class="button-text">底部</text></button>
		<!-- 普通弹窗 -->
		<uni-popup ref="popup" background-color="#fff" @change="change">
			<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }"><text
					class="text">popup 内容</text></view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {

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
</style>