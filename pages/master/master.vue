<template>
	<view class="content">
		<!-- 铲屎官信息卡 -->
		<view class="master">
			<img src="https://www.serverzhu.com/%E7%BB%84%20178.png" alt="" style="position: absolute;bottom: -20%;right: -5%;
			width: 150rpx;height: 150rpx;" />
			<!-- 头像 -->
			<view class="avatar"></view>
			<view class="avatar-right">
				<!-- 名字 -->
				<view class="name-box">
					<view class="name-title">
						<view class="name">
							铲屎官
						</view>

					</view>
					<view class="title-icon">
						>
					</view>
				</view>
				<!-- 动态 -->
				<view class="dynamic-box">
					<view class="dynamic">
						<view class="dynamic-count">
							326
						</view>
						<view class="dynamic-title">
							动态
						</view>
					</view>
					<view class="interval">
						|
					</view>
					<view class="like">
						<view class="like-count">
							4526
						</view>
						<view class="like-title">
							点赞
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 我的宠物 -->
		<view class="mypet" style="">
			<img src="https://www.serverzhu.com/mypet.png" alt=""
				style="margin-left: 20rpx;margin-top: 10rpx;width: 160rpx;height: 60rpx; " />
			<view class="view-wrapper" style="">
				<!-- 宠物信息卡 -->
				<view class="master-box" v-for="(item,index) in petList" :key="index">
					<!-- 头像 -->
					<img class="avatar-pet" :src="item.img"></img>
					<view class="avatar-right">
						<!-- 名字 -->
						<view class="name-pet">
							<view class="name-title">
								<view class="name">
									{{item.name}}
								</view>
								<img v-if="item.sex === 'man'" class="sex" src='https://www.serverzhu.com/man.png'>
								</img>
								<img v-else class="sex" src='https://www.serverzhu.com/woman.png'>
								</img>
							</view>

						</view>
						<!-- 宠物信息 -->
						<view class="dynamic-pet">
							<view class="dynamic">
								<view class="dynamic-title">
									{{item.age}}
								</view>
							</view>
							<view class="interval">
								|
							</view>
							<view class="like">
								<view class="like-title">
									{{item.weight}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="addpet">
				<view class="addpet-btn">
					<view class="btn-content">
						<img src="../../static/add.png" style="width: 18%;height: 80%;margin-right: 10rpx;" /> 添加宠物
					</view>
				</view>
			</view>
		</view>
		<!-- 养宠小助手 -->
		<view class="assistant">
			<img src="https://www.serverzhu.com/help.png" style="width: 60rpx;height: 60rpx;margin: 0rpx 20rpx;"
				alt="" />
			<view class="assistant-title">
				养宠小助手
			</view>
		</view>
		<!-- 客服中心 -->
		<view class="assistant">
			<img src="https://www.serverzhu.com/server.png" style="width: 60rpx;height: 60rpx;margin: 0rpx 20rpx;"
				alt="" />
			<view class="assistant-title">
				问题反馈
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				petList: [{
						name: '暹罗猫',
						age: "12个月",
						weight: '5kg',
						sex: 'man',
						img: 'https://www.serverzhu.com/mimi2.png'
					},
					{
						name: '橘猫',
						age: "1个月",
						weight: '3kg',
						sex: 'woman',
						img: 'https://www.serverzhu.com/mimi1.jpg'
					},
					// {
					// 	name: '橘猫',
					// 	age: "1个月",
					// 	weight: '3kg',
					// 	sex: '♀',
					// 	img: 'https://www.serverzhu.com/mimi1.jpg'
					// }
				]
			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="less">
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
		height: 100vh;

	}

	.master {
		position: relative;
		border-radius: 40rpx;
		border: 4rpx solid #000;
		width: 90%;
		height: 20vh;
		background-color: #fff;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.master-box {
		border-radius: 20rpx;
		border: 4rpx solid #000;
		width: 48%;
		margin-bottom: 15rpx;
		height: 150rpx;
		background-color: #fff;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.avatar-right {
		width: 60%;
		height: 100%;
	}

	.name-pet {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 50%;
	}

	.name-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-weight: 600;
		font-size: 36rpx;
		height: 50%;
	}

	.dynamic-box {
		// background-color: aquamarine;
		height: 25%;
		width: 85%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.dynamic-pet {
		font-size: 28rpx;
		height: 25%;
		width: 85%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.avatar {
		border-radius: 200rpx;
		border: 4rpx solid #000;
		height: 150rpx;
		width: 150rpx;
		background-color: #55ff00;
	}

	.avatar-pet {
		border-radius: 10rpx;
		// border: 2rpx solid #000;
		height: 90rpx;
		width: 90rpx;
		// background-color: #55ff00;
	}

	.name-title {
		display: flex;
		align-items: center;
	}

	.name {
		margin-right: 10rpx;
	}

	.mypet {
		width: 90%;
		border-radius: 40rpx;
		border: 4rpx solid #000;
		margin-top: 8%;
		background-color: #fff;
		height: auto;
	}

	.view-wrapper {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 20rpx;
		height: auto;
		// background-color: #55ff00
	}

	.addpet {
		// border: 2rpx solid #000;
		height: 90rpx;
		padding: 0rpx 20rpx 40rpx 20rpx;
	}

	.addpet-btn {
		// background-color: aqua;
		height: 100%;
		border-radius: 20rpx;
		border: 2px dashed #000;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.btn-content {
		// background-color: #55ff00;
		width: 50%;
		height: 80%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.sex {
		width: 30rpx;
		height: 30rpx;
	}

	.addpet-btn:active {
		background-color: #f2f2f2;
	}

	.assistant {
		border: 4rpx solid #000;
		width: 90%;
		border-radius: 40rpx;
		background-color: #fff;
		height: 100rpx;
		margin-top: 40rpx;
		display: flex;
		align-items: center;
	}
	.assistant:active{
		background-color: #f2f2f2;
	}
</style>