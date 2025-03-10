<template>
	<view class="content">
		<!-- 标题 -->
		<view class="title">
			<view class="text">
				帖子详情
			</view>
		</view>
		<!-- 帖子 -->
		<view class="post" v-for="(item, index) in posts" :key="index">
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
			</view>
			<!-- 文字内容 -->
			<view class="content-text">
				{{ item.content }}
			</view>
			<!-- 图片内容 -->
			<view class="img">
				<view class="image-container">
					<img v-for="(img, index) in item.post_pic" :key="index" :src="img" class="preview-image">
				</view>
			</view>
			<!-- 点赞 -->
			<view class="like">
				<view class="icon" @click.stop="toggleCheck(index, item.id)">
					<img class="icon-img" :src="item.liked ? '../../static/dianzan_1.png':'../../static/dianzan.png'" />
					<view class="count">
						{{ item.like_count }}
					</view>
				</view>
			</view>
		</view>
		<view class="post">
			<view class="title">
				<view class="text" style="margin: 20rpx 0rpx;">
					评论 {{total_comments}}
				</view>
			</view>
			<!-- 头像部分 -->
			<view class="comment-title" v-for="(item,index) in comments" :key="index">
				<view class="comments">
					<!-- <view > -->
					<img class="avatar-img" :src="item.user_pic" alt="">
					<!-- </view> -->
					<view class="comment-name">
						<view class="name-text" style="color: #3f3f3f;">
							{{item.username}}
						</view>
						<view class="name-cat" style="">
							{{item.comment_created_at}}
						</view>
						<!-- 文字内容 -->
						<view class="comment-text">
							{{item.comment_content}}
						</view>
					</view>

				</view>
			</view>
		</view>
		<!-- 占位 View，防止 fixed 组件紧贴评论 -->
		<view style="height: 200rpx;"></view>
		<view class="fixed">
			<u--input placeholder="快来发表评论吧!(ง •_•)ง" suffixIcon="checkbox-mark" suffixIconStyle="color: #909399">
			</u--input>
		</view>
	</view>
</template>

<script>
	import api from '../../utils/api.js';
	export default {
		data() {
			return {
				posts: [],
				comments: [],
				total_comments: ''
			}
		},
		onLoad(options) {
			this.getPostList(options.id)
			this.getCommentList(options.id)
		},
		onReady() {},
		methods: {
			// 获取全部帖子
			async getPostList(id) {
				try {
					const response = await api.getPost({
						post_id: id
					})
					this.posts = response.data
					console.log(response.data)
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
			// 获取评论接口
			async getCommentList(post_id) {
				try {
					const response = await api.getComment(post_id)
					this.comments = response.data
					this.total_comments = response.total_comments
					console.log(response.data)
				} catch (err) {
					console.log(err)
				}
			},
			// 点赞切换效果
			toggleCheck(index, id) {
				this.posts[index].liked = !this.posts[index].liked
				// 切换点赞状态后更新点赞数
				this.posts[index].like_count += this.posts[index].liked ? 1 : -1;
				this.addLike(id)
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
		// height: 100vh;
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
		// height: 130rpx;
		margin: 40rpx 0rpx;
		display: flex;
		justify-content: space-between;
	}

	.comment-title {
		// height: 130rpx;
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
	}

	.avatar {
		height: 100%;
		// width: 70%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.comments {
		height: 100%;
		margin-top: 20rpx;
		// width: 70%;
		display: flex;
		justify-content: flex-start;
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
		// width: 60%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 30rpx;
	}

	.comment-name {
		// width: 80%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 30rpx;
	}

	.name-text {
		// width: 80%;
		height: 40%;
	}

	.name-cat {
		font-size: 28rpx;
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
		line-height: 42rpx;

	}

	.comment-text {
		margin: 20rpx 0rpx;
		margin-right: 20rpx;
		line-height: 42rpx;

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
		width: 20%;
		display: flex;
		justify-content: center;
		align-self: center;
	}

	.icon-img {
		width: 40rpx;
		height: 40rpx;
	}

	.count {
		margin-left: 10rpx;
	}

	.fixed {

		width: 100%;
		height: 140rpx;
		position: fixed;
		bottom: -1%;
		background-color: #fff;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		border: #000 solid 4rpx;
	}

	/deep/.u-input {
		height: 80rpx !important;
	}

	// .fixed:active {
	// 	background-image: url('https://www.serverzhu.com/petImg/add2.png');
	// }
</style>
