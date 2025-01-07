<template>
	<view>
		<view class="record-items" v-for="(items, index) in iconList" :key="index" @click="onclick(items.value)">
			<view class="items-left">
				<img :src="items.src" alt="" class="icon" />
				<view class="text">{{ items.text }}</view>
			</view>
			<view class="right-icon">
				>
			</view>
		</view>
		<view class="record-book">
			小宠的记录本
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				iconList: [{
						src: "../../../static/record/eat.png",
						text: '饮食',
						value: 'diet'
					},
					{
						src: "../../../static/record/drink.png",
						text: '喝水',
						value: 'drink'
					},
					{
						src: "../../../static/record/weight.png",
						text: '体重',
						value: 'weight'
					},
					{
						src: "../../../static/record/bath.png",
						text: '洗护',
						value: 'cleansing'
					},
					{
						src: "../../../static/record/shit.png",
						text: '尿便',
						value: 'stool'
					},
					{
						src: "../../../static/record/note.png",
						text: '记事',
						value: 'notes'
					},
					{
						src: "../../../static/record/warn.png",
						text: '异常',
						value: 'abnormal'
					},
					{
						src: "../../../static/record/medication.png",
						text: '用药',
						value: 'medication'
					}
				]
			}
		},
		methods: {
			onclick(value) {
				console.log(value)
			}
		}
	}
</script>

<style scoped lang="less">
	.record-items {
		width: 100%;
		height: 100rpx;
		border: #000 4rpx solid;
		background-color: #fff;
		border-radius: 20rpx;
		margin-bottom: 15rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.record-items:active {
		background-color: #f4f4f4;
	}

	.items-left {
		display: flex;
		align-items: center;
	}

	.icon {
		width: 80rpx;
		height: 80rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}

	.right-icon {
		margin-right: 25rpx;
	}

	.record-book {
		width: 100%;
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
</style>