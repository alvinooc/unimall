<template>
  <view class="size" v-if="Object.keys(goodsType).length !== 0">
    <view class="type-title">{{goodsType.type}}</view>
    <text
      v-for="(item, index) in goodsType.options"
      :key="index"
      class="type-item"
      :class="{active: currentSizeIndex === index}"
      @click="handleClick(index, item)"
    >{{item}}</text>
  </view>
</template>

<script>
  export default {
    name: "GoodsType",
    data() {
      return {
        currentSizeIndex: 0
      }
    },
    props: {
      goodsType: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      handleClick(index, item) {
        this.currentSizeIndex = index
        this.$emit('handleClick', index, item)
      }
    }
  };
</script>

<style lang='scss' scoped>
  .size {
    font-size: 32upx;
    margin: 18upx 0;
    margin-bottom: 40upx;
    .type-title {
      margin-bottom: 10upx;
    }
    .type-item {
      display: inline-block;
      margin: 20upx 20upx 0 0;
      padding: 10upx 26upx;
      background-color: #eee;
      border-radius: 33upx;
    }
    .active {
      color: #e7536d;
      background-color: #f9ecee;
    }
  }
</style>