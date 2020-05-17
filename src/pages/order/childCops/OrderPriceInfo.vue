<template>
  <view v-if="Object.keys(priceInfo).length !== 0">
    <view class="info">
      <text class="info-left">商品金额</text>
      <text  class="info-right">¥ {{priceInfo.order_price}}</text>
    </view>
    <view class="info">
      <text class="info-left">优惠金额</text>
      <text  class="discount_price">- ¥ {{priceInfo.discount_price}}</text>
    </view>
    <view class="info">
      <text class="info-left">运费</text>
      <text  class="info-right">¥ 免运费</text>
    </view>
    <view class="info">
      <text class="info-left">备注</text>
      <input type="text"
             placeholder="请填写备注信息" 
             class="remark-info"
             placeholder-style="font-size: 12px;color: #999">
    </view>
  </view>
</template>

<script>
  export default {
    name: 'OrderPriceInfo',
    props: {
      priceInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 25upx;
    padding: 20upx 25upx;
    padding-left: 0;
    border-bottom: 4upx solid #f7f7f7;
    color: #909399;
    font-size: 30upx;
    .info-right {
      color: #303133;
    }
    .discount_price {
      color: #fa436a;
    }
    .remark-info {
      flex: 1;
      margin-left: 40upx;
      color: #303133;
      font-size: 24upx;
    }
  }
</style>
