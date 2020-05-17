<template>
    <div class="advert">
      <block v-for="(item, index) in advert" :key="index">
        <navigator :url="'/pages/detail/Detail?id=' + item.id ">
          <image :src="item.image" mode="widthFix"/>
        </navigator>
      </block>
    </div>
</template>

<script>
  export default {
    name: 'HomeAdvert',
    props: {
      advert: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .advert {
    width: 646upx;
    margin: 46upx auto;
    image {
      width: 100%;
    }
  }
</style>