<template>
	<view>
		<view class="century">
			<view class="color-items" v-for="items in colorList" :key="items.text">
				<view class="circle" :style="{ backgroundColor: items.color }"></view>
				<view class="tips-text">{{ items.text }}</view>
			</view>
		</view>
		<view class="record-items" v-for="(items, index) in iconList" :key="index" @click="toggleCheck(index)">
			<view class="color" :style="{ backgroundColor: items.color }"></view>
			<view class="items-left">
				<view :class="{ 'strikethrough': items.isChecked }" class="text">{{ items.description }}</view>
				<view class="text">{{ items.remind_time }}</view>
			</view>
			<img :src="items.isChecked ? '../../../static/yuanfuxuankuang.png' : '../../../static/fuxuankuangkongyuan.png'"
				@click="toggleCheck(index)" class="right-icon" />
		</view>
<view class="fixed" v-if="showTextPost" @click="textPost">
</view>

	</view>
</template>
<script>
	import api from "../../../utils/api.js"
	import dayjs from 'dayjs';
	import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
	
	dayjs.extend(isSameOrAfter)
	export default {

		data() {
			return {
				currentDate: '',
				showTextPost: true,
				colorList: [{
						color: '#fff7b0',
						text: '日常提醒'
					},
					{
						color: '#b0f8ff',
						text: '洗护提醒'
					},
					{
						color: '#ffc2b0',
						text: '清洁提醒'
					},
					{
						color: '#d2b0ff',
						text: '用药提醒'
					}
				],
				iconList: [{
						time: '8:00',
						text: '饮食',
						isChecked: false
					},
				]
			};
		},
		props: {
			calendarData: {
				type: Object,
				default: () => ({})
			}
		},
		onReady() {
			this.getReminders()
		},
		watch: {
			  calendarData(newVal) {
			    if (Object.keys(newVal).length) {
			      this.currentDate = newVal.fulldate;
			      const today = dayjs().format('YYYY-MM-DD');
			      const selected = dayjs(this.currentDate).format('YYYY-MM-DD');
				  
			      this.showTextPost = dayjs(selected).isSameOrAfter(today); // 只显示未来和当天
				  console.log(this.showTextPost,'999999')
			      this.getReminders();
			    }
			  },
			// // 监听数据变化
			// calendarData(newVal) {
			// 	if (Object.keys(newVal).length) {
			// 		console.log('收到父组件传递的日历数据:', newVal.fulldate)
			// 		// 这里可以执行后续业务逻辑
			// 		this.currentDate = newVal.fulldate; // 更新 currentDate
			// 		this.getReminders()
			// 	}
			// }
		},

		methods: {
			async getReminders() {
				try {
					const response = await api.getReminders(this.currentDate)
					this.iconList = response.data
					console.log(this.iconList, '0000000000000')
				} catch (err) {
					console.log(err)
					//TODO handle the exception
				}
			},
			// getReminders(){
			// 	console.log('9999999999999999')
			// },
			textPost() {
				const date = encodeURIComponent(this.currentDate);
				uni.redirectTo({
					url: `/pages/record/components/textPost?fulldate=${date}`
				});
			},
			toggleCheck(index) {
				this.iconList[index].isChecked = !this.iconList[index].isChecked;
			}
		}
	};
</script>
<style scoped lang="less">
	.record-items {
		width: 100%;
		height: 150rpx;
		border: #000 4rpx solid;
		border-left: none;
		/* 不显示左边框 */
		background-color: #fff;
		border-radius: 20rpx;
		margin-bottom: 15rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.color {
		height: 100%;
		border-radius: 20rpx;
		border: #000 4rpx solid;
		width: 10rpx;
		margin-right: 40rpx;
		background-color: #eac34c;
	}

	.record-items:active {
		background-color: #f4f4f4;
	}

	.items-left {
		height: 80%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.text {
		/* padding-bottom: 30rpx; */
	}

	.icon {
		width: 80rpx;
		height: 80rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}

	.right-icon {
		margin-left: auto;
		width: 45rpx;
		height: 45rpx;
		margin-right: 25rpx;
	}

	.checkbox {
		width: 30rpx;
		height: 30rpx;
	}

	.century {
		width: 100%;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: space-around;
	}

	.color-items {
		display: flex;
		align-items: center;
		margin-right: 10rpx;
	}

	.circle {
		width: 25rpx;
		height: 25rpx;
		border-radius: 100rpx;
		border: #000 2rpx solid;
	}

	.tips-text {
		font-size: 28rpx;
		margin-left: 10rpx;
	}

	.strikethrough {
		text-decoration: line-through;
	}

	.fixed {
		background-image: url('https://www.serverzhu.com/petImg/add.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		width: 150rpx;
		height: 150rpx;
		position: fixed;
		bottom: 3%;
		right: -4%;
	}

	.fixed:active {
		background-image: url('https://www.serverzhu.com/petImg/add2.png');
	}
</style>
