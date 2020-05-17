<template>
  <navigator id="address" 
             url="/pages/address/Address?source=1"
             v-if="Object.keys(address).length !== 0">
    <!-- 位置图标 -->
    <uni-icons type="location-filled" color="#909399"/>

    <!-- 地址相关信息 -->
    <view class="address-info">
      <view class="username-info">
        <text class="username">{{address.contactor_name}}</text>
        <text class="tel">{{address.phone}}</text>
      </view>
      <view class="address-detail">
        <text>{{address.address}}</text>
        <text class="street">{{address.street}}</text>
      </view>
    </view>

    <!-- 右箭头 -->
    <uni-icons type="arrowright" color="#909399"/>
  </navigator>
</template>

<script>
  import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"

  export default {
    name: 'OrderAddress',
    components: {
      uniIcons
    },
    props: {
      address: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  #address {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30upx;
    font-size: 24upx;
    color: #909399;
    .address-info {
      width: 80%;
      .username-info {
        color: #303133;
        .username {
          font-size: 34upx;
        }
      }
      .tel, .street {
        margin-left: 20upx;
      }
      .address-detail, .username-info {
        margin: 20upx 0;
      }
    }
  }
</style>