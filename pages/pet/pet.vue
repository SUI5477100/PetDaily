<template>
	<view class="content">
		<!-- 标题 -->
		<view class="title">
			<view class="text">
				宠物圈
				<view
					style="position: absolute; bottom: -20%; left: 30%; width: 40%; height: 8rpx; background-color: black; border-radius: 50rpx;">
				</view>
			</view>
		</view>
		<!-- 帖子 -->
		<view class="post" v-for="(item, index) in posts" :key="index">
			<!-- 头像部分 -->
			<view class="post-title">
				<view class="avatar">
					<view class="avatar-img">

					</view>
					<view class="avatar-name">
						<view class="name-text">
							{{ item.name }}
						</view>
						<view class="name-cat">
							{{ item.cat }}
						</view>
					</view>
				</view>
				<view class="time">
					{{ item.time }}
				</view>
			</view>
			<!-- 文字内容 -->
			<view class="content-text">
				{{ item.content }}
			</view>
			<!-- 图片内容 -->
			<view class="img">
				<view class="grid">
					<view class="grid-item" v-for="(img, index) in item.images" :key="index">
					</view>
				</view>
			</view>

			<!-- 点赞 -->
			<view class="like">
				<view class="icon" 	@click="toggleCheck(index)">
					<img class="icon-img"
						:src="item.isChecked ? '../../static/dianzan.png':'../../static/dianzan_1.png'"
					 />
					<view class="count">
						{{ item.likes }}
					</view>
				</view>
			</view>
		</view>
		<view class="fixed">
		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				posts: [
					{
						name: '名字1',
						cat: '波斯猫',
						time: '刚刚',
						content: '哇塞，宝子你这句话就像春风吹过，瞬间让人心情明媚！你的厉害，就像夜空中最亮的星，无论在哪里都能熠熠生辉！🌟🌟🌟。跟你一起，让他的光芒照亮更多人！关注我，每日夸夸，给你能量满满！/追星路上，我陪你！关注我，每日彩虹屁不断！。',
						images: [/* 图片数据 */],
						isChecked: false,
						likes: 1
					},
					{
						name: '名字2',
						cat: '金毛猫',
						time: '1分钟前',
						content: '金毛猫非常聪明。',
						images: [/* 图片数据 */],
						isChecked: false,
						likes: 3
					},
					{
						name: '名字3',
						cat: '暹罗猫',
						time: '2分钟前',
						content: '暹罗猫非常温顺。',
						images: [1,2,3,4,5,6,7,8,9],
						isChecked: false,
						likes: 5
					}
				]
			}
		},
		methods: {
			toggleCheck(index) {
				this.posts[index].isChecked = !this.posts[index].isChecked
				// 切换点赞状态后更新点赞数
				this.posts[index].likes += this.posts[index].isChecked ? 1 : -1;
			}
		}
	}
</script>
<style scoped lang="less">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-image: url('../../static/background.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-color: #fffce0;
		padding-top: 15%;
		width: 100%;

	}

	.title {
		font-size: 40rpx;
		font-weight: 600;
		margin-left: 30rpx;
		position: relative;
		margin-right: auto;
	}

	.text {
		position: relative;
		display: inline-block;
	}

	.post {
		width: 90%;
		background-color: #fff;
		border: #000 4rpx solid;
		border-radius: 20rpx;
		margin-top: 8%;
	}

	.post-title {
		height: 130rpx;
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
	}

	.avatar {
		height: 100%;
		width: 70%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.avatar-img {
		width: 80rpx;
		height: 80rpx;
		background-color: #ff5500;
		border-radius: 100rpx;
		border: #000 2rpx solid;
		margin-left: 20rpx;
	}

	.avatar-name {
		width: 60%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.name-text {
		width: 80%;
		height: 40%;
	}

	.name-cat {
		width: 80%;
		height: 40%;
	}

	.time {
		width: 20%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.content-text {
		margin: 20rpx;
		margin-left: 30rpx;
		line-height: 38rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		-webkit-line-clamp: 4;
	}

	.img {
		width: 100%;
	}

	.grid {
		// margin: 20rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}

	.grid-item {
		width: 200rpx;
		margin-bottom: 20rpx;
		height: 200rpx;
		background-color: #ddd;
		border-radius: 8rpx;
	}

	.like {
		height: 80rpx;
		width: 100%;
		display: flex;
		justify-content: flex-end;

	}

	.icon {
		width: 20%;
		display: flex;
		justify-content: center;
		align-self: center;
	}

	.icon-img {
		width: 40rpx;
		height: 40rpx;
	}
	.count{
		margin-left: 10rpx;
	}
	.fixed {
		background-image: url('../../static/add.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		width: 150rpx;
		height: 150rpx;
		position: fixed;
		bottom: 3%;
		right: -4%;
	}
	
	.fixed:active {
		background-image: url('../../static/add2.png');
	}
</style>