<template>
	<view class="border-box">
		<!-- 食物类型 -->
		<view class="select-box" @click="show1 = true">
			<view class="select-title">
				食物类型
			</view>
			<view class="m40">
				<view class="m30">{{ selectedValue.foodType }}</view>
				<view> > </view>
			</view>
		</view>

		<!-- 分割线 -->
		<view class="line"></view>

		<!-- 进食量 -->
		<view class="select-box" @click="show2= true">
			<view class="select-title">
				进食量
			</view>
			<view class="m40 w230">
				<view style="margin: 0rpx 20rpx;">
					<input class="text-center" @input="updateFoodAmount" @click.stop v-model="inputValue"></input>
				</view>
				<view style="margin-right: 20rpx;"> {{foodUnit}}</view>
				<view> > </view>
			</view>
		</view>

		<!-- 食物类型弹框 -->
		<u-picker :show="show1" :columns="columns" v-model="selectedValue.foodType" @cancel="show1=false"
			@confirm="(value) => onPickerChangeCommon(value, 'foodType')"></u-picker>

		<!-- 食物计量单位弹框 -->
		<u-picker :show="show2" :columns="columnsType" v-model="foodUnit" @cancel="show2=false"
			@confirm="(value) => onPickerChangeCommon(value, 'foodUnit')"></u-picker>

	</view>
</template>


<script>
	export default {
		data() {
			return {
				show1: false,
				show2: false,
				columns: [
					['干粮', '罐头', '生食', '零食', '自制', '营养品']
				],
				columnsType: [
					['g', 'kg', 'mg', 'ml', '勺', '杯', '罐', '碗', '袋', '条', '片', '颗', '粒']
				],
				inputValue: '',
				foodUnit: 'g', // 存储进食量单位
				selectedValue: {
					foodType: '', // 存储食物类型
					foodAmount: '' // 存储计算后的食物量
				}
			};
		},
		watch: {
			// 监听 inputValue 或 foodUnit 变化时计算并更新 foodAmount
			inputValue() {
				this.updateFoodAmount();
			},
			foodUnit() {
				this.updateFoodAmount();
			}
		},
		methods: {
			// 合并后的 picker 变化处理函数
			onPickerChangeCommon(value, type) {
				if (type === 'foodType') {
					// 如果是食物类型变化
					this.selectedValue.foodType = value.value[0];
				} else if (type === 'foodUnit') {
					// 如果是食物单位变化
					this.foodUnit = value.value[0];
				}

				// 关闭弹框
				if (type === 'foodType') {
					this.show1 = false;
				} else if (type === 'foodUnit') {
					this.show2 = false;
				}

				// 打印选择的值
				console.log(value.value);

				// 计算并更新食物量
				this.updateFoodAmount();
			},

			// 更新食物量
			updateFoodAmount() {
				const foodAmount = `${this.inputValue}${this.foodUnit}`;
				this.selectedValue.foodAmount = foodAmount;
				// 向父组件传递更新后的 selectedValue
				this.$emit('update:selectedValue', this.selectedValue);
			}
		}

	};
</script>

<style lang="less" scoped>
	.border-box {
		background-color: #fff;
		height: 15vh;
		border-radius: 30rpx;
		border: 4rpx solid #000;
	}

	.select-box {
		flex: 1;
		height: 50%;
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