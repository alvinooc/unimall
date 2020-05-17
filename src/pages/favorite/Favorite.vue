<template>
  <view>
    敬请期待！～
  </view>
</template>

<script>
  export default {
    name: 'Favorite',
    onLoad() {
      this._getMyFavorite()
    },
    methods: {
      async _getMyFavorite() {
        const res = await this.$http.myFavorite()
        console.log(res)
      }
    }
  }
</script>

<style lang='scss' scoped>
</style>