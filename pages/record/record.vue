<template>
	<view class="content">
		<!-- 记录 -->
		<view class="main">
			<view class="button">
				<view class="record">
					<circle :active="activeSlot===1" @click="setActive(1)">提醒</circle>
				</view>
				<view class="record">
					<circle :active="activeSlot===2" @click="setActive(2)">记录</circle>
				</view>
			</view>
			<view class="rili">

			</view>
		</view>



	</view>
</template>

<script>
	import circle from './components/circle/circle.vue'
	export default {
		components: {
			circle
		},
		data() {
			return {
				activeSlot: 1 // 用于记录当前激活的插槽
			}
		},
		methods: {

			setActive(slot) {
				// 切换激活插槽，保证不能同时激活两个插槽
				if (this.activeSlot === slot) {
					this.activeSlot = null; // 如果点击同一个插槽，取消激活
				} else {
					this.activeSlot = slot;
				}
			}
		}
	}
</script>

<style less scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-image: url('../../static/background.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		padding-top: 15%;
		width: 100%;
		height: 100vh;

	}

	.main {
		display: flex;
		flex-direction: column;
		width: 90%;
		height: 100vh;
		align-items: center;
		/* justify-content: center; */
		/* background-color: salmon; */
	}

	.button {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 90%;
		height: 10vh;
		/* background-color: #fff; */
	}

	.record {
		/* background-color: #30fcff; */
		width: 40%;
		border-radius: 100rpx;
		height: 50%;
	}

	.rili {
		width: 90%;
		height: 40vh;
		border: #000 4rpx solid;
		border-radius: 25rpx;
		background-color: #fff;
	}
</style>