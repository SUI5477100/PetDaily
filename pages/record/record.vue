<template>
	<view class="content">
		<!-- 记录 -->
		<view class="main">
			<view class="button">
				<view class="record">
					<circle :active="activeSlot===1" @click="setActive(1)">记录</circle>
				</view>
				<view class="record">
					<circle :active="activeSlot===2" @click="setActive(2)">提醒</circle>
				</view>
			</view>
			<view class="rili">
				<uni-calendar class="uni-calendar--hook" :selected="info.selected" :showMonth="false" @change="change"
					@monthSwitch="monthSwitch" />
			</view>
			<view v-show="activeSlot===1" class="record-items">
				<recordItems></recordItems>
			</view>
			<view v-show="activeSlot===2" class="tips-items">
				<tipsItems></tipsItems>
			</view>
		</view>
	</view>
</template>

<script>
	import circle from './components/circle.vue'
	import recordItems from './components/recordItems.vue'
	import tipsItems from './components/tipsItems.vue'
	export default {
		components: {
			circle,
			recordItems,
			tipsItems
		},
		data() {
			return {
				activeSlot: 1,
				info: {
					selected: []
				}
			}
		},
		methods: {
			setActive(slot) {
				// 切换激活插槽，保证不能同时激活两个插槽
				if (this.activeSlot === slot) {
					this.activeSlot = this.activeSlot;
				} else {
					this.activeSlot = slot;
				}
			},
			change(e) {
				console.log('change 返回:', e)
				// 模拟动态打卡
				if (this.info.selected.length > 5) return
				this.info.selected.push({
					date: e.fulldate,
					// info: '打卡'
				})
			},
			monthSwitch(e) {
				console.log('monthSwitchs 返回:', e)
			}
		}
	}
</script>

<style scoped lang="less">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-image: url('../../static/background.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-color: #fffce0;
		padding-top: 15%;
		width: 100%;
		height: 140vh;

	}

	.main {
		display: flex;
		flex-direction: column;
		width: 90%;
		height: 100vh;
		align-items: center;
	}

	.button {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 90%;
	}

	.record {
		width: 40%;
		border-radius: 100rpx;
		height: 5vh;
		margin-bottom: 2vh;
	}

	.rili {
		width: 100%;
		margin-bottom: 20rpx;
	}

	.record-items {
		width: 100%;
	}
</style>