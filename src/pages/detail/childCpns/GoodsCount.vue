<template>
  <view class="goods-count">
    <text>数量</text>
    <view class="count">
      <view class="subtract" @click="substract">-</view>
      <text>{{this.$store.state.count}}</text>
      <view class="add" @click="add">+</view>
    </view>
  </view>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'GoodsCount',
    methods: {
      ...mapMutations(['increment', 'decrement']),
      add() {
        this.increment()
      },
      substract() {
        this.decrement()
      }
    }
  }
</script>

<style lang='scss' scoped>
  .goods-count {
    display: flex;
    justify-content: space-between;
    border-bottom: 20upx solid #f8f8f8;
    font-size: 32upx;
  }

  .count {
    display: flex;
    align-items: center;
    text {
      width: 30upx;
      margin: 0 20upx;
      text-align: center;
    }
  }

  .subtract, .add {
    width: 40upx;
    height: 40upx;
    line-height: 40upx;
    text-align: center;
    color: #fff;
    border-radius: 50%;
    background-color: #e7536d;
  }
</style>