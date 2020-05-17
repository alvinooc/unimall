<template>
  <view v-if="Object.keys(orderDetail).length !== 0" class="order-detail">
    <!-- 商品信息 -->
    <view class="goods-info">
      <image :src="goodsInfo.images"/>
      <view class="goods-info-middle">
        <view class="top">{{goodsInfo.title}}</view>
        <view class="bottom">{{goodsInfo.attributes}}</view>
      </view>
      <view class="goods-info-right">
        <view class="goods-right-top">{{goodsInfo.price}}</view>
        <view class="goods-right-bottom">x {{goodsInfo.quantity}}</view>
      </view>
    </view>

    <!-- 订单信息 -->
    <view class="order-info">
      <view class="order-info-item"
            v-for="(item, index) in orderInfo"
            :key="index">
        <text class="order-item-title">{{item.title}}</text>
        <text class="order-item-info">{{item.info}}</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'OrderDetail',
    data() {
      return {
        orderDetail: {}
      }
    },
    onLoad(option) {
      this._getOrderDetail(option.order_sn)
    },
    computed: {
      // 商品信息
      goodsInfo() {
        return {
          images: this.orderDetail.products[0].images[0],
          title: this.orderDetail.products[0].title,
          attributes: this.orderDetail.products[0].attributes,
          price: this.orderDetail.products[0].price,
          quantity: this.orderDetail.products[0].quantity
        }
      },
      // 订单信息
      orderInfo() {
        return [
          {
            title: '订单编号',
            info: this.orderDetail.order_sn
          },
          {
            title: '订单状态',
            info: this.orderDetail.state_tip
          },
          {
            title: '商品总价',
            info: '¥ ' + this.orderDetail.products_price
          },
          {
            title: '运费',
            info: '¥ ' + this.orderDetail.delivery_price
          },
          {
            title: '优惠',
            info: '- ¥ ' + this.orderDetail.discount_price
          },
          {
            title: '订单总价',
            info: '¥ ' + this.orderDetail.order_price
          },
          {
            title: '实付款',
            info: '¥ ' + this.orderDetail.payed_price
          },
        ]
      }
    },
    methods: {
      // 获取订单详情信息
      async _getOrderDetail(params) {
        const res = await this.$http.payAmount(params)
        this.orderDetail = res.data.data
        console.log(res.data.data)
      }
    }
  }
</script>

<style lang='scss' scoped>
  .order-detail {
    .goods-info {
      display: flex;
      justify-content: space-between;
      padding: 4px;
      font-size: 12px;
      image {
        width: 236upx;
        height: 236upx;
      }
      .goods-info-middle {
        width: 48%;
        padding: 4px;
      }
      .goods-info-right{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .goods-right-top {
        color: #555;
      }
      .goods-right-bottom {
        margin: 4px 0;
        color: #808080;
      }
    }
    .order-info {
      padding: 8px;
      .order-info-item {
        display: flex;
        justify-content: space-between;
        margin: 8px 0;
        font-size: 12px;
        color: #808080;
        &:last-child {
          padding-top: 6px;
          border-top: 1px solid #ccc;
          color: #444;
          font-weight: bold;
        }
        &:nth-last-child(2) {
          color: #555;
        }
        &:nth-last-child(3) {
          color: #fa436a;
        }
      }
    }
  }
</style>