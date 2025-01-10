<template>
	<!--记录页面 -->
	<view class="content">
		<img src="../../../static/cat.png" alt="" class="img" />
		<view class=""
			style="width: 90% ; background-color: #fff; border-radius: 20rpx; border: 4rpx solid #000 ;margin-bottom: 30rpx;">
			<view class="" style="margin: 20rpx;font-size: 36rpx;font-weight: 600;">
				描述
			</view>
			<uni-easyinput type="textarea" v-model="value" placeholder="请输入内容" class="input"
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

		<!-- 	<picker mode="time" @change="picker3" :value="time" start="09:00" end="18:00" class="w90">
			<view class="button-text ">
				<view style="margin-left: 20rpx;">时间</view>
				<view class="center">
					<view style="margin-right: 20rpx;">
						{{time}}
					</view>
					>
				</view>
			</view>
		</picker> -->

		<view class="button-text w90" @click="toggleRemind('bottom')">
			<view style="margin-left: 20rpx;">重复</view>
			<view class="center">
				<view style="margin-right: 20rpx;">
					{{remind}}
				</view>
				>
			</view>
		</view>
		<view class="button-add">
			保存
		</view>


		<!-- 选择宠物弹框 -->
		<uni-popup ref="popupSelectPet" background-color="#fff" @change="changePet">
			<view class="select-pet">
				选择宠物
			</view>
			<view class="uni-list">
				<checkbox-group @change="checkboxChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in items" :key="item.index">
						<checkbox color="#FFCC33" :value="item.name" />
						<img :src="item.img" class="pet-img" />
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
					<uni-list-item title="日常提醒" clickable @click="onClick('日常提醒')" />
					<uni-list-item title="洗护提醒" clickable @click="onClick('洗护提醒')" />
					<uni-list-item title="清洁提醒" clickable @click="onClick('清洁提醒')" />
					<uni-list-item title="用药提醒" clickable @click="onClick('用药提醒')" />
				</uni-list>
			</view>
		</uni-popup>


		<!-- 时间弹框 -->
		<u-datetime-picker :show="show" v-model="time" mode="time"></u-datetime-picker>




		<!-- 提醒弹框 -->
		<uni-popup ref="popupRemind" background-color="#fff" @change="change" :show="show">
			<view class="popup-content">
				<view style="display: flex;justify-content: space-between; align-items: center;">
					<uni-section title="重复" type="line"></uni-section>
					<view class="uploadBtn" @click="closePopup">
						确定
					</view>
				</view>
				<uni-indexed-list :options="list" :show-select="true" @click="bindClick" />
			</view>
		</uni-popup>




	</view>
</template>

<script>
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
				selectedDays: [], // 用于存储选中的天数
				selectPet: [],
				items: [{

						name: '暹罗',
						img: 'https://www.serverzhu.com/mimi1.jpg'
					},
					{
						name: '梨花',
						img: 'https://www.serverzhu.com/mimi2.png'
					},
				]
			}
		},
		computed: {},
		methods: {
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
			toggleRemind(type) {
				this.type = type
				this.$refs.popupRemind.open(type)
			},
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
					// console.log(this.selectedDays, '9999')
					this.remind = this.selectedDays.join(', '); // 否则显示选中的天数
					// console.log(this.remind, '0000')
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
			onClick(e) {
				console.log('执行click事件', e);
				this.record = e;
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
				this.$refs.popupSelectPet.close()
			},
			// 切换宠物弹框模式
			changePet(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			// 选择宠物操作
			checkboxChange: function(e) {
				var items = this.items,
					values = e.detail.value;
				this.selectPet = values
				// console.log(values, '0000000000')
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.value)) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
			},
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