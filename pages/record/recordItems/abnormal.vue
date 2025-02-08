<template>
	<view class="border-box">
		<!-- 记事类型 -->
		<view class="select-box" @click="show = true">
			<view class="select-title">
				异常类型
			</view>
			<view class="m40">
				<!-- <view class="m10">{{ selectedValue.abnormalType[0] }}</view> -->
				<view class="m30">{{ selectedValue.abnormalDetail }}</view>
				<view> > </view>
			</view>
		</view>


		<u-picker :show="show" ref="uPicker" :columns="columns" @confirm="confirm"  @cancel="show=false" @change="changeHandler"></u-picker>

	</view>
</template>


<script>
	export default {
		data() {
			return {
				show: false,
				columns: [
					['体重异常', '皮肤异常', '呼吸异常', '消化异常', '尿便异常', '骨骼异常', '口腔异常', '眼睛异常', '耳朵异常', '精神异常'],
					['增重过速', '减重过速', '食欲不振', '过度进食'],

				],
				columnData: [
					['增重过速', '减重过速', '食欲不振', '过度进食'],
					['皮肤发炎', '脱毛、斑秃', '瘙痒、抓挠', '皮肤感染'],
					['咳嗽', '呼吸困难', '喘息异常'],
					['呕吐', '腹泻', '便秘', '口臭'],
					['血尿', '频繁排泄', '排泄困难', '尿便异味'],
					['骨折', '步态异常', '关节疼痛', '关节肿胀、变形'],
					['口炎', '牙结石', '牙龈出血', '口腔溃疡'],
					['流泪过多', '眼屎增多', '眼睛突出', '眼睛干涩', '眼睛发红、肿胀'],
					['耳朵异味', '耳朵发炎', '分泌物增多', '抓耳频繁'],
					['昏迷', '嗜睡', '焦虑', '害怕', '攻击性', '反应迟钝', '过度兴奋']
				],
				selectedValue: {
					type:'异常',
					color:'#d32f2f',
					abnormalType: '',
					abnormalDetail: ''
				}
			};
		},
		watch: {

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
				this.selectedValue.abnormalType = e.value[0]
				this.selectedValue.abnormalDetail = e.value[1]
				this.show = false
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