<template>
	<!--记录页面 -->
	<view class="content">
		<img src="https://www.serverzhu.com/petImg/cat.png" alt="" class="img" />
		<view class=""
			style="width: 90% ; background-color: #fff; border-radius: 20rpx; border: 4rpx solid #000 ;margin-bottom: 30rpx;">
			<view class="" style="margin: 20rpx;font-size: 36rpx;font-weight: 600;">
				描述
			</view>
			<uni-easyinput type="textarea" v-model="valueText" placeholder="请输入内容" class="input"
				placeholderStyle="font-size: 32rpx"></uni-easyinput>
		</view>



		<view class="button-text w90" @click="togglePet('bottom')">
			<view style="margin-left: 20rpx;">记录宠物</view>
			<view class="center">
				<view style="margin-right: 20rpx;">
					{{ selectPet.join(', ') }}
				</view>
				>
			</view>
		</view>

		<view class="button-text w90" @click="toggle('bottom')">
			<view style="margin-left: 20rpx;">类型</view>
			<view class="center">
				<view style="margin-right: 20rpx;">
					{{record}}
				</view>
				>
			</view>
		</view>

		<view class="button-text w90" @click="show = true">
			<view style="margin-left: 20rpx;">时间</view>
			<view class="center">
				<view style="margin-right: 20rpx;">
					{{time}}
				</view>
				>
			</view>
		</view>

		<!-- <view class="button-text w90" @click="toggleRemind('bottom')">
			<view style="margin-left: 20rpx;">重复</view>
			<view class="center">
				<view style="margin-right: 20rpx;">
					{{remind}}
				</view>
				>
			</view>
		</view> -->
		<view class="button-add" @click="saveAll">
			保存
		</view>


		<!-- 选择宠物弹框 -->
		<uni-popup ref="popupSelectPet" background-color="#fff" @change="changePet">
			<view class="select-pet">
				选择宠物
			</view>
			<view class="uni-list">
				<checkbox-group @change="checkboxChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in items" :key="item.id">
						<checkbox color="#FFCC33" :value="item.id" />
						<img :src="item.pet_pic" class="pet-img" />
						<view>{{item.name}}</view>
					</label>
				</checkbox-group>
			</view>
			<view class="saveBtn" @click="closeSelectPet">
				保存
			</view>
		</uni-popup>
		<!-- 类型弹窗 -->
		<uni-popup ref="popup" background-color="#fff" @change="change" :show="show">
			<view class="popup-content">
				<uni-section title="类型" type="line"></uni-section>
				<uni-list>
					<uni-list-item title="日常提醒" clickable @click="onClick('日常提醒','#fff7b0')" />
					<uni-list-item title="洗护提醒" clickable @click="onClick('洗护提醒','#b0f8ff')" />
					<uni-list-item title="清洁提醒" clickable @click="onClick('清洁提醒','#ffc2b0')" />
					<uni-list-item title="用药提醒" clickable @click="onClick('用药提醒','#d2b0ff')" />
				</uni-list>
			</view>
		</uni-popup>
		<!-- 时间弹框 -->
		<u-datetime-picker :show="show" v-model="time" mode="time" ref="popupTime" @confirm="closeTime"
			@cancel="cancelTime"></u-datetime-picker>
		<!-- 提醒弹框 -->
	<!-- 	<uni-popup ref="popupRemind" background-color="#fff" @change="change" :show="show">
			<view class="popup-content">
				<view style="display: flex;justify-content: space-between; align-items: center;">
					<uni-section title="重复" type="line"></uni-section>
					<view class="uploadBtn" @click="closePopup">
						确定
					</view>
				</view>
				<uni-indexed-list :options="list" :show-select="true" @click="bindClick" />
			</view>
		</uni-popup> -->

	</view>
</template>

