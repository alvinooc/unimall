<template>
  <view>
    <!-- 支付金额 -->
    <view class="payAmount">
      <text class="name">支付金额</text>
      <text class="price">{{priceInfo.products_price}}</text>
    </view>

    <!-- 支付方式 -->
    <view class="payWay">
      <text class="icon yticon icon-alipay"></text>
      <text class="payWayName">支付宝支付</text>
      <radio checked color="#f93a5f"/>
    </view>

    <!-- 确认支付 -->
    <button class="confirm">确认支付</button>
  </view>
</template>

<script>
  export default {
    name: 'Payment',
    data() {
      return {
        priceInfo: ''
      }
    },
    onLoad(option) {
      this._getPayAmount(option)
    },
    methods: {
      // 获取支付信息
      async _getPayAmount(params) {
        const res = await this.$http.payAmount(params.order_sn)
        this.priceInfo = res.data.data
        console.log(this.priceInfo)
      }
    }
  }
</script>

<style lang='scss' scoped>
  .payAmount {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 270upx;
    .name {
      font-size: 12px;
      color: #909399;
    }
    .price {
      display: block;
      margin-top: 5px;
      font-size: 21px;
      color: #303133;
      &::before {
        content: "\FFE5";
        font-size: 17px;
      }
    }
  }

  .payWay {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    margin-left: 25px;
    padding: 8px 25px 8px 0;
    border-bottom: 2px solid #f7f7f7;
    .icon-alipay::before {
      content: "\E636";
      color: #01aaef;
      font-size: 22px;
    }
    .payWayName {
      margin-left: -250upx;
      font-size: 13px;
    }
  }

  .confirm {
    margin: 75upx 55upx;
    font-size: 13px;
    color: #fff;
    background-color: #f93a5f;
  }
</style>