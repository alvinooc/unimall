<template>
  <view>
    <!-- navTab -->
    <view class="tabControl">
      <block v-for="(item, index) in ['全部', '待付款', '待收获', '待评价']"
             :key="index">
        <view class="tab-control-item"
              :class="{active: currentIndex === index}"
              @click="handelTabControl(index)">
          <text>{{item}}</text>
        </view>
      </block>
    </view>

    <!-- 订单列表 -->
    <view class="order-list">
      <!-- 有数据 -->
    <view class="order-item"
          v-for="(item, index) in orderList" 
          :key="index">
      <!-- 订单创建时间及状态 -->
      <view class="order-item-top">
        <text class="createTime">{{item.create_time_text}}</text>
        <text class="order-status">
          {{item.state_tip}}
          <text class="yticon icon-iconfontshanchu1"
                v-if="item.status === -1"
                @click="handleDelOrder(item.order_sn)"/>
        </text>
      </view>

      <!-- 商品信息 -->
      <navigator class="goods-item"
                  :url="'/pages/order/OrderDetail?order_sn=' + item.order_sn">
        <image :src="item.products[0].images[0]"/>
        <view class="goods-info">
          <view class="goods-title">{{item.products[0].title}}</view>
          <view class="goods-price">{{item.products[0].attributes}} x {{item.products[0].quantity}}</view>
          <view class="goods-type">¥ {{item.products[0].product_price}}</view>
        </view>
      </navigator>

      <!-- 商品总数与总金额-->
      <view class="total">
        <text class="total-count">共 1 件商品 实付款</text>
        <text>¥ {{item.order_price}}</text>
      </view>

      <!-- 取消/支付 -->
      <view class="status-select" v-if="item.status === 0">
        <button size="mini"
                class="cancel" 
                @click="handleCancelOrder(item.order_sn)">
          取消订单
        </button>
        <button size="mini"
                class="payNow"
                @click="handlePayNow(item.order_sn)">
          立即支付
        </button>
      </view>
    </view>

    <!-- 无数据 -->
    <view class="null" 
          v-if="orderInfo.total === 0">
      <image src="@/static/img/profile/msg.png"/>
    </view>

    <!-- 底部 -->
    <view class="more" v-if="isShow">
      上拉显示更多
    </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'Order',
    data() {
      return {
        orderInfo: {},
        orderList: [],
        page: 1,
        state: 0,
        currentIndex: 0,
        isShow: false
      }
    },
    onLoad(option) {
      // console.log(option)
      this.state = option.state
      this._getOrderInfo(this.state , this.page)
    },
    // 上拉加载
    onReachBottom() {
      this.page += 1
      this._getOrderInfo(this.state , this.page)
      if (this.orderInfo.data.length === 0) {
        console.log('----')
        this.isShow = true
      }
    },
    methods: {
      // 获取订单信息
      async _getOrderInfo(state, page) {
        uni.showLoading({
          title: '加载中'
        })
        const data = await this.$http.profileOrder(state, page)
        const res = data.data.data
        this.orderInfo = res
        // console.log(this.orderInfo.data.length)
        this.orderList.push(...res.data)
         console.log(this.orderList)
        uni.hideLoading()
      },
      // navTab 切换
      handelTabControl(index) {
        if (this.currentIndex !== index) {
          this.currentIndex = index
          this.orderList = []
          this._getOrderInfo(index, this.page)
        }
      },
      // 立即支付
      handlePayNow(params) {
        uni.navigateTo({
          url: '/pages/payment/Payment?order_sn=' + params
        })
      },
      // 取消订单
      handleCancelOrder(params) {
        const _this = this
        uni.showModal({
          content: '确认取消订单吗？',
          success: async function (res) {
            if (res.confirm) {
              // console.log(_this)
              await _this.$http.cancelOrder({order_sn: params})
              _this.orderList = []
              // console.log(this.orderList)
              _this._getOrderInfo(this.state , this.page)
            }
          }
        })
      },
      // 删除订单
      handleDelOrder(params) {
        // console.log(params)
        const _this = this
        uni.showModal({
          content: '确认删除订单吗？',
          success: async function (res) {
            if (res.confirm) {
              // console.log(_this)
              await _this.$http.delOrder({order_sn: params})
              _this.orderList = []
              _this._getOrderInfo(this.state , this.page)
            }
          }
        })
      }
    }
  }
</script>

<style lang='scss' scoped>
  page {
    background-color: #f7f7f7;
  }

  .tabControl {
    display: flex;
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    z-index: 1;
    background: #fff;
    font-size: 15px;
    color: #303133;
    .tab-control-item {
      position: relative;
      flex: 1;
      text-align: center;
      padding: 20upx 0;
    }
    .active {
      color: #fa436a;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 45px;
        border-bottom: 2px solid #fa436a;
      }
    }
  }

 
  .order-list {
    margin-top: 41px;
    width: 100%;
  }
  .order-item {
    margin-top: 16upx;
    padding: 0 30upx;
    background-color: #fff;
    color: #303133;
    font-size: 12px;
    .order-item-top {
      display: flex;
      justify-content: space-between;
      padding: 20upx 0;
      border-bottom: 2px solid #f7f7f7;
      .order-status {
        color: #888;
        text {
          padding: 4px 0 4px 15px;
          font-size: 13px;
          color: #909399;
          position: relative;
          &::after {
            content: "";
            width: 0;
            height: 12px;
            border-left: 1px solid #dcdfe6;
            position: absolute;
            left: 8px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
        .icon-iconfontshanchu1::before {
          content: "\E619";
        }
      }
    }
    .goods-item {
      display: flex;
      padding: 20upx 0;
      // padding: 20upx 25upx;
      image {
        width: 120upx;
        height: 120upx;
      }
      .goods-info {
        width: 72%;
        flex: 1;
        margin-left: 24upx;
        .goods-title {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .goods-price{
          padding: 10upx 14upx;
          color: #909399;
        }
        .goods-type {
          padding-left: 10upx;
        }
      }
    }
    .total {
      padding: 20upx 0;
      text-align: right;
      border-bottom: 2px solid #f7f7f7;
      .total-count {
        margin-right: 10upx;
        color: #909399;
      }
    }
    .status-select {
      padding: 14upx 0;
      text-align: right;
      button {
        padding: 0 24upx;
        font-size: 12px;
        border-radius: 100px;
      }
      .cancel {
        margin-right: 25upx;
        background-color: #fff;
        color: #303133;
      }
      .payNow {
        background: #fff8f8;
        color: #fb6c87;
      }
    }
  }
  .null {
    image {
      display: block;
      width: 240upx;
      height: 240upx;
      margin: 300upx auto;
    }
  }

  .more {
    margin: 20upx 0;
    text-align: center;
    font-size: 12px;
    color: #777;
  }
</style>