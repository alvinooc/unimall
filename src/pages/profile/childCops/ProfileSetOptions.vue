<template>
  <view class="set-option">
    <!-- 地址管理等设置 -->
    <view class="option-item"
          v-for="(item, index) in options"
          :key="index"
          @click="handleClickTo(item.url)">
      <text class="yticon"
            :class="item.class"/>
      <text class="title">{{item.name}}</text>
      <text class="yticon icon-you"/>
    </view>

    <!-- 退出登陆 -->
    <view class="exit" @click="handleSignOut" v-if="hasLogin">
      退出登陆
    </view>
  </view>
</template>

<script>
  export default {
    name: 'ProfileSetOptions',
    data() {
      return {
        options: [
          {
            name: '地址管理',
            class: 'icon-dizhi',
            url: '/pages/address/Address'
          },
          {
            name: '我的收藏',
            class: 'icon-shoucang_xuanzhongzhuangtai',
            url: '/pages/favorite/Favorite'
          },
          {
            name: '设置',
            class: 'icon-shezhi',
            url: '/pages/set/Set'
          }
        ]
      }
    },
    computed: {
      hasLogin() {
        return this.$store.state.hasLogin
      }
    },
    methods: {
      // 退出登陆 
      handleSignOut() {
        uni.showModal({
          content: '确定要退出登陆吗？',
          success: (e) => {
            if (e.confirm) {
              this.$http.signOut().then(res => {
                uni.clearStorageSync()
                uni.navigateBack()
              })
            }
          }
        })
      },
      handleClickTo(url) {
        if (this.hasLogin) {
          uni.navigateTo({url})
        } else {
          uni.navigateTo({
            url: '/pages/login/Login'
          })
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  .set-option {
    padding-top: 30upx;
    background-color: #fff;
  }
  .option-item {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 20upx 30upx;
    .title {
      flex: 1;
      margin-left: 20upx;
      padding: 10upx 0;
      font-size: 12px;
    }
    .yticon {
      font-size: 16px;
    }
    .icon-dizhi {
      color: #55c698;
      &::before {
        content: "\E614";
      }
    }
    .icon-shoucang_xuanzhongzhuangtai {
      color: #4aabed;
      &::before {
        content: "\E6A9";
      }
    }
    .icon-shezhi {
      color: #e0807e;
      &::before {
        content: "\E60F";
      }
    }
    .icon-you {
      font-size: 12px;
      color: #606266;
      &::before {
        content: "\E606";
      }
    }
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 38px;
      right: 0;
      border-bottom: 1px solid #e4e7ed;
    }
  }

  .exit {
    margin-top: 40upx;
    padding: 20upx 30upx;
    background-color: #fff;
    text-align: center;
    color: #fa436a;
    font-size: 14px;
  }


</style>