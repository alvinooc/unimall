<template>
  <div>
    <view class="title">欢迎回来！</view>
    <view class="input">
      <text>账户</text>
      <input type="text"
             placeholder="请输入用户名/手机号码" 
             v-model="loginInfo.username"
             class="username"/>
    </view>
    <view class="input">
      <text>密码</text>
      <input type="text"
             placeholder="8-18位不含特殊字符的数字"
             maxlength="18"
             password
             v-model="loginInfo.password"
             class="pwd"/>
      
    </view>
    <button class="login" @click="loginClick">登陆</button>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        loginInfo: {
          username: 'admin',
          password: '12345678',
          loginWay: 0
        },
        isShow: false,
        isParams: false
      }
    },
    onLoad(option) {
      if (Object.keys(option).length !== 0) this.isParams = true
      console.log(this.isParams)
    },
    methods: {
      // 获取登陆信息
      async loginClick() {
        if (this.loginInfo.username.length !== 0 && this.loginInfo.password.length !== 0) {
          const res = await this.$http.getLoginInfo(this.loginInfo)
          console.log(res)
          if (res.data.data) {
            uni.setStorageSync('token', res.data.data.token)
            if (this.isParams) {
              history.back(-1)
            } else {
              uni.switchTab({
                url: '/pages/profile/Profile'
              })
            }
          } else {
              uni.showToast({
              title: '用户名或密码错误',
              icon: 'none'
            })
          }
        } else {
          uni.showToast({
            title: '账号不能为空',
            icon: 'none'
          })
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  .title {
    padding: 80upx 50upx;
    font-size: 56upx;
  }

  .input {
    position: relative;
    margin: 10upx 60upx;
    margin-bottom: 70upx;
    padding: 10upx 20upx;
    background-color: #f8f6fc;
    text {
      font-size: 30upx;
      color: #616266;
    }
  }

  .login {
    border-radius: 100upx;
    background-color: #e7536d;
    color: #fff;
    font-size: 36upx;
  }
</style>