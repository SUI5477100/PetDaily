<template>
	<view class="content">
		<!-- 宠物信息 -->
		<view v-if="items.length>0" class="introduce">
			<view class="icon"></view>
			<view class="introduce-info">
				<!-- 头像等信息 -->
				<view v-for="(item, index) in items.slice(0, 3)" :key="item.id" class="pet-img-container">
					<img class="pet-img" :src="item.pet_pic" alt="宠物头像" />

					<!-- 只在第三个加蒙层 -->
					<view v-if="index === 2 && items.length > 3" class="overlay">
						+{{ items.length }}
					</view>
				</view>

				<view class="pet-info">
					<view class="edit" @click="deletePet">
						管理
					</view>
				</view>
			</view>
		</view>
		<!-- 没添加宠物信息 -->
		<view v-else class="addpet" @click="addPet"></view>
	</view>
</template>


<script>
	import api from "../../../utils/api.js"
	export default {
		data() {
			return {
				showInfo: 1, //判断是否添加宠物了
				items: []
			};
		},
		onReady() {
			this.getPetList()
		},
		onShow() {
			this.getPetList()
		},
		methods: {
			addPet() {
				uni.redirectTo({
					url: `/pages/petInfo/petInfo`
				});
			},
			deletePet() {
				uni.redirectTo({
					url: '/pages/deletePet/deletePet'
				});
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
	};
</script>

<style scoped lang="less">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		/* height: 100vh; */
	}

	.introduce {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 20vh;
		background-color: #fff;
		border-radius: 15px;
		border: #000 4rpx solid;
		box-shadow: 5rpx 8rpx 15rpx -5rpx #ffeb3b;
		background-image: url('https://www.serverzhu.com/petImg/%E7%94%BB%E6%9D%BF%201%20(1).png');
		background-size: cover;
		background-position: center;
		background-repeat: repeat-y;
	}

	.addpet {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 20vh;
		background-color: #fff;
		border-radius: 15px;
		border: #000 4rpx solid;
		box-shadow: 5rpx 8rpx 15rpx -5rpx #ffeb3b;
		background-image: url('https://www.serverzhu.com/petImg/%E5%88%86%E7%BB%84%2019.png');
		background-size: cover;
		background-position: center;
		background-repeat: repeat-y;
	}


	.icon {
		margin-top: 10rpx;
		width: 15%;
		height: 20rpx;
		border-radius: 15px;
		// background-color: #fff4c1;
		// border: 4rpx solid #000;
	}

	.introduce-info {
		height: auto;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-start;
		padding-left: 30rpx;
		padding-top: 40rpx;
		position: relative;
		/* 加上这句很关键 */
	}

	.pet-img-container {
		position: relative;
		/* 为蒙层定位提供参考 */
	}

	.pet-img {
		width: 100rpx;
		height: 100rpx;
		border: 4rpx solid #afafaf;
		border-radius: 50%;
		/* 让头像变圆 */
		margin: 10rpx 10rpx;
		/* 上下左右留点距离 */
		background-color: #fff;
		/* 如果没图片可以给白底 */
		background-size: cover;
		background-position: center;
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		// width: 100%;
		// height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		/* 字体稍微大一点 */
		// border-radius: 50%;
		font-weight: bold;
		width: 100rpx;
		height: 100rpx;
		border: 4rpx solid #afafaf;
		border-radius: 50%;
		margin: 10rpx 10rpx;
		// background-color: #fff;
		background-size: cover;
		background-position: center;
	}


	.pet-info {
		position: absolute;
		top: 0;
		right: 30rpx;
	}

	.edit {
		width: 100rpx;
		height: 50rpx;
		border-radius: 25rpx;
		background-color: #000;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.edit:active {
		box-shadow: 0 0 10rpx 5rpx #d8d8d8;
		/* 水平偏移0，垂直偏移0，模糊半径10rpx，扩展半径5rpx，*/
	}
</style>
