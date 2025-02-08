<template>
	<view class="">
		<uni-nav-bar left-icon="left" title="记录" @clickLeft="back" height="160rpx" />
		<view class="content">
			<view class="select">
				<!-- 选择宠物 -->
				<view class="select-box" @click="toggle('bottom')">
					<view class="select-title">
						记录宠物
					</view>
					<view class="m40">
						<view class="m30">
							{{ selectedPetNames.join(', ') }} <!-- 显示宠物名称 -->
						</view>
						<view> > </view>
					</view>
				</view>
				<!-- 分割线 -->
				<view class="line"></view>
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

			<!-- 饮食 -->
			<diet v-show="pageType==='diet'" class="w90" @update:selectedValue="handleSelectedValue"></diet>
			<!-- 喝水 -->
			<drink v-show="pageType==='drink'" class="w90" @update:selectedValue="handleSelectedValue"></drink>
			<!-- 体重 -->
			<weight v-show="pageType==='weight'" class="w90" @update:selectedValue="handleSelectedValue"></weight>
			<!-- 洗护 -->
			<cleansing v-show="pageType==='cleansing'" class="w90" @update:selectedValue="handleSelectedValue">
			</cleansing>
			<!-- 尿便 -->
			<stool v-show="pageType==='stool'" class="w90" @update:selectedValue="handleSelectedValue"></stool>
			<!-- 记事 -->
			<notes v-show="pageType==='notes'" class="w90" @update:selectedValue="handleSelectedValue"></notes>
			<!-- 异常 -->
			<abnormal v-show="pageType==='abnormal'" class="w90" @update:selectedValue="handleSelectedValue"></abnormal>
			<!-- 用药 -->
			<medication v-show="pageType==='medication'" class="w90" @update:selectedValue="handleSelectedValue">
			</medication>

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

			<!-- 选择宠物弹窗 -->
			<uni-popup ref="popup" background-color="#fff" @change="change">
				<view class="select-pet">
					选择宠物
				</view>
				<view class="uni-list">
					<checkbox-group @change="checkboxChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in items" :key="item.id">
							<checkbox color="#FFCC33" :value="item.id" />
							<img :src="item.pet_pic" class="pet-img" />
							<view>{{ item.name }}</view>
						</label>
					</checkbox-group>
				</view>
				<view class="saveBtn" @click="closeSelectPet">
					保存
				</view>
			</uni-popup>

			<!-- 时间选择弹框 -->
			<u-datetime-picker :show="show" v-model="valueTime" mode="datetime" @confirm="confirmBtn"
				@cancel="closeBtn">
			</u-datetime-picker>
		</view>
	</view>
</template>
<script>
	import api from '../../../utils/api.js';
	import diet from './diet.vue'
	import drink from './drink.vue'
	import weight from './weight.vue'
	import cleansing from './cleansing'
	import stool from './stool'
	import notes from './notes'
	import abnormal from './abnormal'
	import medication from './medication'

	export default {
		components: {
			diet,
			drink,
			weight,
			cleansing,
			stool,
			notes,
			abnormal,
			medication
		},
		data() {
			return {
				show: false,
				selectPet: [], // 存储选中的宠物 ID
				selectedPetNames: [], // 存储选中的宠物名称
				inputValue: '',
				updatedValue: {},
				valueTime: Number(new Date()),
				items: [{
					id: '',
					name: '',
					pet_pic: '',
				}],
				pageType: ''
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
		onReady() {
			this.getPetList()
		},
		onLoad(options) {
			this.pageType = options.type;
			console.log("Received type ", this.pageType);
		},
		methods: {
			// 打开选择宠物弹框
			toggle(type) {
				this.type = type
				this.$refs.popup.open(type)
			},
			// 关闭选择宠物弹框
			closeSelectPet() {
				this.$refs.popup.close()
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
				console.log(this.selectPet)
			},
			// 选择宠物操作
			checkboxChange(e) {
				var items = this.items,
					values = e.detail.value;
				this.selectPet = values;

				// 显示选中的宠物名字
				const selectedPets = items.filter(item => values.includes(item.id.toString()));
				this.selectedPetNames = selectedPets.map(item => item.name); // 获取宠物名称

				console.log(this.selectedPetNames); // 这里会是选中的宠物名称
			},
			// 关闭时间弹框
			confirmBtn() {
				this.show = false
			},
			closeBtn() {
				this.show = false
			},
			handleSelectedValue(updatedValue) {
				console.log(updatedValue, '0000000000000'); // 这里可以接收到传递过来的 selectedValue
				this.updatedValue = updatedValue
			},
			// 返回页面
			back() {
				uni.switchTab({
					url: '/pages/record/record'
				});
			},
			// 添加记录
			async saveRecord() {
				console.log(this.inputValue, this.selectPet,
					this.updatedValue, this.formattedTime)
				try {
					const response = await api.addRecord({
						pet_id: this.selectPet,
						event_type: this.updatedValue,
						note: this.inputValue,
						recorded_at: this.formattedTime
					})
				} catch (err) {
					console.log(err)
				}
			},
			// 获取宠物列表
			async getPetList() {
				try {
					const response = await api.getPet()
					console.log(response)
					this.items = response.data
				} catch (err) {
					console.log(err)
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	// * {
	// 	background-color: #fffce0;
	// }

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
		height: 16vh;
		background-color: #fff;
		border: 4rpx solid #000;
		border-radius: 40rpx;
	}

	.select-box {
		flex: 1;
		height: 50%;
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
		margin: 40rpx;
	}

	.m30 {
		margin: 0 30rpx;
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

	.w90 {
		width: 90%;
		margin-top: 30rpx;
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
