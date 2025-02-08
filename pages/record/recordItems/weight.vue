<template>
	<view class="border-box">

		<!-- 进食量 -->
		<view class="select-box" @click="show2= true">
			<view class="select-title">
				体重
			</view>
			<view class="m40 w230">
				<view style="margin: 0rpx 20rpx;">
					<input class="text-center" @input="updateweightAmount" @click.stop v-model="inputValue"></input>
				</view>
				<view style="margin-right: 20rpx;"> {{weightUnit}}</view>
				<view> > </view>
			</view>
		</view>

		<!-- 食物计量单位弹框 -->
		<u-picker :show="show2" :columns="columnsType" v-model="weightUnit" @cancel="show2=false"
			@confirm="onPickerChangeCommon"></u-picker>

	</view>
</template>


<script>
	export default {
		data() {
			return {
				show2: false,
				columnsType: [
					['kg', 'g']
				],
				inputValue: '',
				weightUnit: 'kg', // 存储进食量单位
				selectedValue: {
					type:'体重',
					color:'#fbc02d',
					weightAmount: '' // 存储计算后的食物量
				}
			};
		},
		watch: {
			// 监听 inputValue 或 weightUnit 变化时计算并更新 weightAmount
			inputValue() {
				this.updateweightAmount();
			},
			weightUnit() {
				this.updateweightAmount();
			}
		},
		methods: {
			// 合并后的 picker 变化处理函数
			onPickerChangeCommon(value) {
				this.weightUnit = value.value[0];
				this.show2 = false;

				// 打印选择的值
				console.log(value.value);

				// 计算并更新食物量
				this.updateweightAmount();
			},

			// 更新食物量
			updateweightAmount() {
				const weightAmount = `${this.inputValue}${this.weightUnit}`;
				this.selectedValue.weightAmount = weightAmount;
				console.log(weightAmount)
				// 向父组件传递更新后的 selectedValue
				this.$emit('update:selectedValue', this.selectedValue);
			}
		}

	};
</script>

<style lang="less" scoped>
	.border-box {
		background-color: #fff;
		// height: 15vh;
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