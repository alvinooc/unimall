<template>
  <view>
    <view v-if="hasLogin">
      <view class="goods" v-if="goodsInfo">
        <!-- 商品列表 -->
        <block v-for="(item, index) in goodsInfo" :key="index">
          <view class="goods-item">
            <navigator :url="'/pages/detail/Detail?id=' + item.sku.product_id">
              <image :src="item.product.image[0]"/>
            </navigator>
            <view class="goods-info">
              <view class="goods-title">{{item.product.title}}</view>
              <view class="goods-type">{{item.sku.value}}</view>
              <view class="goods-price">{{item.sku.price}}</view>
              <uni-number-box :value="item.quantity"
                              :id="item.sku.id"
                              :min="1"
                              class="goods-number"
                              @change="changeCount"/>
            </view>
            <!-- 删除 -->
            <uni-icons type="closeempty" @click="hanldeDelete(item.id)"/>
            <!-- 是否选中 -->
            <uni-icons type="checkbox"
                      size="18"
                      class="checkStatus"
                      :color="item.select ? '#f93a5f' : '#b8bcc5'"
                      @click="handleSelect(index)"/>
          </view>
        </block>

        <!-- 底部菜单 -->
        <view class="bottom-menu">
          <view class="isSelect">
            <uni-icons type="checkbox-filled"
                       size="26"
                       class="checkStatus"
                       :color="!isAllSelect ? '#f93a5f' : '#b8bcc5'"
                       @click="CheckClick"/>
            <view class="clearAll"
                  @click="handleClearAll"
                  v-show="!isAllSelect">
              清空
            </view>
          </view>
          <text class="price">¥ {{totalPrice}}</text>
          <view class="submit" @click="toOrder">
            去结算
          </view>
        </view>
      </view>

      <!-- 购物车为空时 -->
      <view class="cart-empty" v-else>
        <image src="@/static/img/cart/cart.png"/>  
        <view class="cart-empty-info">
          <text>空空如也</text>
          <navigator url="/pages/home/Home"
                    open-type="switchTab"
                    class="toHome">
            随便逛逛>
          </navigator>
        </view>
      </view>
    </view>

    <!-- 未登录时 -->
    <view class="cart-empty" v-else>
      <image src="@/static/img/cart/cart.png"/>  
      <view class="cart-empty-info">
        <text>空空如也</text>
        <view class="toHome" @click="handleToLogin">
          去登陆>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import uniNumberBox from "@/components/uni/uni-number-box/uni-number-box.vue"
  import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"

  export default {
    name: 'Cart',
    components: {
      uniNumberBox,
      uniIcons
    },
    data() {
      return {
        goodsInfo: []
      }
    },
    onLoad() {
      // this._getGoods()
    },
    onShow() {
      this._getGoods()
    },
    onPullDownRefresh() {
      setTimeout(function () {
        uni.stopPullDownRefresh()
      }, 300)
    },
    computed: {
      // 是否登陆
      hasLogin() {
        return this.$store.state.hasLogin
      },
      // 商品总价格
      totalPrice() {
        return this.goodsInfo.filter(item => {
          return item.select
        }).reduce((preValue, item) => {
          return preValue + item.sku.price * item.quantity
        }, 0).toFixed(2)
      },
      // 是否全部选中
      isAllSelect() {
        return this.goodsInfo.find(item => !item.select)
      }
    },
    methods: {
      // 获取商品
      async _getGoods() {
        const res = await this.$http.getComeCart()
        if (res.statusCode === 200) {
          this.goodsInfo = res.data.data
        }
        if (this.goodsInfo) {
          this.goodsInfo.forEach(item => {
            item.select = true
          })
        }
      },
      // 删除商品
      async hanldeDelete(id) {
        await this.$http.deleteGoods({
          ids: [id]
        })
        uni.showToast({
          icon: 'loading',
          duration: 150
        })
        this._getGoods()
      },
      // 修改商品数量
      changeCount(e) {
        if (e.count === 1) {
          return
        }
        this.$http.changeGoodsCount({
          sku_id: e.id,
          quantity: parseInt(e.count)
        }).then(res => {
          this._getGoods()
        })
      },
      // 是否选中商品
      handleSelect(index) {
        this.goodsInfo.forEach((item, indey) => {
          if (indey === index) {
            item.select = !item.select
          }
        })
      },
      // 清空购物车
      handleClearAll() {
        uni.showModal({
          content: '清空购物车?',
          success: res => {
            if (res.confirm) {
              this.$http.clearCart()
              this._getGoods()
            }
          }
        })
      },
      // 全选/全不选
      CheckClick() {
        if (this.isAllSelect) {
          this.goodsInfo.forEach(item => item.select = true)
        } else {
          this.goodsInfo.forEach(item => item.select = false)
        }
      },
      // 去结算
      toOrder() {
        let ids = []
        this.goodsInfo.forEach(item => {
          // 获取所有商品 id
          ids.push(item.id)
        })
        // 将 id 保存到本地
        // console.log(ids)
        uni.setStorageSync('ids', ids)
        // console.log(uni.getStorageSync('ids'))
        uni.navigateTo({
          url: '/pages/order/CreateOrder'
        })
      },
      // 去登陆
      handleToLogin() {
        uni.navigateTo({
          url: '/pages/login/Login'
        })
        // this._getGoods()
        console.log('------')
      }
    }
  }
</script>

<style lang='scss' scoped>
  .goods {
    margin-bottom: 50px;
    .goods-item {
      display: flex;
      position: relative;
      width: 90%;
      padding: 30upx 40upx;
      border-bottom: 2upx solid #eee;
      image {
        width: 230upx;
        height: 230upx;
      }
      .goods-info {
        width: 52%;
        margin-left: 40upx;
        font-size: 24upx;
        color: #303133;
        .goods-title {
          width: 360upx; 
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .goods-type {
          margin: 16upx 0;
          color: #909399;
        }
        .goods-number {
          margin-top: 20upx;
        }
      }
      &:last-child {
        border: none;
      }
      .checkStatus {
        position: absolute;
        top: 10upx;
        left: 27upx;
        background-color: #fff;
        border-radius: 50%;
      }
    }
  }

  .cart-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 280upx;
    margin: 0 auto;
    padding-top: 50%;
    image {
      width: 270upx ;
      height: 170upx;
    }
    .cart-empty-info {
      display: flex;
      margin-top: 20upx;
      color: #c0c4cc;
      font-size: 24upx;
    }
    .toHome {
      margin-left: 15upx;
      color: #fa436a;
    }
  }

  .bottom-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    left: 3%;
    right: 3%;
    bottom: 53px;
    padding: 6px 12px;
    box-shadow: 0 0 8px rgba(0, 0, 0, .5);
    border-radius: 20upx;
    background: rgba(255, 255, 255, .9);
    font-size: 30upx;
    .isSelect {
      position: relative;
      width: 150upx;
      height: 55upx;
      .checkStatus {
        position: absolute;
        top: -8upx;
        left: -4upx;
      }
      .clearAll {
        padding: 8upx 0 8upx 70upx;
        background: #c0c4cc;
        border-radius: 100upx;
        color: #fff;
      }
    }
    .price {
      margin-left: 170upx;
    }
    .submit {
      padding: 20upx 36upx;
      border: none;
      background-color: #f93a5f;
      border-radius: 100upx;
      color: #fff;
    }
  }
</style>