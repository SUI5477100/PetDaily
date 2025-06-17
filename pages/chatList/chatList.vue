<template>
	<view class="chat-list">
		<uni-nav-bar left-icon="left" title="消息" @clickLeft="back" height="160rpx" />
		
		<!-- <view class="search-box">
			<u-search v-model="searchText" placeholder="搜索" :show-action="false" height="70rpx"></u-search>
		</view> -->

		<scroll-view scroll-y class="chat-scroll">
			<view class="chat-item" v-for="(item, index) in chatList" :key="index" @click="goToChat(item)">
				<view class="avatar-box">
					<image class="avatar" :src="item.avatar" mode="aspectFill"></image>
					<view v-if="item.unread" class="unread-badge">{{item.unread}}</view>
				</view>
				<view class="content">
					<view class="top">
						<text class="name">{{item.name}}</text>
						<text class="time">{{item.lastTime}}</text>
					</view>
					<view class="bottom">
						<text class="message">{{item.lastMessage}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchText: '',
				chatList: [
					{
						id: 1,
						name: '鱼烧哥',
						avatar: 'https://www.serverzhu.com/petImg/kax67qzcGAfl709cad6f351ba003ebfeb4df6b33e2ad.png',
						lastMessage: '你好，最近怎么样？',
						lastTime: '12:30',
						unread: 2
					},
					// {
					// 	id: 2,
					// 	name: '李四',
					// 	avatar: 'https://www.serverzhu.com/petImg/avatar.png',
					// 	lastMessage: '周末一起去看电影吧',
					// 	lastTime: '昨天',
					// 	unread: 0
					// },
					// {
					// 	id: 3,
					// 	name: '王五',
					// 	avatar: 'https://www.serverzhu.com/petImg/avatar.png',
					// 	lastMessage: '好的，没问题',
					// 	lastTime: '周一',
					// 	unread: 5
					// }
				]
			}
		},
		methods: {
			back() {
				uni.navigateBack();
			},
			goToChat(item) {
				uni.navigateTo({
					url: `/pages/chat/chat?id=${item.id}&name=${item.name}`
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.chat-list {
	height: 100vh;
	background-color: #f5f5f5;
}

.search-box {
	padding: 20rpx;
	background-color: #fff;
}

.chat-scroll {
	height: calc(100vh - 180rpx);
}

.chat-item {
	display: flex;
	padding: 20rpx;
	background-color: #fff;
	border-bottom: 1rpx solid #eee;
	
	&:active {
		background-color: #f9f9f9;
	}
}

.avatar-box {
	position: relative;
	margin-right: 20rpx;
}

.avatar {
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	background-color: #eee;
}

.unread-badge {
	position: absolute;
	top: -10rpx;
	right: -10rpx;
	background-color: #ff4d4f;
	color: #fff;
	font-size: 24rpx;
	min-width: 36rpx;
	height: 36rpx;
	border-radius: 18rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 8rpx;
}

.content {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.top {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10rpx;
}

.name {
	font-size: 32rpx;
	color: #333;
	font-weight: 500;
}

.time {
	font-size: 24rpx;
	color: #999;
}

.bottom {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.message {
	font-size: 28rpx;
	color: #666;
	width: 400rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
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
