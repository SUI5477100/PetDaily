<template>
	<view class="">
		<uni-nav-bar left-icon="left" title="记录列表" @clickLeft="back" height="160rpx" />
		<view class="content">
			<view class="log" v-for="(item,index) in record" :key="item.id">
				<view class="log-header">
					<!-- 标签 -->
					<view class="tips" :style="{ backgroundColor: item.backgroundColor }">
						{{ item.eventType }} <!-- 显示解析后的 event_type 的 type -->
					</view>
					<!-- 时间 -->
					<view class="time">
						{{item.created_at}}
					</view>
				</view>
				<view class="log-content">
					<view class="log-text">
						<view class="note" style="color: #8d5515;" v-html="item.eventDetails">
						</view>
						<view class="note">
							备注： {{item.note}}
						</view>
						<view class="image-container">
							<img v-for="(img,imgIndex) in item.note_pic" :key="imgIndex" :src="img"
								class="preview-image">
						</view>
					</view>
					<view class="pet-container">

					</view>
					<view class="pet-container">
						宠物：
						<view class="pet-pic" v-for="(petImg,index) in item.pet_pics" :key="index">
							<img :src="petImg" alt="" class="pet-image">
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>




<script>
	import api from '../../../utils/api.js';
	export default {
		data() {
			return {
				record: [{
					created_at: '',
					event_type: '',
					note: '',
					pet_names: [],
					pet_pics: []
				}]
			}
		},
		onReady() {
			this.getRecordList()
		},
		methods: {
			async getRecordList() {
				try {
					const response = await api.getRecord();
					console.log(response.data);

					// 处理 event_type，将其解析为对象
					this.record = response.data.map(item => {
						let eventType = {};
						try {
							eventType = JSON.parse(item.event_type); // 尝试解析 JSON 字符串
							console.log(eventType.color); // 打印 color 的值
						} catch (e) {
							console.error("event_type 解析失败", e);
						}
						// 设置 eventType 的不同字段
						let eventDetails = '';
						if (eventType.type === '饮食') {
							eventDetails =
								`食物类型: ${eventType.foodType}<br>
								 进食量: ${eventType.foodAmount}<br>`;
						} else if (eventType.type === '饮水') {
							eventDetails = `饮水量: ${eventType.drinkAmount}`;
						} else if (eventType.type === '体重') {
							eventDetails = `体重: ${eventType.weightAmount}`;
						} else if (eventType.type === '洗护') {
							eventDetails = `洗护类型: ${eventType.cleansingType}`;
						} else if (eventType.type === '尿便') {
							eventDetails =
								`排泄类型: ${eventType.stoolType}<br>
								 排泄频率: ${eventType.stoolFrequency}<br>
								 排泄量: ${eventType.stoolAmount}<br>
								 尿便状态: ${eventType.stoolStatus}<br>
								 尿便颜色: ${eventType.stoolColor}<br>
								 尿便异常: ${eventType.stoolUnusual}<br>
							`;
						} else if (eventType.type === '记事') {
							eventDetails = `记录类型: ${eventType.notesType}`;
						} else if (eventType.type === '异常') {
							eventDetails =
								`异常类型: ${eventType.abnormalType}<br>
								 异常细节: ${eventType.abnormalDetail}<br>`
						} else if (eventType.type === '用药') {
							eventDetails =
								`用药类型: ${eventType.medicationType},${eventType.medicationDetail}<br>
								 给药方式: ${eventType.medicationMethod}<br>
								 药物用量: ${eventType.medicationAmount}<br>
							`;
						} else {
							eventDetails = '未知事件';
						}

						// 设置动态背景色
						return {
							...item,
							eventType: eventType.type || '默认类型', // 提取 type 或者给一个默认值
							backgroundColor: eventType.color || '#4f6df9', // 默认颜色,
							eventDetails: eventDetails // 存储处理后的内容
						};
					});
				} catch (err) {
					console.log(err);
				}

			},
			back() {
				uni.switchTab({
					url: '/pages/record/record'
				});
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

	.log {
		width: 90%;
		background-color: #fefefe;
		border-radius: 40rpx;
		margin-bottom: 40rpx;
	}

	.log-header {
		display: flex;
	}

	.tips {
		width: 120rpx;
		height: 60rpx;
		border-radius: 40rpx;
		border-bottom-left-radius: 0rpx;
		border-top-right-radius: 0rpx;

		// border: 4rpx solid #99621b;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 600;
		color: #fff;
	}

	.time {
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 600;
		color: #754712;
		margin-left: 40rpx;
	}

	.log-content {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.log-text {
		width: 85%;
		border-radius: 40rpx;
		padding: 0rpx 20rpx;
		margin: 20rpx 0rpx;
		background-color: #f8f9f4;
	}

	.note {
		margin: 20rpx 0rpx;
	}

	/* 新增图片容器样式 */
	.image-container {
		display: flex;
		flex-wrap: wrap;
		gap: 20rpx;
		justify-content: flex-start;
	}

	.preview-image {
		flex: 0 0 calc(33.33% - 14rpx);
		width: calc(33.33% - 14rpx);
		height: 180rpx;
		border-radius: 8rpx;
		box-sizing: border-box;

		/* 处理最后一行不足三个的情况 */
		&:nth-child(3n+2):nth-last-child(1) {
			margin-right: auto;
		}
	}

	.pet-container {
		width: 85%;
		border-radius: 40rpx;
		padding: 0rpx 0rpx 20rpx;
		font-weight: 600;
		color: #754712;
		display: flex;
		align-items: center;
	}

	.pet-pic {
		display: flex;
	}

	.pet-image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 100rpx;
	}

	/deep/.uni-navbar__header-container-inner {
		align-items: flex-end !important;
		margin-bottom: 20rpx;
	}

	/deep/.uni-navbar__header-btns-left {
		align-items: flex-end !important;
		margin-bottom: 20rpx;
	}

	/deep/.uni-navbar--border {
		border-bottom-color: #ffe68c !important;
	}

	/deep/.uni-navbar__header {
		background-color: #ffe68c !important;
	}
</style>
