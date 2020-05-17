<template>
  <view class="product-tab">
    <block v-for="(item, index) in titles" :key="index">
      <view class="item"
            :class="{active: currentIndex === index}"
            @click="handleClick(index)">
        <text>{{item}}</text>
        <view class="price"
              v-if="index === titles.length - 1">
          <view class="up" :class="{arrowColor: priceOrder === 1}"></view>
          <view class="down" :class="{arrowColor: priceOrder === 2}"></view>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
  export default {
    name: 'ProductTab',
    data() {
      return {
        titles: ['综合排序', '销量优先', '价格'],
        currentIndex: 0
      }
    },
    props: {
      priceOrder: {
        type: Number,
        default() {
          return 0
        }
      }
    },
    methods: {
      handleClick(index) {
        this.currentIndex = index
        this.$emit('clickChangeSort', index)
      }
    }
  }
</script>

<style lang='scss' scoped>
  $color: #fa436a;
  $font-color: #303133;
  $font-size: 12px;

  .product-tab {
    display: flex;
    .item {
      flex: 1;
      position: relative;
      padding: 20upx 0;
      text-align: center;
      font-size: $font-size;
      color: $font-color;
      &:last-child {
        text {
          margin-right: 16upx;
        }
      }
      .price {
        position: absolute;
        right: 78upx;
        bottom: 30upx;
        width: 8px;
        height: 8px;
        .up, .down {
          width: 3px;
          height: 3px;
          border-right: 1px solid $font-color;
        }
        .up {
          border-top: 1px solid $font-color;
          transform: rotate(-45deg);
        }
        .down {
          margin-top: -1px;
          border-bottom: 1px solid $font-color;
          transform: rotate(45deg);
        }
        .arrowColor {
          border-color: $color;
        }
      }
    }
    .active {
      color: $color;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 55px;
        border-bottom: 1px solid $color;
      }
    }
  }
</style>