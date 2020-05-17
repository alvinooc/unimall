<template>
  <view class="product-list">
    <block v-for="(item, index) in goodsList" :key="index">
      <navigator :url="'/pages/detail/Detail?id=' + item.id " class="product">
        <image :src="item.image[0]"/>
        <view class="product-title">{{item.title}}</view>
        <view class="product-info">
          <text class="product-price">¥ {{item.skus[0].price}}</text>
          <text class="product-sold-count">已售 {{item.skus[0].sold_count}}</text>
        </view>
      </navigator>
    </block>
  </view>
</template>

<script>
  export default {
    name: 'ProductList',
    props: {
      goodsList: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  .product-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 20upx;
    .product {
      width: 48%;
      padding-bottom: 40upx;
      font-size: 32upx;
      image {
        display: block;
        width: 100%;
        height: 340upx;
        border-radius: 3px;
      }
      .product-title {
        padding: 10upx 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .product-info {
        display: flex;
        justify-content: space-between;
        padding: 0 10upx;
        color: #909399;
        .product-price {
          color: #fa436a;
        }
      }
    }
  }
</style>
