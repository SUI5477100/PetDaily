<template>
	<view class="">
		<uni-nav-bar left-icon="left" title="记录列表" @clickLeft="back" height="160rpx" />
		<view class="search-box" style="">
			<view v-for="(item, index) in searchList" :key="index" class="search-item"
				:style="{ backgroundColor: isOpen[index] ? '#fffce0' : '#fefefe' }" style="search-item"
				@click="toggleHandler(index)">
				<text class="btn-text">
					{{ item.name }}
				</text>
				<u-icon name="arrow-down" color="#818177" size="15"></u-icon>
			</view>
		</view>
		<!-- 宠物搜索弹框 -->
		<u-picker :show="showPicker" :columns="petColumns" @confirm="onPetConfirm" v-model="selectedPetId"
			@cancel="cancelPet" keyName="label">
		</u-picker>
		<!-- 记事类型搜索弹框 -->
		<u-picker :show="showType" :columns="typeColumns" @confirm="onTypeConfirm" v-model="selectedType"
			@cancel="cancelType">
		</u-picker>
		<!-- 时间搜索弹框 -->
		<u-picker :show="showData" :columns="dataColumns" @confirm="onDataConfirm" v-model="selectedData" ref="uPicker"
			@change="changeHandler" @cancel="cancelData">
		</u-picker>
		<view class="content">

			<view class="log" v-for="(item, index) in record" :key="item.id">
				<view class="log-header">
					<!-- 标签 -->
					<view class="tips" :style="{ backgroundColor: item.backgroundColor }">
						{{ item.eventType || '' }}
					</view>
					<!-- 时间 -->
					<view class="time">
						{{ item.recorded_at }}
					</view>
				</view>
				<view class="log-content">
					<view class="log-text">
						<view class="note" style="color: #8d5515;" v-html="item.eventDetails">
						</view>
						<view class="note">
							备注： {{ item.note }}
						</view>
						<view class="image-container">
							<u-album  v-if="Array.isArray(item.note_pic) && item.note_pic.length > 0" :urls="item.note_pic || []" rowCount="3"
								multipleSize="80px" class="preview-image"></u-album>
						</view>

					</view>

					<view class="pet-container">
						宠物：
						<view class="pet-pic" v-for="(petImg, index) in item.pet_pics" :key="index">
							<img :src="petImg" alt="" class="pet-image">
						</view>
					</view>
					<view class="delete-record" @click="open(item.id)">
						<uni-icons type="trash" size="25"></uni-icons>
						删除
					</view>
				</view>
			</view>
		</view>

		<!-- 弹窗展示选中的记录内容 -->
		<u-popup :show="show" :round="10" mode="bottom" @close="close" overlayOpacity="0.05" :closeable="true">
			<view class="" style="padding-bottom: 40rpx;">
				<view class="" style="font-weight: 36rpx; font-weight: 600; margin:20rpx  40rpx;">
					确认删除这条记录吗？
				</view>
				<view style="margin:0rpx  40rpx;border-radius:40rpx;padding-bottom: 20rpx;">
					<view class="log-details">
						<view class="log-header">
							<view class="tips" :style="{ backgroundColor: selectedLog.backgroundColor }">
								{{ selectedLog.eventType || '' }}
							</view>
							<view class="time">
								{{ selectedLog.recorded_at }}
							</view>
						</view>

						<view class="log-content">

							<view class="log-text">
								<view class="note" style="color: #8d5515;" v-html="selectedLog.eventDetails"></view>
								<view class="note">
									备注： {{ selectedLog.note }}
								</view>
								<view class="image-container">
									<u-album  v-if="Array.isArray(selectedLog.note_pic) && selectedLog.note_pic.length > 0"
										:urls="selectedLog.note_pic || []" rowCount="3" multipleSize="80px"
										class="preview-image"></u-album>
								</view>

							</view>

							<view class="pet-container">
								宠物：
								<view class="pet-pic" v-for="(petImg, index) in selectedLog.pet_pics" :key="index">
									<img :src="petImg" alt="" class="pet-image">
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="" style="display: flex;justify-content: center;">
					<view class="record-book" @click="deleteRecord()">
						确认删除
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import api from '../../../utils/api.js';

	export default {
		data() {
			return {
				show: false,
				showType: false,
				showPicker: false,
				showData: false,
				selectedType: '',
				selectedData: '',
				petColumns: [],
				selectedPetId: null, // 存储选中的宠物ID
				selectedPetName: null,
				record: [{
					recorded_at: '',
					event_type: '',
					note: '',
					pet_names: [],
					pet_pics: []
				}],
				selectId: '',
				isOpen: [],
				searchList: [{
						name: '宠物搜索',
					},
					{
						name: '日期搜索',
					},
					{
						name: '类型搜索',
					},
				],
				typeColumns: [
					['全部类型', '饮食', '饮水', '体重', '洗护', '尿便', '记事', '异常', '用药']
				],
				dataColumns: [
					['全部年份', '2025', '2024', '2023', '2022', '2021', '2020'],
					['全部月份'],
				],
				columnData: [
					['全部月份'],
					['全部月份', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
					['全部月份', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
					['全部月份', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
					['全部月份', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
					['全部月份', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
					['全部月份', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
				],
				selectedLog: {}, // 新增属性来存储选中的记录
				year: '',
				month: ''
			};
		},
		onReady() {
			this.getRecordList();
			this.getPet()
		},
		methods: {
			// 日期搜索确认弹框
			onDataConfirm() {
				console.log(this.year, this.month)
				this.showData = false
				if (this.month === "全部月份" || this.year === '全部年份') {
					this.selectedData = this.year
				} else if (this.year === '') {
					this.selectedData = "全部年份"
				} else {
					this.selectedData = this.year + '-' + this.month
				}
				this.searchList[1].name = this.selectedData
				this.$set(this.isOpen, 1, !this.isOpen[1]);
				this.getRecordList()
			},
			// 关闭日期搜索弹框
			cancelData() {
				this.showData = false
				this.$set(this.isOpen, 1, !this.isOpen[1]);
			},
			// 当日期搜索列数变化的时候，对应变化第二列
			changeHandler(e) {
				const {
					columnIndex,
					value,
					values, // values为当前变化列的数组内容
					index,
					picker = this.$refs.uPicker
				} = e
				console.log(e.value[0], e.value[1])
				this.year = e.value[0]
				this.month = e.value[1]
				// 当第一列值发生变化时，变化第二列(后一列)对应的选项
				if (columnIndex === 0) {
					// picker为选择器this实例，变化第二列对应的选项
					picker.setColumnValues(1, this.columnData[index])
				}
			},
			// 记录类似搜索
			onTypeConfirm(e) {
				this.selectedType = e.value[0]
				this.searchList[2].name = this.selectedType
				console.log(e.value[0], e)
				this.showType = false
				this.$set(this.isOpen, 2, !this.isOpen[2]);
				this.getRecordList()
			},
			// 关闭记录类型搜索弹框
			cancelType() {
				this.showType = false
				this.$set(this.isOpen, 2, !this.isOpen[2]);
			},
			// 宠物搜索
			onPetConfirm(e) {
				// 获取选中项的索引
				const [selectedIndex] = e.indexs
				console.log(selectedIndex)
				const selectedPet = this.petColumns[0][selectedIndex]
				this.selectedPetId = selectedPet.value
				this.selectedPetName = selectedPet.label
				console.log('最终选中的宠物ID:', this.selectedPetId, this.selectedPetName)
				// 关闭搜索弹框
				this.showPicker = false
				// 修改搜索框的背景颜色
				this.$set(this.isOpen, 0, !this.isOpen[0]);
				// 将宠物名回显在搜索框
				this.searchList[0].name = this.selectedPetName
				this.getRecordList()
			},
			// 关闭宠物搜索弹框
			cancelPet() {
				this.showPicker = false
				this.$set(this.isOpen, 0, !this.isOpen[0]);
			},
			// 选中对应的搜索框切换背景颜色
			toggleHandler(index) {
				// 切换对应项的背景颜色
				this.$set(this.isOpen, index, !this.isOpen[index]);
				console.log(index)
				// 打开宠物搜索弹框
				if (index === 0) {
					this.showPicker = !this.showPicker
				} else if (index === 1) {
					this.showData = !this.showData
				} else if (index === 2) {
					this.showType = !this.showType
				}
			},
			// 打开删除弹框
			open(id) {
				this.show = true;
				this.selectId = id;
				console.log(id)
				// 查找选中的记录并保存到 selectedLog
				const selectedRecord = this.record.find(item => item.id === id);
				this.selectedLog = selectedRecord || {}; 
			},
			// 删除记录
			deleteRecord() {
				console.log(this.selectId, '777777')
				this.deleteRecordList(this.selectId)
				this.show = false;
				// this.selectId = '';
				this.getRecordList()
			},
			// 关闭删除弹框
			close() {
				this.show = false;
				this.selectId = '';
				this.getRecordList();
			},
			// 删除接口
			async deleteRecordList(id) {
				// console.log(id, '000000')
				try {
					const response = await api.deleteRecord(id)
				} catch (err) {
					console.log(err)
				}
			},
			//获取宠物信息
			async getPet() {
				try {
					const response = await api.getPet();
					// 直接处理 petColumns 数据，添加“全部”选项
					this.petColumns = [
						[{
								label: "全部宠物",
								value: null
							},
							...response.data.map(pet => ({
								label: pet.name,
								value: pet.id
							}))
						]
					];
					console.log(this.petColumns);
				} catch (err) {
					console.log(err);
				}
			},
			// 获取/搜索记录事项
			async getRecordList() {
				console.log(this.selectedPetId, this.selectedType, this.year, this.month);
				try {
					const response = await api.getRecord({
						pet_id: this.selectedPetId,
						event_type: this.selectedType,
						year: this.year,
						month: this.month
					});
					console.log(response.data);

					this.record = response.data.map(item => {
						let eventType = {};
						try {
							eventType = JSON.parse(item.event_type); // 解析 event_type 字符串
						} catch (e) {
							console.error("event_type 解析失败", e);
						}

						let eventDetails = '';
						// 使用 switch case 来处理不同的 eventType.type
						switch (eventType.type) {
							case '饮食':
								eventDetails =
									`食物类型: ${eventType.foodType}<br>进食量: ${eventType.foodAmount}<br>`;
								break;
							case '饮水':
								eventDetails = `饮水量: ${eventType.drinkAmount}`;
								break;
							case '体重':
								eventDetails = `体重: ${eventType.weightAmount}`;
								break;
							case '洗护':
								eventDetails = `洗护类型: ${eventType.cleansingType}`;
								break;
							case '尿便':
								eventDetails =
									`排泄类型: ${eventType.stoolType}<br>排泄频率: ${eventType.stoolFrequency}<br>排泄量: ${eventType.stoolAmount}<br>尿便状态: ${eventType.stoolStatus}<br>尿便颜色: ${eventType.stoolColor}<br>尿便异常: ${eventType.stoolUnusual}<br>`;
								break;
							case '记事':
								eventDetails = `记录类型: ${eventType.notesType}`;
								break;
							case '异常':
								eventDetails =
									`异常类型: ${eventType.abnormalType}<br>异常细节: ${eventType.abnormalDetail}<br>`;
								break;
							case '用药':
								eventDetails =
									`用药类型: ${eventType.medicationType},${eventType.medicationDetail}<br>给药方式: ${eventType.medicationMethod}<br>药物用量: ${eventType.medicationAmount}<br>`;
								break;
							default:
								eventDetails = '未知事件';
								break;
						}

						return {
							...item,
							eventType: eventType.type || '默认类型',
							backgroundColor: eventType.color || '#4f6df9',
							eventDetails: eventDetails
						};
					});
				} catch (err) {
					console.log(err);
				}
			},
			back() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			}
		}
	};
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

	.image-container {
		display: flex;
		flex-wrap: wrap;
		gap: 20rpx;
		margin-bottom: 30rpx;
		justify-content: flex-start;
	}

	.preview-image {
		flex: 0 0 calc(33.33% - 14rpx);
		width: calc(33.33% - 14rpx);
		height: 180rpx;
		border-radius: 8rpx;
		box-sizing: border-box;
	}

	.pet-container {
		width: 85%;
		border-radius: 40rpx;
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


	.delete-record {
		width: 85%;
		padding: 0rpx 0rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.record-book {
		width: 80%;
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

	/* 文字样式 */
	.btn-text {
		font-size: 28rpx;
		color: #818177;
		display: flex;
		align-items: center;
	}

	.search-box {
		height: 120rpx;
		background-color: #ffe78f;
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.search-item {
		width: 30%;
		height: 70rpx;
		border-radius: 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-evenly
	}
</style>