<script>
	import api from '../../../utils/api.js'
	export default {
		data() {
			return {
				record: '',
				remind: '',
				show: false,
				time: this.formatTimestamp(Number(new Date())),
				list: [{
					data: [
						'周一',
						'周二',
						'周三',
						'周四',
						'周五',
						'周六',
						'周日'
					]
				}],
				valueText: '',
				selectedPetIds: [],
				selectPet: [],
				selectedDays: [], // 用于存储选中的天数
				items: [],
				recordColor: '',
				fulldate: ''
			}
		},
		computed: {},
		onReady() {
			this.getPetList()
		},
		onLoad(options) {
			// console.log(options.fulldate, '9999')
			this.fulldate = options.fulldate
			console.log(this.fulldate, '000000')

		},
		methods: {
			// 获取宠物列表
			async getPetList() {
				try {
					const response = await api.getPet()
					console.log(response)
					this.items = response.data
				} catch (err) {
					console.log(err)
					this.sendToast('error', '获取宠物信息失败了(´～`)')
				}
			},
			cancelTime() {
				this.show = false;
			},
			closeTime() {
				this.show = false;
			},
			// saveAll() {
			// 	console.log('描述', this.valueText, '保存类型', this.record, '时间', this.time, '选中id', this.selectPet, '重复',
			// 		this.remind, '颜色', this.recordColor, '选中日期', this.fulldate)
			// 	this.submitRemind()
			// },
			saveAll() {
				// 1. 先调用 wx.requestSubscribeMessage
				uni.requestSubscribeMessage({
					tmplIds: ['3R4JVF2k2EvISj7-soVGL7iY70taAaD1y_Gqy_FrlJM'], // 多个也可写成数组
					success: (res) => {
						if (res['3R4JVF2k2EvISj7-soVGL7iY70taAaD1y_Gqy_FrlJM'] === 'accept') {
							// 用户同意
							this.doAddReminder(); // 去执行提交 remind
						} else {
							console.log('用户拒绝订阅');
						}
					},
					fail: (err) => {
						console.error('订阅接口调用失败', err);
					}
				});
			},
			doAddReminder() {
				console.log(
					'描述', this.valueText,
					'保存类型', this.record,
					'时间', this.time,
					'选中id', this.selectPet,
					'重复', this.remind,
					'颜色', this.recordColor,
					'选中日期', this.fulldate
				);

				this.submitRemind(); // 调用你写好的接口 addReminders(...)
			},
			async submitRemind() {
				try {
					const res = await api.addReminders({
						description: this.valueText,
						reminder_type: this.record,
						remind_time: this.fulldate + ' ' + this.time,
						pet_names: JSON.stringify(this.selectPet),
						repeat_type: this.remind,
						color: this.recordColor,
						selected_date: this.fulldate
					});
					// if (res[1].data.success) {
					// 	uni.showToast({
					// 		title: '添加提醒成功',
					// 		icon: 'none'
					// 	});
					// }
					console.log('res,', res)
				} catch (err) {
					console.error(err);
				}
			},
			// 格式化时间戳
			formatTimestamp(timestamp) {
				const date = new Date(timestamp);
				// 提取年份、月份、日期、小时、分钟、秒
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, '0');
				const day = String(date.getDate()).padStart(2, '0');
				const hours = String(date.getHours()).padStart(2, '0');
				const minutes = String(date.getMinutes()).padStart(2, '0');
				const seconds = String(date.getSeconds()).padStart(2, '0');
				// 返回格式化的日期字符串
				return `${hours}:${minutes}`;
			},
			// 类型弹框
			toggle(type) {
				this.type = type
				this.$refs.popup.open(type)
			},
			// 重复弹框
			// toggleRemind(type) {
			// 	this.type = type
			// 	this.$refs.popupRemind.open(type)
			// },
			// 重复天数转换
			bindClick(e) {
				console.log('点击item，返回数据' + JSON.stringify(e));
				const day = e.item.name; // 获取点击的天数
				const index = this.selectedDays.indexOf(day);
				console.log(this.selectedDays, e.item, '8888')
				if (index === -1) {
					this.selectedDays.push(day); // 如果没有选中，则添加
				} else {
					this.selectedDays.splice(index, 1); // 如果已经选中，则移除
				}

				// 判断是否选中了所有的星期
				if (this.selectedDays.length === 7) {
					this.remind = '每天'; // 如果选中了所有的星期，显示'每天'
				} else {
					this.remind = this.selectedDays.join(', '); // 否则显示选中的天数
				}
			},
			// 关闭重复弹框
			closePopup() {
				this.$refs.popupRemind.close()
			},
			change(e) {
				console.log('当前模式(重复)：' + e.type + ',状态：' + e.show);
			},
			// 保存类型
			onClick(e, color) {
				// console.log('执行click事件', e);
				this.record = e;
				this.recordColor = color
				console.log(this.record);
				uni.showToast({
					title: '保存成功',
				});
				this.$refs.popup.close();
			},
			// 打开选择宠物弹框
			togglePet(type) {
				this.type = type
				this.$refs.popupSelectPet.open(type)
			},
			// 关闭选择宠物弹框
			closeSelectPet() {
				console.log('最终选中的宠物ID:', this.selectedPetIds);
				this.$refs.popupSelectPet.close()
			},
			// 切换宠物弹框模式
			changePet(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			// 选择宠物操作
			checkboxChange(e) {
				// 直接获取选中id数组（自动转为字符串数组）
				const selectedIds = e.detail.value;

				// 转换为数字数组（如果需要数字类型）
				this.selectedPetIds = selectedIds.map(id => Number(id));

				// 更新选中显示（如果需要name）
				this.selectPet = this.items
					.filter(item => selectedIds.includes(String(item.id)))
					.map(item => item.name);

				// 更新复选框状态（可选，如果需要保持状态）
				this.items = this.items.map(item => ({
					...item,
					checked: selectedIds.includes(String(item.id))
				}));
			}
		}
	}
