<template>
	<view class="border-box">
		<!-- 记事类型 -->
		<view class="select-box" @click="show1 = true">
			<view class="select-title">
				记事类型
			</view>
			<view class="m40">
				<view class="m30">{{ selectedValue.notesType }}</view>
				<view> > </view>
			</view>
		</view>


		<!-- 记事类型弹框 -->
		<u-picker :show="show1" :columns="columns" v-model="selectedValue.notesType" @cancel="show1=false"
			@confirm="onPickerChangeCommon"></u-picker>

	</view>
</template>


<script>
	export default {
		data() {
			return {
				show1: false,
				columns: [
					['随手记','生日', '绝育', '发情', '相遇', '生病', '怀孕', '生产', '搬家', '手术', '训练', ]
				],
				selectedValue: {
					type:'记事',
					color:'#ff5722',
					notesType: '', // 存储记事类型
				}
			};
		},
		watch: {

		},
		methods: {
			// 合并后的 picker 变化处理函数
			onPickerChangeCommon(value) {
				this.selectedValue.notesType = value.value[0];
				this.show1 = false;
				this.$emit('update:selectedValue', this.selectedValue);
				console.log(value.value);
			},
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