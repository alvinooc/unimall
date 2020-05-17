<template>
  <view class="product">
    <!-- 商品排序方式 -->
    <product-tab @clickChangeSort="clickChangeSort"
                 :priceOrder="sortParams.priceOrder"
                 class="product-tab"/>
    
    <!-- 商品 -->
    <product-list :goods-list="goodsList" class="product-list"/>

    <!-- 提示 -->
    <view class="prompt">
      <text>没有更多数据了</text>
    </view>
</view>
</template>

<script>
  import ProductTab from './childCops/ProductTab'
  import ProductList from './childCops/ProductList'

  export default {
    name: 'product',
    components: {
      ProductTab,
      ProductList
    },
    data() {
      return {
        goodsList: [],
        sortParams: {
          cat_id: 0,
          sort: 0,
          priceOrder: 0,
          kw: ''
        }
      }
    },
    onLoad(option) {
      this._getGoodsList({
        cat_id: option.id,
        sort: 0,
        priceOrder: 0,
        kw: ''
      })
    },
    onPullDownRefresh() {
      setTimeout(function () {
        uni.stopPullDownRefresh()
      }, 300)
    },
    methods: {
      // 获取商品列表
      async _getGoodsList(params) {
        uni.showLoading({
          title: '加载中'
        })
        const res = await this.$http.getGoodsList(params)
        console.log(res)
        this.goodsList = res.data.data.data
        this.sortParams = params
        uni.hideLoading()
      },
      // 商品排序
      clickChangeSort(index) {
        if (index === 1) {
          if (this.sortParams.sort !== 1) {
            this.sortParams.sort = 1
            this.sortParams.priceOrder = 0
          } else {
            return
          }
        } else if (index === 2) {
          this.sortParams.sort = 2
          this.sortParams.priceOrder += 1
          if (this.sortParams.priceOrder > 2) {
            this.sortParams.priceOrder = 1
          }    
        } else {
          if (this.sortParams.sort !== 0) {
            this.sortParams.sort = 0
            this.sortParams.priceOrder = 0
          } else {
            return
          }
        }
        this._getGoodsList(this.sortParams)
        uni.showToast({
          title: '正在加载',
          icon: 'loading',
          duration: 150
        })
      }
    }
  }
</script>

<style lang='scss' scoped>
  page {
    background-color: #f8f8f8;
  }
  .product {
    background-color: #f7f7f7;
    .product-tab {
      background-color: #fff;
    }
    .product-list {
      margin-top: 20upx;
      background-color: #fff;
    }
    .prompt {
      padding: 20upx 0;
      text-align: center;
      font-size: 12px;
      color: #777;
    }
  }
</style>