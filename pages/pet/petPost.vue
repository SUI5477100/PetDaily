<template>
	<view class="content">
		<!-- 标题 -->
		<view class="detail-title">
			<view class="text" @click="back">
				<u-icon color="#000" size="20" name="arrow-left"></u-icon>
				<view class="" style="margin-left: 30rpx;">
					帖子详情
				</view>
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
				<u--text margin="0 0 8px 0" :text="item.content"></u--text>
			</view>
			<!-- 图片内容 -->
			<view class="img">
				<u-album :urls="urls2" rowCount="3" multipleSize="80px"></u-album>
			</view>
			<!-- 点赞/删除 -->
			<view class="like">
				<view v-if="userId === item.user_id" class="icon" @click="deleteMyPost(item.id)">
					<u-icon size="20" name="trash" color="#000"></u-icon>
					<span>删除</span>
				</view>
				<view class="icon" @click.stop="toggleCheck(index, item.id)">
					<img class="icon-img" :src="item.liked ? '../../static/dianzan_1.png':'../../static/dianzan.png'" />
					<view class="count">
						{{ item.like_count }}
					</view>
				</view>
			</view>
		</view>
		<!-- 总评论 -->
		<view class="post" style="margin-bottom: 200rpx;">
			<view class="title">
				<view class="text" style="margin: 20rpx 0rpx;">
					评论 {{total_comments+total_replies}}
				</view>
			</view>
			<!-- 头像部分 -->
			<view class="comment-title" v-for="(item,index) in comments" :key="index">
				<view class="comments">
					<img class="avatar-img" :src="item.user_pic" alt="">
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
						<view style="display: flex;">
							<!-- "回复" 按钮 -->
							<view style=" margin-right: 30rpx;" class="click-btn"
								@click="onReplyClick(item.comment_id, item.username)">
								<u-icon size="18" name="chat"></u-icon>
								<span>回复</span>
							</view>
							<!-- "删除" 按钮 -->
							<view v-show="userId === item.comment_user_id">
								<view class="click-btn" @click="deleteCommentBtn(item.comment_id)">
									<u-icon size="18" name="trash"></u-icon>
									<span>删除</span>
								</view>
							</view>
						</view>
						<view class="check-comment" v-if="item.replies.length>0" @click="toggleReplies(index)">
							{{ showReplies[index] ? '点击收起回复' : '点击查看回复' }}
							<u-icon size="20" :name="showReplies[index] ? 'arrow-up-fill' : 'arrow-down-fill'"
								color="#ffd117">
							</u-icon>
						</view>
						<!-- 回复列表 -->
						<view class="reply-list" v-if="showReplies[index]">
							<view v-for="(reply,index) in item.replies" :key="reply.id" style="margin-bottom: 10rpx;">
								<span style="color: #ffa915; margin-right: 10rpx;">{{reply.username}}:</span>
								<span style="color: #3f3f3f;"> {{ reply.reply_content }}</span>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
		<!-- 评论的输入框-->
		<view class="fixed">
			<u--input v-model="comment" :placeholder="'快来发表评论吧!(ง •_•)ง'" suffixIconStyle="color: #909399" @confirm="handleSubmit({ type: 'comment' });
"></u--input>
		</view>
		<!-- 回复评论弹出的输入框 -->
		<u-popup :show="showPopup" @close="closePopup" @open="handlePopupOpen" :round="10" closeOnClickOverlay="true"
			overlayOpacity="0.1">
			<view class="box-popup">
				<img src="https://www.serverzhu.com/petImg/%E7%BB%84%2034.png" class="img-popup">
				<u--input v-model="commentPopup" :placeholder="'回复 ' + replyingTo + ' 的评论...'"
					suffixIconStyle="color: #909399" :focus="shouldFocus" @confirm="handleSubmit({ type: 'reply' });"
					:showConfirmBar="false" />
			</view>
		</u-popup>

	</view>
</template>

