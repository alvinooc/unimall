<template>
  <view>
    <view class="address-option">
      <view class="item">
        <text>联系人</text>
        <input type="text" 
              placeholder="收货人姓名"
              placeholder-style="font-size: 12px"
              v-model="addressData.contactor_name"/>
      </view>
      <view class="item">
        <text>手机号</text>
        <input type="number"
              placeholder="收货人手机号码"
              placeholder-style="font-size: 12px"
              v-model="addressData.phone"/>
      </view>
      <view class="item">
        <text>地址</text>
        <input type="text"
              placeholder="选择地址"
              @tap="openAddres"
              v-model="addressData.address"
              disabled/>
      </view>
      <view class="item">
        <text>街道</text>
        <input type="text"
              v-model="addressData.street"/>
      </view>

        <!-- 设为默认 -->
      <view class="item setDefault">
        <text>设为默认</text>
        <switch :checked="addressData.is_default === 1" color="#fa436a" @change="switchChange"/>
      </view>
    </view>

    <simple-address ref="simpleAddress" 
                    :pickerValueDefault="cityPickerValueDefault" 
                    @onConfirm="onConfirm" 
                    confirmColor="#fa436a"
                    cancelColor="#000"/>

    <view class="submit" @click="submitAddress">提交</view>
  </view>
</template>

<script>
  import simpleAddress from '@/components/uni/simple-address/simple-address.vue';

  export default {
    name: 'AddressManage',
    components: {
        simpleAddress
    },
    data() {
      return {
        cityPickerValueDefault: [0, 0, 1],
        // 选择的地址
        addressData: {
          contactor_name: '甄美丽',
          phone: '13223333333',
          address: '',
          street: '',
          is_default: 0,
          address_id: null,
          Id: null,
          user_id: null
        }
      }
    },
    onLoad(option) {
      // console.log(option)
      this.addressTitle(option)
    },
    computed: {
    },
    methods: {
      // 判断是新增地址还是编辑地址
      addressTitle(option) {
        let title = ''
        if (option.type === 'add') {
          title = '新增收获地址'
        } else if (option.type === 'edit') {
          title = '编辑收获地址'
          this.addressData = JSON.parse(option.data)
          // console.log(JSON.parse(option.data))
        }
        uni.setNavigationBarTitle({
          title
        })
      },
      // 打开选择地址
      openAddres() {
        var index = this.$refs.simpleAddress.queryIndex(['湖南省', '长沙市', '岳麓区'], 'label');
        // console.log(index);
        this.cityPickerValueDefault = index.index;
        this.$refs.simpleAddress.open();
      },
      // 选中地址
      onConfirm(e) {
        // console.log(e)
        this.addressData.address = '中国,' + e.labelArr.join(',')
        // console.log(this.pickerText)
      },
      // 是否设为默认
      switchChange(e) {
        this.addressData.is_default = e.detail.value ? 1 : 0;
      },
      // 提交地址
      async submitAddress() {
				if(!this.addressData.contactor_name){
					this.$toast('请填写收货人姓名')
					return;
				}
				if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(this.addressData.phone)){
					this.$toast('请输入正确的手机号码');
					return;
				}
				if(!this.addressData.address){
					this.$toast('请在选择所在位置');
					return;
				}
				if(!this.addressData.street){
					this.$toast('请填写街道信息');
					return;
        }
        await this.$store.dispatch('_changAddress', this.addressData)
        this.$toast('地址添加成功')
        history.back(-1)
        this.$store.dispatch('_getAddress')
      }
    }
  }
</script>

<style lang='scss' scoped>
  page {
    background: #f7f7f7;
    font-size: 12px;
    color: #303133;
    .address-option {
      margin-top: 15upx;
      .item {
        display: flex;
        align-items: center;
        padding: 30upx 30upx;
        border-bottom: 1px solid #f7f7f7;
        background-color: #fff;
        text {
          width: 120upx;
        }
        input {
          flex: 1;
          font-size: 12px;
        }
      }
      .setDefault {
        display: flex;
        justify-content: space-between;
        margin-top: 15upx;
        padding: 16upx 30upx;
      }
    }
    .submit {
      margin: 60upx 30upx;
      padding: 20upx 0;
      text-align: center;
      border-radius: 16upx;
      background-color: #fa436a;
      box-shadow: 1px 2px 5px rgba(219,63,96,.4);
      font-size: 13px;
      color: #fff;
    }
  }
</style>