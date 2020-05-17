<template>
  <div id="home">
    <!-- 轮播图 -->
    <Swiper :banners="navData[0]" class="swiper"/>

    <!-- 分类 -->
    <home-category :cate-info="navData[1]"/>

    <!-- 广告 -->
    <home-advert :advert="navData[2]"/>

    <!-- 分类精选 -->
    <home-recommend/>

    <!-- 产品 -->
    <home-products :products="products"/>
  </div>
</template>

<script>
  import Swiper from '@/components/common/swiper/Swiper'

  import HomeCategory from './childCpns/HomeCategory'
  import HomeAdvert from './childCpns/HomeAdvert'
  import HomeRecommend from './childCpns/HomeRecommend'
  import HomeProducts from './childCpns/HomeProducts'

  export default {
    name: "Home",
    components: {
      Swiper,
      HomeCategory,
      HomeAdvert,
      HomeRecommend,
      HomeProducts
    },
    data() {
      return {
        navData: [],
        products: []
      }
    },
    onLoad() {
      uni.showLoading({
        title: '加载中'
      })
      // 获取轮播图、广告相关数据
      this._getNavData()
      // 获取轮播图、广告相关数据
      this._getProducts()
    },
    onPullDownRefresh() {
      setTimeout(function () {
        uni.stopPullDownRefresh()
      }, 300)
    },
    methods: {
      // 获取轮播图、广告相关数据
       _getNavData() {
        this.$http.getNavData({
            nav_type: [0, 1, 2]
          })
          .then(res => {
            this.navData = res.data.data
        });
      },
      // 获取轮播图、广告相关数据
      _getProducts() {
        this.$http.getProducts().then(res => {
          this.products = res.data.data.home_recommend_products
          console.log(this.products)
          uni.hideLoading()
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  .swiper {
    width: 690upx;
    margin: 30upx auto;
    border-radius: 40upx;
    overflow: hidden;
  }
</style>