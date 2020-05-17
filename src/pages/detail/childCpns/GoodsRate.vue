<template>
  <view v-if="Object.keys(goodsRateInfo).length !== 0" class="goods-rate">
    <view class="rate-title">
      <view>
        <text class="rate">评价</text>
        ({{goodsRateInfo.total}})
      </view>
      <view>好评率 {{goodsRateInfo.good_review}}</view>
    </view>
    <view class="rate-content">
      {{rateContent}}
    </view>
  </view>
</template>

<script>
  export default {
    name: 'GoodsRate',
    props: {
      goodsRateInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      rateContent() {
        return this.goodsRateInfo.data.length !== 0 ? this.goodsRateInfo.data : '没有了'
      }
    }
  }
</script>

<style lang='scss' scoped>
  .goods-rate {
    padding: 20upx;
    font-size: 32upx;
    border-bottom: 20upx solid #f8f8f8;
    .rate-title {
      display: flex;
      justify-content: space-between;
      color: #919399;
      .rate {
        color: #303133;
      }
    }
    .rate-content {
      padding: 30upx 0;
      text-align: center;
    }
  }
</style>