<template>
  <view id="goods-option-item"
       v-if="Object.keys(goodsInfo).length !== 0"
       @click="closeOptionItemTop">
    <view class="option-item" @click.stop>
      <!-- 商品基本信息 -->
      <view class="topInfo">
        <image :src="goodsInfo.image"/>
        <view class="topMsg">
          <view class="price">{{goodsInfo.price}}</view>
          <view class="stock">库存：{{goodsInfo.stock}} 个</view>
          <view class="">已选：{{selectRes}}</view>
        </view>
      </view>

      <!-- 商品尺码 -->
      <goods-type :goods-type="goodsInfo.sizes" @handleClick="handleSizeClick"/>

      <!-- 商品颜色 -->
      <goods-type :goods-type="goodsInfo.colors" @handleClick="handleColorClick"/>

      <!-- 商品数量 -->
      <goods-count class="goods-count"/>

      <!-- 按钮 -->
      <button class="btn" @tap="closeOptionItem">完成</button>
    </view>
  </view>
</template>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'

  import GoodsCount from './GoodsCount'
  import GoodsType from './GoodsType'

  export default {
    name: 'GoodsOptionItem',
    components: {
      GoodsCount,
      GoodsType
    },
    data() {
      return {
        currentSizeIndex: 0,
        currentColorIndex: 0,
        sku_id: 0
      }
    },
    computed: {
      ...mapState(['goodsInfo']),
      ...mapGetters(['selectRes'])
    },
    methods: {
      ...mapMutations(['changeGoodsSize', 'changeGoodsColor', 'isShowGoodsType', 'getSku_id']),
      // 修改商品尺寸
      handleSizeClick(index, item) {
        this.currentSizeIndex = index
        this.changeGoodsSize(item)
      },
      // 修改商品颜色
      handleColorClick(index, item) {
        this.currentColorIndex = index
        this.changeGoodsColor(item)
      },
      // 关闭商品选项界面
      closeOptionItem() {
        this.isShowGoodsType(false)
        this.goodsInfo.skus.forEach(item => {
          if (item.value === this.selectRes) {
            this.sku_id = item.id
          }
        })
        this.getSku_id(this.sku_id)
      },
      closeOptionItemTop() {
        this.isShowGoodsType(false)
      }
    }
  }
</script>

<style lang='scss' scoped>
  #goods-option-item {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 9;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
    .option-item {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding-left: 30upx;
      border-top-left-radius: 10upx;
      border-top-right-radius: 10upx;
      background-color: #fff;
      color: #585a5e;
      .topInfo {
        display: flex;
        image {
          position: relative;
          top: -30upx;
          left: 0;
          width: 174upx;
          height: 174upx;
        }
        .topMsg {
          margin-left: 24upx;
          font-size: 30upx;
          .price {
            margin: 14upx 0;
            color: #f93d62;
            font-size: 32upx;
          }
        }
      }
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
    }
  }

  .goods-count {
    width: 34%;
  }

  .btn {
    margin: 20upx;
    height: 80upx;
    line-height: 80upx;
    background-color: #e7536d;
    border-radius: 50upx;
    color: #fff;
    font-size: 32upx;
  }
</style>