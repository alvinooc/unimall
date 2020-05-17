<template>
  <view>
    <!-- 地址 -->
    <order-address :address="defaultAddress" class="item"/>

    <!-- 商品信息 -->
    <order-goods-info :goods-info="goodsInfo" class="item"/>

    <!-- 商品价格信息 -->
    <order-price-info :price-info="priceInfo" class="item"/>

    <!-- 底部提交 -->
    <order-submit :real-payment="priceInfo.order_price"
                  @handleSubmit="handleSubmit"
                  class="submit"/>
  </view>
</template>

<script>
  import OrderGoodsInfo from './childCops/OrderGoodsInfo'
  import OrderAddress from './childCops/OrderAddress'
  import OrderPriceInfo from './childCops/OrderPriceInfo'
  import OrderSubmit from './childCops/OrderSubmit'
  
  import { mapState } from 'vuex'

  export default {
    name: 'CreateOrder',
    components: {
      OrderGoodsInfo,
      OrderAddress,
      OrderPriceInfo,
      OrderSubmit
    },
    data() {
      return {
        // 商品信息
        goodsInfo: [],
        // 价格信息
        priceInfo: {},
        // 地址 id
        id: 0,
        // 判断详情页/购物车提交订单
        flag: true,
        address_id: null
      }
    },
    onLoad(option) {
      if (option.address_id) this.address_id = option.address_id
      // console.log(this.address_id)
      this.getGoodsInfo(option)
    },
    computed: {
      ...mapState(['address']),
      // 默认地址
      defaultAddress() {
        // 查找是否有默认地址，有就返回默认地址，无则返回第一个地址
        const is_default = this.address.find(item => item.is_default) 
        if (this.address_id) {
          return this.address.filter(item => item.id == this.address_id)[0]
        } else if (is_default) {
          return this.address.filter(item => item.is_default === 1)[0]
        } else {
          return this.address[0]
        }
      }
    },
    methods: {
      // 详情页获取商品信息
      async _getDetailGoodsInfo(params) {
        const res = await this.$http.detailToOrder(params)
        if (res.statusCode === 200) {
          this.goodsInfo = res.data.data
          // console.log(this.goodsInfo)
        }
      },
      // 购物车页获取商品信息
      async _getCartGoodsInfo(params) {
        const res = await this.$http.cartToOrder(params)
        this.goodsInfo = res.data.data
        console.log(this.goodsInfo)
      },
      // 获取商品金额
      async _getGoodsPrice(params) {
        const res = await this.$http.getPrice(params)
        if (res.statusCode === 200) {
          this.priceInfo = res.data.data
          // console.log(this.priceInfo)
        }
      },
      // 显示购物车/详情页的商品信息
      async getGoodsInfo(option) {
        // 获取地址信息
        await this.$store.dispatch('_getAddress')
        // 获取地址 id
        this.id = this.defaultAddress.id
        // 判断是否有参数，有就表示详情页，无则表示购物车  
        if (Object.keys(option).length !== 0) {
          this._getDetailGoodsInfo(option)
          this._getGoodsPrice({
            address_id: this.id,
            desc: '',
            quantity: option.quantity,
            sku_id: option.sku_id
          })
        } else {
          this.flag = false
          let ids = uni.getStorageSync('ids')
          if (ids) {
            this._getCartGoodsInfo({ids})
          }
          this._getGoodsPrice({
            address_id: this.id,
            desc: ''
          })
        }
      },
      // 提交订单
      handleSubmit() {
        console.log(this.goodsInfo)
        // 提交订单接口参数
        let params = {}
        if (this.flag) {
          // 详情页提交订单
          params = {
            address_id: this.id,
            quantity: this.goodsInfo[0].quantity ,
            sku_id: this.goodsInfo[0].sku.id ,
            remark: "eeee"
          }
          console.log(params)
          this.$http.submitOrder(params).then(res => {
          console.log(res)
          const data = res.data.data
            uni.navigateTo({
              url: '/pages/payment/Payment?order_sn=' + data
            })
          })
        } else {
          // 购物车页提交订单
          params = {
            address_id: this.id
          }
          uni.showToast({
            icon: 'none',
            title: 'error'
          })
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  page {
    background-color: #f7f7f7;
  }

  .item {
    background-color: #fff;
    border-bottom: 16upx solid #f7f7f7;
  }

  .submit {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    box-shadow: 0 -1px 5px rgba($color: #000000, $alpha: .1);
  }
</style>