<script>
	import api from '../../utils/api.js';
	export default {
		data() {
			return {
				albumWidth: 0,
				shouldFocus: false, // 控制是否聚焦
				urls2: [],
				commentPopup: '',
				showPopup: false,
				isSubmitting: false, // 防抖锁
				posts: [],
				comments: [],
				total_comments: '',
				total_replies: '',
				comment: "", // 绑定输入框内容
				postID: 0,
				replyingTo: null, // 存储正在回复的用户名
				replyingCommentId: null, // 存储当前正在回复的 comment_id
				showReplies: {}, // 用对象存储每个评论的展开状态
				userId: 0,
				list: [{
					type: "",
					message: "",
				}, ],
			}
		},
		onLoad(options) {
			this.getUserInfo()
			this.postID = options.id
			this.getPostList(this.postID)
			this.getCommentList(this.postID)
		},
		onReady() {},
		methods: {
			// 点击”回复“按钮
			onReplyClick(commentId, username) {
				this.replyingCommentId = commentId;
				this.replyingTo = username;
				this.showPopup = true; // 显示弹窗
				this.shouldFocus = true; // 准备聚焦
			},

			// 弹窗打开回调
			handlePopupOpen() {
				this.$nextTick(() => {
					// 确保弹窗渲染完成后再聚焦
					this.shouldFocus = true;
				});
			},
			// 弹窗关闭时重置状态
			closePopup() {
				this.showPopup = false;
				this.shouldFocus = false;
				this.replyingCommentId = null;
				this.replyingTo = null;
				this.commentPopup = "";
			},
			// 返回tab页面
			back() {
				uni.switchTab({
					url: '/pages/pet/pet'
				});
			},

			//  收起评论的回复
			toggleReplies(index) {
				// 切换 true/false
				this.$set(this.showReplies, index, !this.showReplies[index]);
			},

			// 错误/正确信息提醒
			sendToast(type, message) {
				this.list.type = type
				this.list.message = message
				this.showToast(this.list)
			},
			showToast(params) {
				this.$refs.uToast.show({
					...params,
				});
			},
			// 删除自己的帖子
			async deleteMyPost(id) {
				try {
					const response = await api.deletePost(id)
					console.log(response)
					this.sendToast('success', '删除帖子成功')
					setTimeout(() => {
						this.back()
					}, 1000)
				} catch (err) {
					console.log(err)
					this.sendToast('error', '删除帖子失败')
				}
			},
			// 通用 回复/评论的enter触发
			async handleSubmit({
				type
			}) {
				// 防止用户连续点击按钮，多次触发提交操作（防抖）
				if (this.isSubmitting) return;
				this.isSubmitting = true; 
				try {
					// 判断当前是评论还是回复
					const isReply = type === 'reply';
					// 如果是回复，获取回复输入框内容；否则获取评论输入框内容
					const content = isReply ? this.commentPopup : this.comment;
					await this.submitContent({
						type, // 类型标记：'comment' 或 'reply'
						content,
						post_id: !isReply ? this.postID : null, // 只有发表评论时需要 post_id
						comment_id: isReply ? this.replyingCommentId : null // 只有回复时需要 comment_id
					});
					if (isReply) {
						this.commentPopup = '';
						this.closePopup();
					} else {
						this.comment = '';
					}
					// 刷新评论列表
					await this.getCommentList(this.postID);
				} finally {
					// 释放提交锁
					this.isSubmitting = false;
				}
			},
			// 删除自己的评论接口
			async deleteCommentBtn(id) {
				try {
					const response = await api.deleteComment(id)
					this.getCommentList(this.postID)
					// console.log(response,"删除评论成功")
					this.sendToast('success', '删除成功(｡í _ ì｡)')
				} catch (err) {
					console.log(err, '删除评论失败')
					this.sendToast('error', '删除失败了哦~ (੭ ᐕ)੭？')
				}
			},
			// 获取用户id接口
			async getUserInfo() {
				try {
					const response = await api.getUserInfo()
					this.userId = response.data.id
					// console.log(this.userId)
				} catch (err) {
					console.log(err)
				}
			},

			// 通用回复/评论的方法接口
			async submitContent({
				type,
				content,
				post_id = null,
				comment_id = null
			}) {
				try {
					if (!content) {
						this.sendToast('error', '不能发送空内容！');
						return;
					}

					let response;

					if (type === 'comment') {
						response = await api.postComment({
							post_id,
							content
						});
					} else if (type === 'reply') {
						response = await api.commentReplies({
							comment_id,
							content
						});
					} else {
						throw new Error('未知的提交类型');
					}

					console.log(response, '发送成功');
					this.sendToast('success', '评论成功');
				} catch (err) {
					console.log(err, '发送失败');
					this.sendToast('error', '评论失败了哦~ (੭ ᐕ)੭？');
				}
			},

			// 获取选中帖子接口
			async getPostList(id) {
				try {
					const response = await api.getPost({
						post_id: id
					})
					this.posts = response.data
					this.urls2 = response.data[0].post_pic
					console.log(this.posts, '获取帖子成功')
					console.log(response.data[0].post_pic, '获取帖子成功')
				} catch (err) {
					console.log(err, '获取帖子失败')
					this.sendToast('error', '获取帖子失败')
				}
			},

			// 点赞接口
			async addLike(id) {
				try {
					console.log(id)
					const response = await api.addLike({
						post_id: id
					})
					console.log(response, '点赞成功')
					this.sendToast('success', response.message)
				} catch (err) {
					console.log(err, '点赞失败')
					this.sendToast('error', '点赞失败')
				}
			},
			// 获取评论接口
			async getCommentList(post_id) {
				try {
					const response = await api.getComment(post_id)
					this.comments = response.data
					this.total_comments = response.total_comments
					this.total_replies = response.total_replies
					console.log(response.data, '获取评论成功')
				} catch (err) {
					console.log(err, '获取评论失败')
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

	.detail-title {
		font-size: 38rpx;
		margin-left: 30rpx;
		position: relative;
		margin-right: auto;
	}

	.title {
		font-size: 40rpx;
		font-weight: 600;
		margin-left: 30rpx;
		position: relative;
		margin-right: auto;
	}

	.text {
		display: flex;
		// position: relative;
		// display: inline-block;
	}

	.post {
		width: 90%;
		background-color: #fff;
		border: #000 4rpx solid;
		border-radius: 20rpx;
		margin-top: 5%;
		padding-bottom: 20rpx;
	}

	.post-title {
		// height: 130rpx;
		margin: 40rpx 40rpx 0rpx 0rpx;
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
		width: 100%;
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
		width: 70%;
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
		word-wrap: break-word;
		overflow: hidden;
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

	// .back-icon::before {
	// 	content: "<";
	// 	/* 直接设置内容 */
	// 	font-size: 20px;
	// 	margin: 0 20rpx;
	// }

	.sendBtn {
		width: 100rpx;
		height: 60rpx;
		margin: 0rpx 20rpx;
		background-color: #ffd117;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		border-radius: 10rpx;
	}

	.sendBtn:active {
		background-color: #eac015;
	}

	.check-comment {
		color: #ffd117;
		display: flex;
		// justify-content: center;
		align-items: center;
	}

	.click-btn {
		margin-bottom: 20rpx;
		display: flex;
		color: #999999;
	}

	.click-btn:active {
		margin-bottom: 20rpx;
		display: flex;
		color: #707070;
	}

	.img-popup {
		position: absolute;
		right: 0%;
		top: -30%;
		width: 130rpx;
		height: 130rpx;

	}

	.box-popup {
		padding: 30rpx 0rpx;
		position: relative;
	}

	.reply-list {
		width: 100%;
		background-color: #f7f7f7;
		margin-top: 10rpx;
		padding: 20rpx 20rpx;
		border-radius: 20rpx;
	}
</style>
