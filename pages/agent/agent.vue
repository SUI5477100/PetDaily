<template>
  <view class="chat-container">
    <uni-nav-bar left-icon="left" title="养宠小助手" @clickLeft="back" height="160rpx" />
    <!-- 聊天消息区域 -->
    <scroll-view
      class="message-list"
      scroll-y
      :scroll-into-view="scrollInto"
      scroll-with-animation
    >
      <view
        v-for="(msg, index) in messages"
        :key="index"
        :id="'msg-' + index"
        :class="['message-item', msg.role === 'user' ? 'user' : 'assistant']"
      >
        <view class="bubble">{{ msg.content }}</view>
      </view>
    </scroll-view>

    <!-- 输入栏 -->
    <view class="input-bar">
      <input
        v-model="inputValue"
        class="input-box"
        placeholder="输入消息..."
        @confirm="sendMessage(false)"
      />
      <button class="send-btn" @click="sendMessage(true)">发送</button>
    </view>
  </view>
</template>

<script>
import api from '../../utils/api.js'

export default {
  data() {
    return {
      messages: [
        { role: 'assistant', content: '您好，我是宠物助手，有什么可以帮您？' }
      ],
      inputValue: '',
      scrollInto: ''
    }
  },
  methods: {
    back() {
				uni.switchTab({
					url: '/pages/master/master'
				});
			},
    async sendMessage(showToast = true) {
      const text = this.inputValue.trim()
      if (!text) {
        if (showToast) {
          uni.showToast({ title: '消息不能为空', icon: 'none' })
        }
        return
      }

      // 1. 把用户输入推到界面上
      this.messages.push({ role: 'user', content: text })
      this.scrollToBottom()

      // 2. 清空输入框
      this.inputValue = ''

      try {
        // 3. 真正调用后端 askChatGPT
        //    我们把整个对话 history 传给后端，让模型能上下文连贯
        const res = await api.askChatGPT(this.messages)

        if (res.success) {
          // 4a. 成功：把 AI 的回复显示出来
          this.messages.push({
            role: 'assistant',
            content: res.reply
          })
        } else {
          // 4b. 后端返回了错误状态
          this.messages.push({
            role: 'assistant',
            content: 'AI 服务异常：' + (res.message || '未知错误')
          })
        }
      } catch (err) {
        // 5. 网络或其它异常
        console.error('askChatGPT 调用失败', err)
        this.messages.push({
          role: 'assistant',
          content: '请求失败，请稍后重试'
        })
      } finally {
        // 6. 滚动到底部
        this.scrollToBottom()
      }
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const lastIndex = this.messages.length - 1
        this.scrollInto = `msg-${lastIndex}`
      })
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

.message-item {
  display: flex;
  margin: 30rpx 0;

  &.user {
    justify-content: flex-end; // 用户消息靠右
  }

  &.assistant {
    justify-content: flex-start; // AI消息靠左
  }
}

.bubble {
  max-width: 75%;
  padding: 20rpx;
  border-radius: 12rpx;
  line-height: 1.5;
  word-break: break-word;
  white-space: pre-wrap;
  font-size: 28rpx;

  // 用户气泡样式
  .message-item.user & {
    background: #95ec69;
    border-top-right-radius: 4rpx; // 右侧尖角
    margin-right: 20rpx;
  }

  // AI气泡样式
  .message-item.assistant & {
    background: #fff;
    border-top-left-radius: 4rpx; // 左侧尖角
    margin-left: 20rpx;
  }
}

.input-bar {
  display: flex;
  padding: 20rpx;
  background: #fff;
  border-top: 1rpx solid #eee;

  .input-box {
    flex: 1;
    margin-right: 20rpx;
    padding: 12rpx 20rpx;
    border: 1rpx solid #ddd;
    border-radius: 8rpx;
  }

  .send-btn {
    background: #07c160;
    color: white;
    padding: 0 30rpx;
    border-radius: 8rpx;
    font-size: 28rpx;
  }
}
::v-deep .uni-navbar__header-container-inner {
	align-items: flex-end !important;
	margin-bottom: 20rpx;
}

::v-deep .uni-navbar__header-btns-left {
	align-items: flex-end !important;
	margin-bottom: 20rpx;
}

::v-deep .uni-navbar--border {
	border-bottom-color: #f5f5f5 !important;
}

::v-deep .uni-navbar__header {
	background-color: #f5f5f5 !important;
}
</style>