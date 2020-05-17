<template>
  <div id="detail">
    <!-- 轮播图 -->
    <Swiper :banners="goodsInfo.image" class="swiper"/>

    <!-- 商品基本信息 -->
    <goods-base-info :goods-info="goodsInfo"/>

    <!-- 商品购买选项 -->
    <goods-buy-option :goods-info="goodsInfo"/>

    <!-- 商品类型选择 -->
    <goods-option-item :goods-info="goodsInfo" v-show="isShow"/>

    <!-- 商品评价 -->
    <goods-rate :goods-rate-info="goodsRateInfo"/>

    <!-- 图文详情 -->
    <goods-graphic-details/>
   
    <!-- 底部导航 -->
    <uni-goods-nav :fill="true"
                   :options="options" 
                   :buttonGroup="buttonGroup"
                   @click="onClick"
                   @buttonClick="addToCart"
                   class="bottomNav"/>
  </div>
</template>

<script>
  import Swiper from '@/components/common/swiper/Swiper'
  import uniGoodsNav from '@/components/uni/uni-goods-nav/uni-goods-nav.vue'
  import uniIcons from '@/components/uni/uni-icons/uni-icons.vue'

  import GoodsBaseInfo from './childCpns/GoodsBaseInfo'
  import GoodsBuyOption from './childCpns/GoodsBuyOption'
  import GoodsOptionItem from './childCpns/GoodsOptionItem'
  import GoodsRate from './childCpns/GoodsRate'
  import GoodsGraphicDetails from './childCpns/GoodsGraphicDetails'

  import { mapState, mapMutations, mapGetters } from 'vuex'

  export default {
    name: 'Detail',
    components: {
      Swiper,
      uniGoodsNav,
      uniIcons,
      GoodsBaseInfo,
      GoodsBuyOption,
      GoodsOptionItem,
      GoodsRate,
      GoodsGraphicDetails
    },
    data() {
      return {
        goodsInfo: {},
        goodsRateInfo: {},
        goodsStatus: {
          id: 0,
          state: 0
        },
        page: 1,        
        options: [
          {
            icon: 'home',
            text: '首页'
          }, 
          {
            icon: 'cart',
            text: '购物车',
            info: 0
          }, 
          {
            icon: 'heart',
            text: '收藏'
          }
        ],
        buttonGroup: [
          {
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ],
        isCollect: null
      }
    },
    onLoad(option) {
      uni.showLoading({
        title: '加载中'
      })
      // 获取商品信息
      this._getGoodsInfo(option.id)
      // 获取商品评价信息
      this._getGoodsRate(this.goodsStatus.id, this.page)
      this.$store.state.count = 1
    },
    onShow() {
      this.$store.dispatch('_getCheckLogin')
    },
    computed: {
      ...mapGetters(['selectRes']),
      ...mapState({
        isShow: 'isShowGoodsType',
        count: 'count',
        id: 'sku_id',
        hasLogin: 'hasLogin'
      })
    },
    methods: {
      /**
       * 网络请求相关
       */
      ...mapMutations(['getGoodsInfo', 'getSku_id']),
      // 获取商品基本信息
      async _getGoodsInfo(id) {
        const res = await this.$http.getGoodsInfo(id)
        // console.log(res, id)
        if (res.statusCode === 200) {
          // 商品信息
          this.goodsInfo = res.data.data
          // 商品信息保存到 state 中
          this.getGoodsInfo(this.goodsInfo)
          // 获取商品评价信息相关参数
          this.goodsStatus.id = id
          this.goodsStatus.state = res.data.data.favorite === 0 ? 1 : 0
          // 收藏相关参数
          this.isCollect = res.data.data.favorite == 0 ? false : true
          this.toggleCollect(this.isCollect)
          // 加入购物车相关参数
          this.goodsInfo.skus.forEach(item => {
            if (item.value === this.selectRes) {
              this.getSku_id(item.id)
            }
          })
        }
      },
      // 获取商品评价信息
      async _getGoodsRate(id, page) {
        const res = await this.$http.getGoodsRate(id, page)
        if (res.statusCode === 200) {
          this.goodsRateInfo = res.data.data
          uni.hideLoading()
        }
      },
      // 获取商品收藏状态
      async _getGoodsCollectStatus(state) {
        const res = await this.$http.getGoodsCollectStatus(state)
        this._getGoodsInfo(state.id)
      },
      /**
       * 事件相关
       */
      // 收藏商品
      onClick (e) {
        if (e.content.text === '首页') {
          uni.switchTab({
            url: '/pages/home/Home'
          })
        } else {
          if (this.hasLogin) {
            if (e.content.icon.indexOf('heart') !== -1 ) {
              this._getGoodsCollectStatus(this.goodsStatus)
              this.toggleCollect(this.isCollect)
              if (this.options[2].text === '已收藏') {
                uni.showToast({
                  title: '已取消收藏',
                  icon: "none"
                })
              } else {
                uni.showToast({
                  title: '已添加收藏',
                  icon: "none"
                })
              }
            }
            if (e.content.text === '购物车') {
              uni.switchTab({
                url: '/pages/cart/Cart'
              })
            } 
          } else {
            uni.navigateTo({
              url: `/pages/login/Login?sku_id=${this.id}`
            })
          }
        }
      },
      // 加入购物车/立即购买
      addToCart (e) {
        if (!this.hasLogin) {
          uni.navigateTo({
            url: `/pages/login/Login?sku_id=${this.id}`
          })
        } else {
          // 加入购物车
          if (e.content.text === '加入购物车') { 
            this.$http.toCart({
              sku_id: this.id, 
              quantity: this.count
            }).then(res => {
              uni.showToast({
                title: '加入成功'
              })
            })
          }
          // 立即购买
          if (e.content.text === '立即购买') {
            uni.navigateTo({
              url: '/pages/order/CreateOrder?sku_id=' + this.id + '&quantity=' + this.count
            })
          }
        }
      },
      // 收藏/取消收藏切换
      toggleCollect(flag) {
        if (flag) {
          this.options[2].text = '已收藏'
          this.options[2].icon = 'heart-filled'
        } else {
          this.options[2].text = '收藏'
          this.options[2].icon = 'heart'
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  .swiper {
    height: 740upx;
  }

  .bottomNav {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 0 10px #bbb;
  }

  .collect {
    position: absolute;
    bottom: 15upx;
    left: 270upx;
    text-align: center;
    font-size: 20upx;
    color: #fa436a;
  }
</style>