</script>

<style scoped lang="less">
	.content {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-image: url('https://pet-daily-zm.oss-cn-beijing.aliyuncs.com/background.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-color: #fffce0;
		padding-top: 5%;
		width: 100%;
		height: 100vh;
	}

	.img {
		position: absolute;
		height: 40vh;
		bottom: 20%;
		pointer-events: none;
		left: -20%;
	}

	.img2 {
		position: absolute;
		height: 40vh;
		pointer-events: none;
		right: -20%;
		opacity: 0.7;
		z-index: 10;
	}

	/deep/.is-input-border {
		width: 96%;
		margin: 2%;
		border: #fff 4rpx solid !important;
		height: 20vh;
		border-radius: 20rpx;
	}

	/deep/ .uni-easyinput__content-textarea {
		height: 17vh;
	}

	/deep/ .uni-easyinput {
		flex: 0;
	}

	/deep/.input-padding {
		padding-left: 0rpx;
	}

	.button-text {
		border-radius: 20rpx;
		background-color: #fff;
		display: flex;
		margin-bottom: 30rpx;
		justify-content: space-between;
		align-items: center;
		border: #000 4rpx solid;
		height: 8vh;

	}

	.w90 {
		width: 90%;
	}

	.w90:active {
		background-color: #f1f1f1;
	}

	.button-text:active {
		background-color: #f1f1f1;
	}

	.button-add {
		border-radius: 50rpx;
		background-color: #fff;
		display: flex;
		margin-bottom: 30rpx;
		justify-content: center;
		align-items: center;
		background-color: #ffeb3b;
		width: 80%;
		border: #000 4rpx solid;
		height: 6vh;
		z-index: 10;
	}

	.button-add:active {
		background-color: #e7d335;
	}

	/deep/ .popup-content {
		position: relative;
		padding-top: 40rpx;
		height: 35vh;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	/deep/.uni-indexed-list__item-container {
		padding: 0rpx !important;
		margin-left: 30rpx;
	}

	/deep/.uni-indexed-list__menu {
		width: 30rpx !important;
	}

	/deep/.uni-indexed-list {
		top: 20% !important;
	}

	/deep/.uni-indexed-list__title-wrapper {
		background-color: #fff !important;
	}

	/deep/.uni-indexed-list__list {
		border-top-width: 0px !important;
	}

	.center {
		margin-right: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.uploadBtn {
		border-radius: 25rpx;
		font-size: 30rpx;
		margin-right: 15rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #2979ff;
		width: 100rpx;
		height: 18%;
	}

	.uploadBtn:active {
		color: #1d5dbc;
	}

	.line {
		border-bottom: 2rpx solid #dcdfe6;
		flex: 1;
		width: 80%;
		margin: auto;
	}



	/deep/.uni-indexed-list__menu {
		width: 30rpx !important;
	}

	/deep/.uni-indexed-list__title-wrapper {
		height: 0rpx;
		background-color: #fff !important;
	}

	/deep/.uni-indexed-list__list {
		border-top-width: 0px !important;
	}

	/deep/.uni-list-cell {
		display: flex;
		margin: 30rpx;
		align-items: center;
	}

	/deep/.uni-indexed-list__item-border {
		border-bottom-color: #fff !important;
	}

	.select-pet {
		font-weight: 600;
		font-size: 36rpx;
		margin: 30rpx;
	}

	.pet-img {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50rpx;
		margin: 30rpx;
	}

	.saveBtn {
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 90%;
		background-color: #ffeb3b;
		height: 100rpx;
		border-radius: 50rpx;
		border: 4rpx solid #000;
	}
</style>
