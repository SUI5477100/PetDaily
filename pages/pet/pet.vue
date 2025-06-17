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
		<view class="post" v-for="(item, index) in posts" :key="index" @click="getPostContent(item.id)">
			<!-- 头像部分 -->
			<view class="post-title">
				<view class="avatar">
					<!-- <view > -->
					<img class="avatar-img" :src="item.user_pic" alt="">
					<!-- </view> -->
					<view class="avatar-name">
						<view class="name-text">
							{{ item.username }}
						</view>
						<view class="name-cat">
							{{ item.created_at }}
						</view>
					</view>
					
				</view>
				<view class="friend-btn" @click.stop="toggleFriend(index)">
					关注ta
				</view>
			</view>
			<!-- 文字内容 -->
			<view class="content-text">
				{{ item.content }}
			</view>
			<!-- 图片内容 -->
			<view class="img" >
				<view class="image-container" @click.stop>
					<u-album v-if="Array.isArray(item.post_pic)" :urls="item.post_pic || []" rowCount="3"
						multipleSize="80px" class="preview-image" ></u-album>
				</view>
			</view>
			<!-- 点赞 -->
			<view class="like">
				<view class="icon">
					<view class="" style="display: flex;" @click="getPostContent(item.id)">
						<u-icon name="chat" color="#000" size="22"></u-icon>
						<view class="count">
							{{ item.comment_count + item.reply_count }}
						</view>
					</view>
					<view class="" style="display: flex;" @click.stop="toggleCheck(index, item.id)">
						<img class="icon-img"
							:src="item.liked ? '../../static/dianzan_1.png':'../../static/dianzan.png'" />
						<view class="count">
							{{ item.like_count }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="fixed" @click="sendPost">

		</view>
	</view>
</template>

<script>
	import api from '../../utils/api.js';
	export default {
		data() {
			return {
				posts: []
			}
		},
		onReady() {
			this.getPostList()
		},
		methods: {
			// 获取全部帖子
			async getPostList() {
				try {
					const response = await api.getPost()
					this.posts = response.data.map(post => ({
						...post,
						isFriend: false // 添加好友状态字段
					}))
					console.log(response)
				} catch (err) {
					console.log(err)
				}
			},
			// 点赞接口
			async addLike(id) {
				try {
					console.log(id)
					const response = await api.addLike({
						post_id: id
					})
					console.log(response)
				} catch (err) {
					console.log(err)
				}
			},
			getPostContent(id) {
				console.log(id)
				uni.redirectTo({
					url: `/pages/pet/petPost?id=${id}`
				});
			},
			sendPost() {
				uni.redirectTo({
					url: `/pages/record/components/picturesTextPost`
				});
			},
			// 点赞切换效果
			toggleCheck(index, id) {
				this.posts[index].liked = !this.posts[index].liked
				// 切换点赞状态后更新点赞数
				this.posts[index].like_count += this.posts[index].liked ? 1 : -1;
				this.addLike(id)
			},
			// 切换好友状态
			toggleFriend(index) {
				this.posts[index].isFriend = !this.posts[index].isFriend;
				// TODO: 这里可以添加调用后端接口的逻辑
			}
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
		margin: 40rpx 0rpx;
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
		background-color: #000;
		border-radius: 100rpx;
		border: #000 2rpx solid;
		margin-left: 20rpx;
	}

	.avatar-name {
		width: 60%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 30rpx;
	}

	.name-text {
		width: 80%;
		height: 40%;
	}

	.name-cat {
		// width: 80%;
		height: 40%;
		color: #b0b0b0;
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
		width: 90%;
		margin: auto;
	}

	.image-container {
		display: flex;
		flex-wrap: wrap;
		gap: 20rpx;
		justify-content: flex-start;
	}

	.preview-image {
		flex: 0 0 calc(33.33% - 14rpx);
		width: calc(33.33% - 14rpx);
		height: 180rpx;
		border-radius: 8rpx;
		box-sizing: border-box;
	}

	.like {
		height: 80rpx;
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}

	.icon {
		width: 35%;
		display: flex;
		justify-content: space-evenly;
		align-self: center;
		margin-right: 20rpx;
	}

	.icon-img {
		width: 40rpx;
		height: 40rpx;
	}

	.count {
		margin-left: 10rpx;
	}

	.fixed {
		background-image: url('https://www.serverzhu.com/petImg/add.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		width: 120rpx;
		height: 150rpx;
		position: fixed;
		bottom: 3%;
		right: -4%;
	}

	.fixed:active {
		background-image: url('https://www.serverzhu.com/petImg/add2.png');
	}

	.friend-btn {
		padding: 10rpx 30rpx;
		border-radius: 30rpx;
		font-size: 24rpx;
		background-color: #000;
		color: #fff;
		border: 2rpx solid #000;
		transition: all 0.3s ease;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 20rpx;

		&.is-friend {
			background-color: #000;
			color: #fff;
		}
	}
</style>
