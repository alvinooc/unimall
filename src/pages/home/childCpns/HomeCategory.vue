<template>
  <view class="category">
    <block v-for="(item, index) in cateInfo" :key="index">
      <navigator class="category-item" 
                 :url="'/pages/product/Product?id=' + item.target">
        <view>
          <image :src="item.image"/>
          <view>{{item.title}}</view>
        </view>
      </navigator>
    </block>
  </view>
</template>

<script>
  export default {
    name: 'HomeCategory',
    props: {
      cateInfo: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .category {
    display: flex;
    text-align: center;
    .category-item {
      flex: 1;
      font-size: 24upx;
      image {
        width: 88upx;
        height: 88upx;
      }
    }
  }
</style>