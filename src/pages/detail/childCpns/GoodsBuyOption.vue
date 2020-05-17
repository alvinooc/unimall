<template>
  <div id="option" v-if="Object.keys(goodsInfo).length !== 0">
    <view class="goods-option" @click="buyOptionClick">
      <text>购买类型</text>
      <text class="middle">{{selectRes}}</text>
      <uni-icons type="arrowright" size="18" color="#999"/>
    </view>

    <!-- 商品数量 -->
    <goods-count class="goods-count"/>
  </div>
</template>

<script>
  import GoodsCount from './GoodsCount'
  import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"

  import { mapState, mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'GoodsBuyOption',
    components: {
      GoodsCount,
      uniIcons
    },
    computed: {
      ...mapState(['goodsInfo']),
      ...mapGetters(['selectRes'])
    },
    methods: {
      ...mapMutations(['isShowGoodsType']),
      // 显示商品选项
      buyOptionClick() {
        this.isShowGoodsType(true)
      }
    }
  }
</script>

<style lang='scss' scoped>
  #option {
    font-size: 34upx;
    color: #303133;
  }

  .goods-option {
    display: flex;
    justify-content: space-between;
    padding: 20upx;
    border-bottom: 6upx solid #f2f3f6;
  }

  .middle {
    flex: 1;
    margin-left: 30upx;
  }

  .goods-count {
    padding: 20upx;
  }
</style>