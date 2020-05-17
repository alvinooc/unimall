<template>
  <div>
    <block v-for="(item, index) in products" :key="index">
      <view class="products-item">
        <view class="title">
          <text>{{item.title}}</text>
          <image src="@/static/img/home/rectangle.png" />
        </view>
        <scroll-view scroll-x>
          <view class="product">
            <block v-for="(pro, indey) in item.products" :key="indey">
              <navigator :url="'/pages/detail/Detail?id=' + pro.id " class="product-item">
                <view>
                  <image :src="pro.image[0]" mode="widthFix" />
                  <view class="product-info">{{pro.title}}</view>
                  <view class="product-price"> ¥ {{pro.price}}</view>
                </view>
              </navigator>
            </block>
            <navigator class="product-item"
                       :url="'/pages/product/Product?id=' + item.target">
              <view class="allPro">
                <text>查看全部</text>
                <text>More+</text>
              </view>
            </navigator>
          </view>
        </scroll-view>
      </view>
    </block>
  </div>
</template>

<script>
export default {
  name: "HomeProducts",
  props: {
    products: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .products-item {
    border-bottom: 20upx solid #f5f5f5;
    overflow: hidden;
    .title {
      display: flex;
      align-items: center;
      padding: 16upx;
      font-size: 34upx;
      letter-spacing: 8upx;
      border-bottom: 6upx solid #f1f1f1;
      image {
        width: 8upx;
        height: 30upx;
        margin-left: 10upx;
      }
    }
    .product {
      display: flex;
      padding-left: 30upx;
      margin-top: 20upx;
      .product-item {
        width: 242upx;
        padding-right: 30upx;
        image {
          width: 100%;
          height: 204upx!important;
          margin-bottom: 20upx;
        }
        .product-info {
          width: 204upx;
          text-overflow: ellipsis;
          white-space: pre;
          overflow: hidden;
          font-size: 20upx;
          color: #555555;
        }
        .product-price {
          margin-top: 12upx;
          margin-bottom: 30upx;
          color: #fa265f;
          font-size: 20upx;
        }
      }
      .allPro {
        width: 204upx;
        height: 134upx;
        padding-top: 70upx;
        text-align: center;
        font-size: 32upx;
        color: #898c92;
        background-color: #f1f1f1;
      }
    }
  }
</style>