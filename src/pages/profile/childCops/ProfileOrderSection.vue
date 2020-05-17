<template>
  <view id="order-section">
    <block v-for="(item, index) in orderSectionInfo" :key="index">
      <view class="item" @click="handleClick(index)">
        <text class="yticon" :class="item.class"/>
        <text>{{item.title}}</text>
      </view>
    </block>
  </view>
</template>

<script>
  export default {
    name: 'ProfileOrderSection',
    data() {
      return {
        orderSectionInfo: [
          {
            class: 'icon-shouye',
            title: '全部订单'
          },
          {
            class: 'icon-daifukuan',
            title: '待付款'
          },
          {
            class: 'icon-yishouhuo',
            title: '待收货'
          },
          {
            class: 'icon-pingjia',
            title: '待评价'
          },
        ]
      }
    },
    methods: {
      handleClick(index) {
        console.log(this.$store.state.hasLogin)
        if (this.$store.state.hasLogin) {
            uni.navigateTo({
            url: '/pages/order/Order?state=' + index
          })
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
  #order-section {
    display: flex;
    justify-content: space-around;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 12px;
      .yticon {
        font-size: 20px;
        margin-bottom: 7px;
        color: #fa436a;
      }
      .icon-shouye::before {
        content: "\E626";
      }
      .icon-daifukuan::before {
        content: "\E68F";
      }
      .icon-yishouhuo::before {
        content: "\E71A";
      }
      .icon-pingjia::before {
        content: "\E67B";
      }
    }
  }
</style>