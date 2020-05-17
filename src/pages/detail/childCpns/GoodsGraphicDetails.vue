<template>
  <view class="graphic-details">
    <view class="line"></view>
    <view class="title">图文详情</view>
    <view class="line"></view>
  </view>
</template>

<script>
  export default {
    name: 'GoodsGraphicDetails'
  }
</script>

<style lang='scss' scoped>
  .graphic-details {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 26upx;
    padding-bottom: 210upx;
    font-size: 32upx;
    .line {
      width: 80upx;
      height: 6upx;
      background-color: #ccc;
    }
    .title {
      margin: 0 20upx;
    }
  }
</style>