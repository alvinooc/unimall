<template>
  <view class="goods">
    <block v-for="(item, index) in goodsInfo" :key="index">
      <view class="goods-item">
        <image :src="item.product.image[0]"/>
        <view class="goods-info">
          <view class="goods-title">{{item.product.title}}</view>
          <view class="goods-type">{{item.sku.value}}</view>
          <view class="goods-price">{{item.sku.price}} x {{item.quantity}}</view>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
  export default {
    name: 'OrderGoodsInfo',
    props: {
      goodsInfo: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  .goods {
    background-color: #fff;
  }
  .goods-item {
      display: flex;
      padding: 20upx 25upx;
      image {
        width: 140upx;
        height: 140upx;
      }
      .goods-info {
        width: 72%;
        flex: 1;
        margin-left: 40upx;
        font-size: 24upx;
        color: #303133;
        .goods-title {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .goods-type {
          margin: 16upx 0;
          color: #909399;
        }
      }
    }
</style>