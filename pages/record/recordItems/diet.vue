<template>
	<view class="border-box">
		<!-- 食物类型 -->
		<view class="select-box" @click="show = true">
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
		<view class="select-box" @click="show = true">
			<view class="select-title">
				进食量
			</view>
			<view class="m40">
				<view class="m30">{{ selectedValue.foodAmount }}</view>
				<view> > </view>
			</view>
		</view>

		<!-- 食物类型弹框 -->
		<u-picker :show="show" :columns="columns" v-model="selectedValue" @confirm="onPickerChange"></u-picker>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				columns: [
					['干粮', '罐头', '生食', '零食', '自制', '营养品']
				],
				selectedValue: {
					foodType: '', // 存储食物类型
					foodAmount: '' // 存储进食量
				}
			}
		},
		methods: {
			// 处理选择变化的函数
			onPickerChange(value) {
				// 假设选择的是食物类型，可以根据不同的列名进行处理
				this.selectedValue.foodType = value.value; // 示例，设置食物类型
				this.show = false
				console.log(value.value)
			}
		}
	}
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
</style>