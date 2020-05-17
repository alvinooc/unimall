<template>
  <view>
    <view class="user-info">
      <image :src="img" :class="{avatra: !hasLogin}"/>
      <text>{{username}}</text>
    </view>

    <navigator v-if="!hasLogin" class="login" url="/pages/login/Login">
      立即登陆
    </navigator>
  </view>
</template>

<script>
  export default {
    name: 'ProfileUserInfo',
    computed: {
      hasLogin() {
        return this.$store.state.hasLogin
      },
      img() {
        return this.$store.state.userInfo.avatar || '/static/img/cart/cart.png'
      },
      username() {
        return this.$store.state.userInfo.nickname || '登陆'
      }
    }
  }
</script>

<style lang='scss' scoped>
  .user-info {
    display: flex;
    align-items: center;
    image {
      width: 136upx;
      height: 136upx;
      border-radius: 50%;
    }
    .avatar {
      width: 136upx;
      height: 136upx;
      border-radius: 50%;
      background: rgba($color: #000000, $alpha: .3);
    }
    text {
      margin-left: 40upx;
    }
  }

  .login {
    position: absolute;
    right: 30upx;
    padding: 10upx 30upx;
    background-color: #fff;
    border-radius: 30upx;
    font-size: 12px;
    color: #36343c;
  }
</style>