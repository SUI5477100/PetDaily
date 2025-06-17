<template>
	<view class="page">
		<!-- 背景图及返回按钮和余额卡 -->
		<view class="background">
			<view class="back-icon" @click="goback">
				{{ `< 返回` }}
				<!-- <u-icon label="返回" color="#000" size="20" name="arrow-left" /> -->
			</view>
			<view class="balance-card">
				<view class="card-front">
					<view class="" style="display: flex;justify-content: space-between;">
						<view class="transaction-amount" @click="showDatePicker = true">
							{{ selectedYear }}-{{ selectedMonth }}支出
						</view>
						<view class="" @click="toUcharts"
							style="padding: 10rpx 0rpx;background-color: aliceblue;width: 140rpx;border-radius: 40rpx;display: flex;justify-content: center;align-items: center; color: #6f5500; font-size: 14px;">

							查看 >
						</view>
					</view>
					<view class="transaction-amount income">${{ summary.totalExpense }}</view>
				</view>
			</view>
		</view>

		<!-- 白底内容区 -->
		<view class="dashboard">
			<view class="transactions">
				<view class="transactions-header">
					<h2>历史流水记录</h2>
					<a href="#" @click="addLedger">添加花销</a>
				</view>
				<ul class="transaction-list">
					<li class="transaction-item" v-for="(item) in ledgerList" :key="item.id" @click="sendId(item.id)">
						<view class="transaction-details">
							<view class="" style="display: flex; justify-content: space-between;">
								<p class="title">{{ item.category }}</p>
								<view class="transaction-amount expense">- ${{ item.amount }}</view>
							</view>
							<view class="" style="color: #d08b00;margin: 0 0 4px;">
								备注：{{ item.note }}
							</view>
							<p class="date">{{ item.recorded_at }}</p>
						</view>
					</li>
				</ul>
			</view>
		</view>
		<u-popup :show="show" @close="close" @open="open">
			<view class="popup-content">
				<u-icon label="删除" size="38" name="trash-fill" @click="deleteLedgerList"></u-icon>
				<u-icon label="编辑" size="38" name="edit-pen-fill" @click="editLedger"></u-icon>
			</view>
		</u-popup>
		<u-picker :show="showDatePicker" :columns="dateColumns" v-model="selectedDate" @cancel="showDatePicker = false"
			@confirm="onDateChange"></u-picker>

	</view>
</template>

