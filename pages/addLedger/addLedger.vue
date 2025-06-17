<template>
	<view class="">
		<uni-nav-bar left-icon="left" title="添加花销" @clickLeft="back" height="160rpx" />
		<view class="content">
			<view class="select">
				<!-- 类型选择 -->
				<view class="select-box" @click="showTypePicker = true">
					<view class="select-title">类型</view>
					<view class="m40">
						<view class="m30">{{ selectedType }}</view>
						<view> > </view>
					</view>
				</view>
				<u-picker :show="showTypePicker" :columns="typeColumns" v-model="selectedType"
					@cancel="showTypePicker = false" @confirm="onTypeChange"></u-picker>

				<!-- 金额选择 -->
				<view class="select-box">
					<view class="select-title">金额</view>
					<view class="m40">
						<view style="margin: 0rpx 20rpx;">
							<input class="text-center" @input="updateAmount" @click.stop v-model="selectedAmount" />
						</view>
						<view> 元 </view>
					</view>
				</view>

				<!-- 选择时间 -->
				<view class="select-box" @click="show = true">
					<view class="select-title">
						记录时间
					</view>
					<view class="m40">
						<view class="m30">
							{{ formattedTime }}
						</view>
						<view> > </view>
					</view>
				</view>
			</view>
			<view class="input-box">
				<view class="input-title">
					描述
				</view>
				<uni-easyinput type="textarea" v-model="inputValue" placeholder="请输入内容" class="input"
					placeholderStyle="font-size: 32rpx"></uni-easyinput>

			</view>
			<view class="button-add" @click="saveRecord">
				保存
			</view>

			<!-- 时间选择弹框 -->
			<u-datetime-picker :show="show" v-model="valueTime" mode="datetime" @confirm="confirmBtn"
				@cancel="closeBtn">
			</u-datetime-picker>
			<u-toast ref="uToast"></u-toast>
		</view>
	</view>
</template>
<script>
import api from '../../utils/api.js'
export default {

	data() {
		return {
			show: false,
			inputValue: '',
			updatedValue: {},
			valueTime: Number(new Date()),
			list: [{
				type: "",
				message: "",
			},],
			showTypePicker: false,
			typeColumns: [['餐饮', '购物', '交通', '娱乐', '医疗', '洗护', '其他']],
			selectedType: '餐饮',
			selectedAmount: '',
			ledgerId: 0,
			ledgerList: []
		}
	},
	computed: {
		// 计算属性，用于格式化时间戳
		formattedTime() {
			const date = new Date(this.valueTime);
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			const hours = String(date.getHours()).padStart(2, '0');
			const minutes = String(date.getMinutes()).padStart(2, '0');
			return `${year}-${month}-${day} ${hours}:${minutes}`;
		}
	},
	onLoad(options) {
		console.log("onLoad options:", options)
		this.ledgerId = options.id
		if (this.ledgerId) {
			this.getLedgerList(this.ledgerId)
		}
	},

	methods: {
		// 获取花销
		async getLedgerList(ledgerId) {
			try {
				const response = await api.getLedgerList({ id: ledgerId });
				this.ledgerList = response.data;
				if (this.ledgerList.length > 0) {
					const ledger = this.ledgerList[0];
					this.selectedType = ledger.category;
					this.selectedAmount = ledger.amount;
					this.inputValue = ledger.note;
					this.valueTime = new Date(ledger.recorded_at).getTime();
				}
				console.log(this.ledgerList, '999');
			} catch (err) {
				console.log(err);
			}
		},
		// 添加花销
		async saveRecord() {
			if (this.ledgerId) {
				try {
					const response = await api.updateLedger({
						id:this.ledgerId,
						amount: this.selectedAmount,
						type: "expense",
						category: this.selectedType,
						note: this.inputValue,
						recorded_at: this.formattedTime
					})
					console.log(response)
					this.back()
					this.sendToast('success', '修改成功')
				} catch (err) {
					console.log(err)
					this.sendToast('error', '修改失败')
				}
			} else {
				try {
					const response = await api.addLedger({
						amount: this.selectedAmount,
						type: "expense",
						category: this.selectedType,
						note: this.inputValue,
						recorded_at: this.formattedTime
					})
					console.log(response)
					this.back()
					this.sendToast('success', '添加成功')
				} catch (err) {
					console.log(err)
					this.sendToast('error', '添加失败')
				}
			}
			console.log(this.selectedType, this.selectedAmount, this.inputValue, this.formattedTime)
		},

		change(e) {
			console.log('当前模式：' + e.type + ',状态：' + e.show);
			console.log(this.selectPet)
		},

		// 关闭时间弹框
		confirmBtn() {
			this.show = false
		},
		closeBtn() {
			this.show = false
		},

		// 返回页面
		back() {
			uni.redirectTo({
				url: '/pages/ledger/ledger'
			});
		},

		// 错误/正确信息提醒
		sendToast(type, message) {
			this.list.type = type
			this.list.message = message
			this.showToast(this.list)
		},
		showToast(params) {
			this.$refs.uToast.show({
				...params,
			});
		},
		// backRecord() {
		// 	uni.redirectTo({
		// 		url: `/pages/record/recordItems/logbook`
		// 	});
		// },

		// 获取宠物列表
		onTypeChange(value) {
			this.selectedType = value.value[0];
			this.showTypePicker = false;
		},
		updateAmount() {
			// 处理金额输入逻辑
			console.log('金额更新为:', this.selectedAmount);
		}
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
	// height: 100vh;
}

.select {
	width: 90%;
	height: 24vh;
	background-color: #fff;
	border: 4rpx solid #000;
	border-radius: 40rpx;
}

.select-box {
	flex: 1;
	height: 33%;
	border-radius: 40rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.select-title {
	margin: 30rpx;
	width: 180rpx;
	font-size: 34rpx;
	font-weight: 600;
}

.line {
	border-bottom: 2rpx solid #dcdfe6;
	flex: 1;
	width: 90%;
	margin: auto;
}

.m40 {
	display: flex;
	align-items: center; // 确保子元素垂直居中
	margin: 30rpx;
}

.m30 {
	margin: 0 30rpx;
}

.text-center {
	background-color: #f2f2f2;
	border-radius: 20rpx;
	width: 80rpx;
	padding: 10rpx;
	text-align: center;
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

/deep/.is-input-border {
	width: 94%;
	margin: 3%;
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




.input-box {
	width: 90%;
	background-color: #fff;
	border-radius: 40rpx;
	border: 4rpx solid #000;
	margin-bottom: 30rpx;
	margin-top: 30rpx;
}

.input-title {
	margin: 30rpx;
	font-size: 34rpx;
	font-weight: 600;
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
	background-color: #fff1b6;
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
	border-bottom-color: #fff1b6 !important;
}

/deep/.uni-navbar__header {
	background-color: #fff1b6 !important;
}
</style>
