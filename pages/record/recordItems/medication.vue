<template>
	<view class="border-box">
		<!-- 类型 -->
		<view class="select-box" @click="show1 = true">
			<view class="select-title">
				用药类型
			</view>
			<view class="m40">
				<!-- <view class="m10">{{ selectedValue.medicationType[0] }}</view> -->
				<view class="m30">{{ selectedValue.medicationDetail }}</view>
				<view> > </view>
			</view>
		</view>
		<view class="line"></view>

		<view class="select-box" @click="show2 = true">
			<view class="select-title">
				给药方式
			</view>
			<view class="m40">
				<view class="m30">{{ selectedValue.medicationMethod }}</view>
				<view> > </view>
			</view>
		</view>
		<view class="line"></view>


		<view class="select-box" @click="show3= true">
			<view class="select-title">
				药物用量
			</view>
			<view class="m40 w230">
				<view style="margin: 0rpx 20rpx;">
					<input class="text-center" @input="updatemedicationAmount" @click.stop v-model="inputValue"></input>
				</view>
				<view style="margin-right: 20rpx;"> {{medicationUnit}}</view>
				<view> > </view>
			</view>
		</view>


		<u-picker :show="show1" ref="uPicker" :columns="columns" @confirm="confirm" @cancel="show1=false"
			@change="changeHandler"></u-picker>
		<u-picker :show="show2" :columns="columnsMethod" v-model="medicationMethod" @cancel="show2=false"
			@confirm="(value) => onPickerChangeCommon(value, 'medicationMethod')"></u-picker>
		<u-picker :show="show3" :columns="columnsType" v-model="medicationUnit" @cancel="show3=false"
			@confirm="(value) => onPickerChangeCommon(value, 'medicationUnit')"></u-picker>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				show1: false,
				show2: false,
				show3: false,
				columns: [
					['驱虫', '治疗性药物', '缓解症状药物', '消化系统用药', '内分泌和代谢类药物', '心血管系统用药', '抗过敏药物', '外用药物', '神经系统药物'],
					['体内驱虫', '体外驱虫', '内外同驱'],

				],
				columnData: [
					['体内驱虫', '体外驱虫', '内外同驱'],
					['抗生素', '抗真菌药', '抗病毒药'],
					['止痛药', '抗炎药', '退烧药', '止咳药'],
					['胃肠保护剂', '益生菌'],
					['胰岛素', '甲状腺激素', '肾上腺皮质激素'],
					['利尿剂', '心脏药物', '抗凝血药物'],
					['抗组胺药', '皮质类固醇'],
					['抗菌药膏', '抗真菌药膏', '止痒药膏'],
					['抗焦虑药', '镇静药'],
				],
				columnsMethod: [
					['口服给药', '外用给药', '皮下注射', '肌肉注射', '静脉注射', '注射疫苗', '局部给药', '鼻腔给药', '局部贴剂', '食物药物']
				],
				columnsType: [
					['g', 'mg', 'μg', 'ml', 'U', 'g/kg', 'mg/kg', '片/颗/粒', '次', '袋', '滴', '胶囊']
				],
				inputValue: '',
				medicationUnit: 'g',
				selectedValue: {
					medicationType: '',
					medicationDetail: '',
					medicationMethod: '',
					medicationAmount: ''
				}
			};
		},
		watch: {
			// 监听 inputValue 或 medicationUnit 变化时计算并更新 medicationAmount
			inputValue() {
				this.updatemedicationAmount();
			},
			medicationUnit() {
				this.updatemedicationAmount();
			}
		},
		methods: {
			changeHandler(e) {
				const {
					columnIndex,
					value,
					values, // values为当前变化列的数组内容
					index,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.uPicker
				} = e
				console.log(columnIndex, value, values, index)
				// 当第一列值发生变化时，变化第二列(后一列)对应的选项
				if (columnIndex === 0) {
					// picker为选择器this实例，变化第二列对应的选项
					picker.setColumnValues(1, this.columnData[index])
				}
			},
			// 回调参数为包含columnIndex、value、values
			confirm(e) {
				console.log('confirm', e.value)
				this.selectedValue.medicationType = e.value[0]
				this.selectedValue.medicationDetail = e.value[1]
				this.show1 = false
				this.$emit('update:selectedValue', this.selectedValue);
			},

			// 更新排泄量
			onPickerChangeCommon(value, type) {
				if (type === 'medicationMethod') {
					this.selectedValue.medicationMethod = value.value[0];
				} else if (type === 'medicationUnit') {
					this.medicationUnit = value.value[0];
				}


				// 关闭弹框
				if (type === 'medicationMethod') {
					this.show2 = false;
				} else if (type === 'medicationUnit') {
					this.show3 = false;
				}

				// 打印选择的值
				console.log(value.value);

				this.updatemedicationAmount();
			},
			// 更新药物用量
			updatemedicationAmount() {
				const medicationAmount = `${this.inputValue}${this.medicationUnit}`;
				this.selectedValue.medicationAmount = medicationAmount;
				// 向父组件传递更新后的 selectedValue
				this.$emit('update:selectedValue', this.selectedValue);
			}
		}

	};
</script>

<style lang="less" scoped>
	.border-box {
		background-color: #fff;
		height: 23vh;
		border-radius: 30rpx;
		border: 4rpx solid #000;
	}

	.select-box {
		flex: 1;
		height: 33%;
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
		margin-right: 30rpx;
	}

	.m10 {
		margin: 0 10rpx;
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