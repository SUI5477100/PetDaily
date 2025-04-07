<template>
	<view class="content">
		<!-- 记录 -->
		<!-- 当activeSlot=1的时候联调记录的接口，当activeSlot=2的时候联调提醒的接口，就可以做到切换日历 -->
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
				<uni-calendar v-if="activeSlot === 1" class="uni-calendar--hook" :showMonth="false" @change="change"
					@monthSwitch="monthSwitch" />
				<uni-calendar v-else-if="activeSlot === 2" class="uni-calendar--hook" :showMonth="false"
					@change="change2" @monthSwitch="monthSwitch2" />

			</view>

			<view v-show="activeSlot===1" class="record-items">
				<recordItems></recordItems>
			</view>
			<view v-show="activeSlot===2" class="record-items">
				<tipsItems :calendarData="calendarData"></tipsItems>
			</view>
			<view v-if="activeSlot===1" class="record-book" @click="logbook">
				小宠的记录本
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
				calendarData: null,
				info: {
					selected: [],
					selected2: [],
				},

			}
		},
		onReady() {
			const e = {
				fulldate: new Date().toISOString().split('T')[0] // 获取当前日期，格式为 YYYY-MM-DD
			};
			this.change(e)
		},
		onLoad() {
			const e = {
				fulldate: new Date().toISOString().split('T')[0]
			}
			this.change2(e)
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
				console.log('change记录 返回:', e.fulldate)
			},
			monthSwitch(e) {
				console.log('monthSwitchs 返回:', e)
			},
			change2(e) {
				console.log('change 返回:', e)
				// 将数据保存到响应式变量
				this.calendarData = e
			},
			monthSwitch2(e) {
				console.log('monthSwitchs 返回:', e)
			},
			logbook() {
				uni.redirectTo({
					url: `/pages/record/recordItems/logbook`
				});
			}
		}
	}
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
		background-color: #fffce0;
		padding-top: 15%;
		width: 100%;
		// height: 140vh;

	}

	.main {
		display: flex;
		flex-direction: column;
		width: 90%;
		// height: 100vh;
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

	.record-book {
		width: 100%;
		height: 100rpx;
		margin-top: 30rpx;
		border: #000 4rpx solid;
		background-color: #ffd553;
		border-radius: 100rpx;
		display: flex;
		justify-content: center;
		font-weight: 600;
		font-size: 34rpx;
		align-items: center;
	}

	.record-book:active {
		background-color: #eac34c;
	}
</style>
