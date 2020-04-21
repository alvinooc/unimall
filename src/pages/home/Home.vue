<template>
  <div>
    <!-- 轮播图 -->
    <Swiper :banners="navData[0]"/>

    <!-- 分类 -->
    <home-category :cate-info="navData[1]"/>

    <!-- 广告 -->
    <home-advert :advert="navData[2]"/>
  </div>
</template>

<script>
  import Swiper from '@/components/customCpns/swiper/Swiper'

  import HomeCategory from './childCpns/HomeCategory'
  import HomeAdvert from './childCpns/HomeAdvert'

  import { getHomeNavData } from "@/service/home";


  export default {
    name: "Home",
    components: {
      Swiper,
      HomeCategory,
      HomeAdvert
    },
    data() {
      return {
        navData: []
      }
    },
    onLoad() {
      // 获取轮播图、广告相关数据
      this._getHomeNavData()
    },
    methods: {
      _getHomeNavData() {
        getHomeNavData({
            nav_type: [0, 1, 2]
          }, "post")
          .then(res => {
            this.navData = res.data.data
            console.log(this.navData)
        });
      }
    }
  };
</script>

<style scoped>
</style>