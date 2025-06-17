<template>
	<view class="chat-container">
		<uni-nav-bar left-icon="left" :title="chatName" @clickLeft="back" height="160rpx" />
		
		<!-- 聊天消息区域 -->
		<scroll-view 
			class="message-list" 
			scroll-y 
			:scroll-into-view="scrollInto"
			scroll-with-animation
			@scrolltoupper="loadMoreMessages"
		>
			<view class="loading" v-if="isLoading">加载中...</view>
			<view
				v-for="(msg, index) in messages"
				:key="index"
				:id="'msg-' + index"
				:class="['message-item', msg.role === 'user' ? 'user' : 'other']"
			>
				<image class="avatar" :src="msg.avatar" mode="aspectFill"></image>
				<view class="message-content">
					<view class="bubble">{{ msg.content }}</view>
					<view class="time">{{ msg.time }}</view>
				</view>
			</view>
		</scroll-view>

		<!-- 输入区域 -->
		<view class="input-area">
			<view class="input-box">
				<input 
					class="input" 
					v-model="inputMessage" 
					placeholder="输入消息..." 
					@confirm="sendMessage"
					:adjust-position="false"
				/>
				<!-- <view class="emoji-btn" @click="toggleEmoji">
					<u-icon name="smile" size="40" color="#666"></u-icon>
				</view> -->
			</view>
			<view class="send-btn" @click="sendMessage">发送</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chatName: '鱼烧哥',
				chatId: '',
				inputMessage: '',
				scrollInto: '',
				isLoading: false,
				messages: [
					{
						role: 'other',
						content: '你好，最近怎么样？',
						time: '12:30',
						avatar: 'https://www.serverzhu.com/petImg/kax67qzcGAfl709cad6f351ba003ebfeb4df6b33e2ad.png'
					},
					{
						role: 'user',
						content: '挺好的，你呢？',
						time: '12:31',
						avatar: "https://www.serverzhu.com/petImg/PuZ3cny6dw8717d844e953ed93c7761cf8c3b2b0c4e8.jpeg"
					},
					{
						role: 'other',
						content: '我也不错，周末有空一起去看电影吗？',
						time: '12:32',
						avatar: 'https://www.serverzhu.com/petImg/kax67qzcGAfl709cad6f351ba003ebfeb4df6b33e2ad.png'
					}
				]
			}
		},
		onLoad(options) {
			if (options.name) {
				this.chatName = options.name;
			}
			if (options.id) {
				this.chatId = options.id;
			}
			this.scrollToBottom();
		},
		methods: {
			back() {
				uni.navigateBack();
			},
			sendMessage() {
				const text = this.inputMessage.trim();
				if (!text) return;
				
				// 添加新消息
				this.messages.push({
					role: 'user',
					content: text,
					time: this.getCurrentTime(),
					avatar: 'https://www.serverzhu.com/petImg/avatar.png'
				});
				
				// 清空输入框
				this.inputMessage = '';
				
				// 滚动到底部
				this.scrollToBottom();
				
				// TODO: 调用发送消息的API
			},
			scrollToBottom() {
				this.$nextTick(() => {
					const lastIndex = this.messages.length - 1;
					this.scrollInto = `msg-${lastIndex}`;
				});
			},
			loadMoreMessages() {
				// TODO: 加载更多历史消息
				this.isLoading = true;
				setTimeout(() => {
					this.isLoading = false;
				}, 1000);
			},
			toggleEmoji() {
				// TODO: 实现表情选择功能
			},
			getCurrentTime() {
				const now = new Date();
				const hours = now.getHours().toString().padStart(2, '0');
				const minutes = now.getMinutes().toString().padStart(2, '0');
				return `${hours}:${minutes}`;
			}
		}
	}
</script>

<style lang="scss" scoped>
.chat-container {
	height: 100vh;
	display: flex;
	flex-direction: column;
	background: #f5f5f5;
}

.message-list {
	flex: 1;
	padding: 20rpx;
	box-sizing: border-box;
}

.loading {
	text-align: center;
	color: #999;
	font-size: 24rpx;
	padding: 20rpx 0;
}

.message-item {
	display: flex;
	margin: 30rpx 0;
	
	&.user {
		flex-direction: row-reverse;
		
		.message-content {
			align-items: flex-end;
			margin-right: 20rpx;
			margin-left: 0;
		}
		
		.bubble {
			background: #95ec69;
			border-top-right-radius: 4rpx;
		}
	}
	
	&.other {
		.message-content {
			align-items: flex-start;
			margin-left: 20rpx;
			margin-right: 0;
		}
		
		.bubble {
			background: #fff;
			border-top-left-radius: 4rpx;
		}
	}
}

.avatar {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	background: #eee;
}

.message-content {
	display: flex;
	flex-direction: column;
	max-width: 60%;
}

.bubble {
	padding: 20rpx;
	border-radius: 12rpx;
	font-size: 28rpx;
	line-height: 1.5;
	word-break: break-word;
	white-space: pre-wrap;
}

.time {
	font-size: 24rpx;
	color: #999;
	margin-top: 8rpx;
}

.input-area {
	padding: 20rpx;
	background: #fff;
	border-top: 1rpx solid #eee;
	display: flex;
	align-items: center;
}

.input-box {
	flex: 1;
	display: flex;
	align-items: center;
	background: #f5f5f5;
	border-radius: 8rpx;
	padding: 0 20rpx;
	margin-right: 20rpx;
}

.input {
	flex: 1;
	height: 72rpx;
	font-size: 28rpx;
}

.emoji-btn {
	padding: 10rpx;
}

.send-btn {
	background: #07c160;
	color: #fff;
	padding: 0 30rpx;
	height: 72rpx;
	line-height: 72rpx;
	border-radius: 8rpx;
	font-size: 28rpx;
}

:deep(.uni-navbar__header-container-inner) {
	align-items: flex-end !important;
	margin-bottom: 20rpx;
}

:deep(.uni-navbar__header-btns-left) {
	align-items: flex-end !important;
	margin-bottom: 20rpx;
}

:deep(.uni-navbar--border) {
	border-bottom-color: #f5f5f5 !important;
}

:deep(.uni-navbar__header) {
	background-color: #f5f5f5 !important;
}
</style>
