<template>
  <view id="order-submit">
    <view class="real-payment">
      实付款 <text>¥ {{realPayment}}</text>
    </view>
    <view class="submit" @click="handleSubmit">提交订单</view >
  </view>
</template>

<script>
  export default {
    name: 'OrderSubmit',
    props: {
      realPayment: {
        type: [String, Number],
        default() {
          return '' || 0
        }
      }
    },
    methods: {
      handleSubmit() {
        this.$emit('handleSubmit')
      }
    }
  }
</script>

<style lang='scss' scoped>
  #order-submit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .real-payment {
      margin-left: 20upx;
      color: #606266;
      font-size: 24upx;
      text {
        margin-left: 20upx;
        font-size: 15px;
        color: #f2436a;
      }
    }
    .submit {
      padding: 24upx 80upx;
      background-color: #f2436a;
      font-size: 32upx;
      color: #fff;
    }
  }
</style>