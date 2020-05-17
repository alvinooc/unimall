<template>
  <view class="profile">
    <!-- 用户信息 -->
    <profile-user-info class="user-info"/>

    <!-- 订单选项 -->
    <profile-order-section class="order-section"/>

    <!-- 设置选项 -->
    <profile-set-options/>
  </view>
</template>

<script>
  import ProfileOrderSection from './childCops/ProfileOrderSection'
  import ProfileUserInfo from './childCops/ProfileUserInfo'
  import ProfileSetOptions from './childCops/ProfileSetOptions'

  export default {
    name: 'Profile',
    components: {
      ProfileOrderSection,
      ProfileUserInfo,
      ProfileSetOptions
    },
    onLoad() {
      // this._getUserInfo()
      console.log('++++')
    },
    onShow() {
      console.log('-----')
      this.$store.dispatch('_getCheckLogin')
    }
  }
</script>

<style lang='scss' scoped>
  .profile {
    padding: 20upx 30upx 80upx;
    background-color: #f7f7f7;
    .user-info {
      background-color: #fff;
    }
    .order-section {
      margin: 40px 0 8px;
      padding: 30upx 0;
      background-color: #fff;
    }
  }
</style>