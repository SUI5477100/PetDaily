<template>
	<view class="charts-box">
		<uni-nav-bar left-icon="left" title="查看详情" @clickLeft="back" height="160rpx" />
		<view class="" style="display: flex; height: 40vh; justify-content: center; align-items: center;">
			<qiun-data-charts v-if="hasData" type="pie" :opts="opts" :chartData="chartData" />
			<view v-else class="empty-state">
				<text>暂无支出数据</text>
			</view>
		</view>

		<!-- 添加列表部分 -->
		<view class="dashboard">
			<view class="transactions">
				<view class="transactions-header">
					<h2>{{selectedMonth}} 支出明细</h2>
				</view>
				<ul v-if="hasData" class="transaction-list">
					<li class="transaction-item" v-for="(item, index) in chartData.series[0].data" :key="index">
						<view class="transaction-details">
							<view class="" style="display: flex; justify-content: space-between;">
								<p class="title">{{ item.name }}</p>
								<view class="transaction-amount expense">-${{ item.value }}</view>
							</view>
							<view class="" style="color: #d08b00;margin: 0 0 4px;">
								占比：{{ ((item.value / totalValue) * 100).toFixed(1) }}%
							</view>
						</view>
					</li>
				</ul>
				<view v-else class="empty-list">
					<text>暂无支出记录</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import api from '../../utils/api.js'
export default {
	data() {
		return {
			chartData: {},
			totalValue: 0,
			selectedMonth: '',
			hasData: false,
			//您可以通过修改 config-ucharts.js 文件中下标为 ['pie'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
			opts: {
				color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
					"#ea7ccc"
				],
				// padding: [5, 5, 5, 5],
				enableScroll: false,
				extra: {
					pie: {
						activeOpacity: 0.5,
						activeRadius: 10,
						offsetAngle: 0,
						labelWidth: 15,
						border: false,
						borderWidth: 3,
						borderColor: "#FFFFFF"
					}
				}
			}
		};
	},
	onLoad(options) {
		if (options.month) {
			this.selectedMonth = options.month;
		}
	},
	onReady() {
		this.getServerData();
	},
	methods: {
		back() {
			uni.redirectTo({
				url: '/pages/ledger/ledger'
			});
		},

		async getServerData() {
			try {
				const response = await api.getUcharts({ month: this.selectedMonth })
				console.log(response.data)
				this.chartData = JSON.parse(JSON.stringify(response.data));
				// 检查是否有数据
				this.hasData = this.chartData.series[0].data && this.chartData.series[0].data.length > 0;
				if (this.hasData) {
					// 计算总值
					this.totalValue = this.chartData.series[0].data.reduce((sum, item) => sum + item.value, 0);
				}
			} catch (err) {
				console.log(err)
				this.hasData = false;
			}
			// //模拟从服务器获取数据时的延时
			// setTimeout(() => {
			//   //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
			//   let res = {
			//       series: [
			//         {
			//           data: [{"name":"一班","value":50},{"name":"二班","value":30},{"name":"三班","value":20},{"name":"四班","value":18},{"name":"五班","value":8}]
			//         }
			//       ]
			//     };
			// }, 500);
		},
	}
};
</script>

<style scoped>
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
	width: 100%;
	min-height: 100vh;
	/* background-color: #ffffff; */
}

.empty-state {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	color: #999;
	font-size: 16px;
}

.empty-list {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 40px 0;
	color: #999;
	font-size: 14px;
}

/* 列表样式 */
.dashboard {
	margin: 0 auto;
	padding: 16px;
	/* background-color: #ffffff; */
}

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

.transaction-list {
	list-style: none;
	margin: 0;
	padding: 0;
}

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

.transaction-details {
	flex: 1;
}

.transaction-details .title {
	font-size: 18px;
	font-weight: 600;
	color: #333;
	margin: 0 0 4px;
}

.transaction-amount {
	font-size: 22px;
	white-space: nowrap;
	font-weight: 800;
}

.transaction-amount.expense {
	color: #dc3545;
	font-size: 15px;
	font-weight: 600;
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
	border-bottom-color: #fffce0 !important;
}

/deep/.uni-navbar__header {
	background-color: #fffce0 !important;
}
</style>
