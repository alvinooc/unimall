<template>
  <swiper class="swiper" autoplay indicator-dots circular interval="3000">
    <swiper-item v-for="(item, index) in banners" :key="index" class="swpier-item">
      <image :src="item.image || item"/>
    </swiper-item>
  </swiper>
</template>

<script>
  export default {
    props: {
      banners: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  image {
    width: 100%;
    height: 100%;
  }
</style>