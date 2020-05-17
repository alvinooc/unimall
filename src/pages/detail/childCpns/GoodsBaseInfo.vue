<template>
  <view class="goodsInfo" v-if="Object.keys(goodsInfo).length !== 0">
    <view class="goods-title">{{goodsInfo.title}}</view>
    <view class="goods-price">
      <text class="realPrice">¥ {{goodsInfo.price}}</text>
      <text class="oldPrice">{{oldPrice}}</text>
    </view>
    <view>
      <text class="sale">销量： {{goodsInfo.on_sale}} 个</text>
      <text class="stock">库存: {{stock}} 个</text>
    </view>
  </view>
</template>

<script>
  export default {
    name: "GoodsBaseInfo", 
    props: {
      goodsInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      oldPrice() {
        return this.goodsInfo.skus[0].market_price
      },
      stock() {
        return this.goodsInfo.skus[0].stock
      }
    }
  }
</script>

<style lang='scss' scoped>
  .goodsInfo {
    padding: 20upx;
    line-height: 52upx;
    font-size: 20upx;
    color: #919399;
    .goods-title {
      font-size: 34upx;
      color: #303133;
    }
    .goods-price {
      margin: 10upx;
      .realPrice {
        color: #f20;
        font-size: 34upx;
      }
      .oldPrice {
        margin-left: 18upx;
        text-decoration: line-through;
      }
    }
    .stock {
      margin-left: 200upx;
    }
  }
</style>