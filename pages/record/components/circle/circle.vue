<template>
  <view class="content" :class="{ active: active }" @click="handleClick">
    <div class="circle"></div>
    <slot></slot>
    <div class="circle"></div>
  </view>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick() {
      // 触发父组件的事件，通知父组件切换插槽
      this.$emit('click');
    }
  }
};
</script>

<style scoped>
.content {
  background-color: #fff;
  width: 100%;
  height: 100%;
  border-radius: 100rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: #000 4rpx solid;
}

.content.active {
  background-color: #ffeb3b; /* 激活时的背景颜色 */
}

.circle {
  width: 15rpx;
  height: 15rpx;
  border-radius: 100rpx;
  background-color: #fff1b4;
  border: #000 4rpx solid;
}
</style>