<script>
import api from '../../utils/api.js'
export default {
	name: 'LedgerHistory',
	data() {
		const currentDate = new Date();
		const currentYear = currentDate.getFullYear().toString();
		const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
		return {
			summary: {},
			ledgerList: [],
			show: false,
			deleteId: 0,
			showDatePicker: false,
			dateColumns: [
				['2023', '2024', '2025', '2026', '2027'],
				['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
			],
			selectedYear: currentYear,
			selectedMonth: currentMonth
		};
	},
	onReady() {
		this.getSummary();
		this.getLedgerList();
	},
	methods: {
		goback() {
			uni.switchTab({
				url: '/pages/index/index'
			})
		},
		addLedger() {
			uni.navigateTo({
				url: '/pages/addLedger/addLedger'
			})
		},
		toUcharts() {
			uni.redirectTo({
				url: `/pages/uCharts/uCharts?month=${this.selectedYear}-${this.selectedMonth}`
			});
		},
		editLedger() {
			console.log(this.deleteId);
			uni.navigateTo({
				// url: `/pages/editLedger/editLedger?id=${this.deleteId}`
				url: `../addLedger/addLedger?id=${this.deleteId}`
			});
		},
		async deleteLedgerList() {
			await this.deleteLedger(this.deleteId)
			// 这里不需要 await，直接赋值就好
			this.show = false
			// 再去拉最新的汇总和明细
			await this.getSummary()
			await this.getLedgerList()
		},
		sendId(id) {
			this.show = true
			this.deleteId = id

		},
		open() {

		},
		close() {
			this.show = false
		},
		// 获取当月总支出
		async getSummary() {
			try {
				const response = await api.getSummaryList({ month: `${this.selectedYear}-${this.selectedMonth}` })
				this.summary = response.data
				console.log(this.summary, '999')
			} catch (err) {
				console.log(err)
			}
		},
		// 获取记账流水
		async getLedgerList() {
			try {
				const response = await api.getLedgerList({ month: `${this.selectedYear}-${this.selectedMonth}` })
				this.ledgerList = response.data
				console.log(this.ledgerList, '999')
			} catch (err) {
				console.log(err)
			}
		},
		// 删除记账流水
		async deleteLedger(id) {
			try {
				const response = await api.deleteLedger(id)
				console.log(response, '删除')
			} catch (err) {
				console.log(err)
			}
		},
		onDateChange(value) {
			this.selectedYear = value.value[0];
			this.selectedMonth = value.value[1];
			this.showDatePicker = false;
			// 更新支出数据
			this.updateExpenseData();
		},
		updateExpenseData() {
			console.log('选择的日期:', `${this.selectedYear}-${this.selectedMonth}`);
			this.getSummary();
			this.getLedgerList()
		}
	}
};
</script>

<style scoped>
/* 整页白底 */
.page {
	width: 100%;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
		"Helvetica Neue", Arial, sans-serif;
	min-height: 100vh;
	background-color: #ffffff;
}

/* 顶部背景图 */
.background {
	position: relative;
	width: 100%;
	height: 30vh;
	background-image: url('https://www.serverzhu.com/petImg/Rectangle%209%20(2).png');
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center top;
}

.card-front {
	margin: 40rpx;
	height: 200rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

/* 返回图标位置 */
.back-icon {
	position: absolute;
	top: 8vh;
	left: 40rpx;
}

/* 顶部余额卡片，横向居中，向上偏移 */
.balance-card {
	position: absolute;
	bottom: -12%;
	/* padding: 30rpx; */
	left: 50%;
	transform: translateX(-50%);
	width: 90%;
	height: 300rpx;
	background-color: #ffc600;
	border-radius: 16px;
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

/* 中间白底板块 */
.dashboard {
	margin: 0 auto;
	margin-top: 5vh;
	padding: 16px;
	background-color: #ffffff;
	/* 纯白背景 */

}

/* 交易记录标题行 */
.transactions-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16px;
}

.transactions-header h2 {
	font-size: 18px;
	font-weight: 600;
	color: #333;
	margin: 0;
}

.transactions-header a {
	font-size: 14px;
	color: #007bff;
	text-decoration: none;
}

/* 列表重置 */
.transaction-list {
	list-style: none;
	margin: 0;
	padding: 0;
}

/* 单条交易项 */
.transaction-item {
	display: flex;
	align-items: center;
	padding: 12px;
	margin-bottom: 12px;
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.transaction-item:active {
	background-color: #ececec;
}



/* 文本详情 */
.transaction-details {
	flex: 1;
}

.transaction-details .title {
	font-size: 18px;
	font-weight: 600;
	color: #333;
	margin: 0 0 4px;
}

.transaction-details .date {
	font-size: 12px;
	color: #888;
	margin: 0;
}

/* 金额 */
.transaction-amount {
	font-size: 22px;

	white-space: nowrap;
	font-weight: 800;
}

.transaction-amount.income {
	font-size: 24px;
	color: #000;
}

.transaction-amount.expense {
	color: #dc3545;
	font-size: 15px;
	font-weight: 600;
}

::v-deep .u-icon__icon {
	border: #aaaaaa 4rpx solid;
	padding: 10rpx;
	margin: 15rpx;
	border-radius: 10rpx;
}

::v-deep .u-icon--right {
	flex-direction: column !important;
	margin: 30rpx;
}

.popup-content {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 20rpx;
}

:deep(.u-popup__content) {
	display: flex !important;
	flex-direction: row !important;
	justify-content: center !important;
	align-items: center !important;
}
</style>
