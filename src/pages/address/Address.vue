<template>
  <view>
    <view class="address" v-if="address">
      <view class="address-item"
            v-for="(item, index) in address"
            :key="index"
             @click="checkAddress(item)">
        <view class="address-info">
          <view class="address-info-top">
            <text class="defaul" v-if="item.is_default === 1">默认</text>
            <text>
              {{item.address}}
              <text class="street">{{item.street}}</text>
            </text>
          </view>
          <view class="address-info-bottom">
            {{item.contactor_name}}
            <text>{{item.phone}}</text>
          </view>
        </view>
        <view class="handle">
          <text class="yticon icon-bianji" @click.stop="addAddress('edit', item)"></text>
          <text class="yticon icon-iconfontshanchu1" @click.stop="delAddress(item)"></text>
        </view>
      </view>
    </view>

    <view v-else class="null">
      <image src="@/static/img/profile/msg.png"/>
    </view>

    <view class="addAddress" @click="addAddress('add')">新增地址</view>
  </view>
</template>

<script>
  export default {
    name: 'Address',
    data() {
      return {
        source: ''
      }
    },
    onLoad(option) {
      console.log(option)
      this.source = option.source
      this.getAddress()
    },
    computed: {
      address() {
        return this.$store.state.address 
      }
    },
    methods: {
      // 获取信息消息
      getAddress() {
        this.$store.dispatch('_getAddress')
      },
      // 新增/编辑地址
      addAddress(type, item){
				uni.navigateTo({
					url: `/pages/address/AddressManage?type=${type}&data=${JSON.stringify(item)}`
				})
      },
      // 删除地址
      delAddress(item) {
        uni.showModal({
					title: '提示',
					content: '确定删除地址吗？',
					success: res => {
						if (res.confirm) {
							this.$http.delAddress({address_id: item.id}).then(res => {
                this.getAddress()
                console.log(res)
							})
						}
					}
				})
      },
      checkAddress(item) {
        if (this.source === '1') {
          // console.log(item.id)
          uni.navigateTo({
            url: `/pages/order/CreateOrder?sku_id=1&quantity=1&address_id=${item.id}`
          })
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  .address {
    margin-bottom: 110upx;
  }

  .address-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20upx 30upx;
    border-top: 1px solid #f2f3f6;
    &:last-child {
      border-bottom: 1px solid #f2f3f6;
    }
    .address-info {
      font-size: 12px;
      .address-info-top {
        display: flex;
        align-items: center;
        color: #303133;
        .street {
          margin-left: 12upx;
        }
        .defaul {
          width: 70upx;
          margin-right: 4px;
          padding: 0 3px;
          background: #fffafb;
          border: 1px solid #ffb4c7;
          border-radius: 1px;
          font-size: 10px;
          color: #fa436a;
        }
      }
      .address-info-bottom {
        margin-top: 6px;
        color: #909399;
        text {
          margin-left: 30upx;
        }
      }
    }
    .handle {
      font-size: 16px;
      .icon-bianji::before {
        content: "\E646";
      }
      .icon-iconfontshanchu1::before {
        content: "\E619";
        padding-left: 30upx;
        color: #fa436a;
      }
     }
  }

  .null {
    image {
      display: block;
      width: 240upx;
      height: 240upx;
      margin: 300upx auto;
    }
  }

  .addAddress {
    position: fixed;
    bottom: 15upx;
    left: 30upx;
    right: 30upx;
    padding: 20upx 0;
    text-align: center;
    border-radius: 16upx;
    background-color: #fa436a;
    box-shadow: 1px 2px 5px rgba(219,63,96,.4);
    font-size: 13px;
    color: #fff;
  }
</style>