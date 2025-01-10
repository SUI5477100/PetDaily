<template>
	<view class="border-box">
		<!-- 排泄类型 -->
		<view class="select-box" @click="show1 = true">
			<view class="select-title">
				排泄类型
			</view>
			<view class="m40">
				<view class="m30">{{ selectedValue.stoolType }}</view>
				<view> > </view>
			</view>
		</view>
		<!-- 分割线 -->
		<view class="line"></view>

		<!-- 排泄量 -->
		<view class="select-box" @click="show2= true">
			<view class="select-title">
				排泄频率
			</view>
			<view class="m40 w230">
				<view style="margin: 0rpx 20rpx;">
					<input class="text-center" @input="updatestoolFrequency" @click.stop v-model="inputValue"></input>
				</view>
				<view style="margin-right: 20rpx;"> {{stoolUnit}}</view>
				<view> > </view>
			</view>
		</view>
		<!-- 分割线 -->
		<view class="line"></view>

		<!-- 排泄量-->
		<view class="select-box" @click="show3 = true">
			<view class="select-title">
				排泄量
			</view>
			<view class="m40">
				<view class="m30">{{ selectedValue.stoolAmount }}</view>
				<view> > </view>
			</view>
		</view>
		<!-- 分割线 -->
		<view class="line"></view>

		<!-- 排泄状态 -->
		<view class="select-box" @click="show4 = true">
			<view class="select-title">
				尿便状态
			</view>
			<view class="m40">
				<view class="m30">{{ selectedValue.stoolStatus }}</view>
				<view> > </view>
			</view>
		</view>
		<!-- 分割线 -->
		<view class="line"></view>

		<!-- 排泄颜色 -->
		<view class="select-box" @click="show5 = true">
			<view class="select-title">
				尿便颜色
			</view>
			<view class="m40">
				<view class="m30">{{ selectedValue.stoolColor }}</view>
				<view> > </view>
			</view>
		</view>
		<!-- 分割线 -->
		<view class="line"></view>

		<!-- 排泄颜色 -->
		<view class="select-box" @click="show6 = true">
			<view class="select-title">
				尿便异常
			</view>
			<view class="m40">
				<view class="m30">{{ selectedValue.stoolUnusual }}</view>
				<view> > </view>
			</view>
		</view>

		<!-- 排泄类型弹框 -->
		<u-picker :show="show1" :columns="columns" v-model="selectedValue.stoolType" @cancel="show1=false"
			@confirm="(value) => onPickerChangeCommon(value, 'stoolType')"></u-picker>
		<!-- 排泄计量单位弹框 -->
		<u-picker :show="show2" :columns="columnsType" v-model="stoolUnit" @cancel="show2=false"
			@confirm="(value) => onPickerChangeCommon(value, 'stoolUnit')"></u-picker>
		<!-- 排泄量弹框 -->
		<u-picker :show="show3" :columns="columnsAmount" v-model="selectedValue.stoolAmount" @cancel="show3=false"
			@confirm="(value) => onPickerChangeCommon(value, 'stoolAmount')"></u-picker>
		<!-- 排泄状态 -->
		<u-picker :show="show4" :columns="columnsStatus" v-model="selectedValue.stoolStatus" @cancel="show4=false"
			@confirm="(value) => onPickerChangeCommon(value, 'stoolStatus')"></u-picker>
		<!-- 排泄颜色 -->
		<u-picker :show="show5" :columns="columnsColor" v-model="selectedValue.stoolColor" @cancel="show5=false"
			@confirm="(value) => onPickerChangeCommon(value, 'stoolColor')"></u-picker>
		<!-- 排泄异常 -->
		<u-picker :show="show6" :columns="columnsUnusual" v-model="selectedValue.stoolUnusual" @cancel="show6=false"
			@confirm="(value) => onPickerChangeCommon(value, 'stoolUnusual')"></u-picker>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				show1: false,
				show2: false,
				show3: false,
				show4: false,
				show5: false,
				show6: false,
				columns: [
					['排尿', '排便', '尿便混合']
				],
				columnsType: [
					['次/天', '次/周', '小时/次']
				],
				columnsAmount: [
					['正常', '较少', '较多']
				],
				columnsStatus: [
					['正常', '干硬', '松软', '稀便', '泥状便', '清澈', '絮状', '云雾状']
				],
				columnsColor: [
					['正常', '淡黄色', '深黄色', '淡红色', '绿色', '黑色', '灰色']
				],
				columnsUnusual: [
					['气味异常', '频率异常', '颜色异常', '状态异常', '排泄困难', '含异常物质']
				],
				inputValue: '',
				stoolUnit: '次/天', // 存储排泄量单位
				selectedValue: {
					stoolType: '', // 存储排泄类型
					stoolFrequency: '', // 存储计算后的排泄频率
					stoolAmount: '正常',
					stoolStatus: '正常',
					stoolColor: '正常',
					stoolUnusual: ''
				}
			};
		},
		watch: {
			// 监听 inputValue 或 stoolUnit 变化时计算并更新 stoolFrequency
			inputValue() {
				this.updatestoolFrequency();
			},
			stoolUnit() {
				this.updatestoolFrequency();
			}
		},
		methods: {
			onPickerChangeCommon(value, type) {
				// 定义一个映射对象
				const fieldMap = {
					stoolType: 'stoolType',
					stoolUnit: 'stoolUnit',
					stoolAmount: 'stoolAmount',
					stoolStatus: 'stoolStatus',
					stoolColor: 'stoolColor',
					stoolUnusual: 'stoolUnusual',
				};
				console.log(fieldMap[type], '999999')
				// 更新选中的值
				if (fieldMap[type]) {
					this.selectedValue[fieldMap[type]] = value.value[0];
				}

				// 关闭弹框
				this[`show${Object.keys(fieldMap).indexOf(type) + 1}`] = false;

				// 打印选择的值
				console.log(value.value);

				// 计算并更新排泄量
				this.updatestoolFrequency();
			},

			// // 合并后的 picker 变化处理函数
			// onPickerChangeCommon(value, type) {
			// 	if (type === 'stoolType') {
			// 		// 如果是排泄类型变化
			// 		this.selectedValue.stoolType = value.value[0];
			// 	} else if (type === 'stoolUnit') {
			// 		// 如果是排泄单位变化
			// 		this.stoolUnit = value.value[0];
			// 	} else if (type === 'stoolAmount') {
			// 		this.selectedValue.stoolAmount = value.value[0]
			// 	} else if (type === 'stoolStatus') {
			// 		this.selectedValue.stoolStatus = value.value[0]
			// 	} else if (type === 'stoolColor') {
			// 		this.selectedValue.stoolColor = value.value[0]
			// 	}else if (type === 'stoolUnusual') {
			// 		this.selectedValue.stoolUnusual = value.value[0]
			// 	}

			// 	// 关闭弹框
			// 	if (type === 'stoolType') {
			// 		this.show1 = false;
			// 	} else if (type === 'stoolUnit') {
			// 		this.show2 = false;
			// 	} else if (type === 'stoolAmount') {
			// 		this.show3 = false;
			// 	} else if (type === 'stoolStatus') {
			// 		this.show4 = false;
			// 	} else if (type === 'stoolColor') {
			// 		this.show5 = false;
			// 	}else if (type === 'stoolUnusual') {
			// 		this.show6 = false;
			// 	}

			// 	// 打印选择的值
			// 	console.log(value.value);

			// 	// 计算并更新排泄量
			// 	this.updatestoolFrequency();
			// },

			// 更新排泄量
			updatestoolFrequency() {
				const stoolFrequency = `${this.inputValue}${this.stoolUnit}`;
				this.selectedValue.stoolFrequency = stoolFrequency;
				// 向父组件传递更新后的 selectedValue
				this.$emit('update:selectedValue', this.selectedValue);
			}
		}

	};
</script>

<style lang="less" scoped>
	.border-box {
		background-color: #fff;
		height: 45vh;
		border-radius: 30rpx;
		border: 4rpx solid #000;
	}

	.select-box {
		flex: 1;
		height: 16.5%;
		border-radius: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.line {
		border-bottom: 2rpx solid #dcdfe6;
		flex: 1;
		width: 90%;
		margin: auto;
	}

	.select-title {
		margin: 30rpx;
		font-size: 34rpx;
		font-weight: 600;
	}

	.m40 {
		display: flex;
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

	.w230 {
		// width: 230rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>