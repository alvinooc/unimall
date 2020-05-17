<template>
  <view class="set">
    <view class="set-item"
          v-for="(item, index) in setOptions"
          :key="index"
          @click="handleClick(item)">
      <text class="option">{{item}}</text>
      <text class="yticon icon-you"></text>

      <!-- 弹窗输入框 -->
    </view>
      <hFormAlert v-if="cancelShow"
                  name="cancel_desc" 
                  :title="title"
                  placeholder="" 
                  confirmColor="#eb8635"
                  cancelColor="#414245"
                  @confirm="confirm" 
                  @cancel="cancel"/>
  </view>
</template>

<script>
  import hFormAlert from '@/components/uni/h-form-alert/h-form-alert.vue'

  export default {
    name: 'Set',
    components: {
      hFormAlert
    },
    data() {
      return {
        setOptions: ['修改昵称', '修改密码'],
        cancelShow: false,
        title: ''
      }
    },
    methods: {
      handleClick(title) {
        this.cancelShow = true
        this.title = title
      },
      confirm(e) {
        // console.log(e.cancel_desc)
        let params = {}
        if (this.title === '修改昵称') {
          params = {
            nickname: e.cancel_desc
          }
        } else if (this.title === '修改密码') {
          params = {
            password: e.cancel_desc
          }
        }
        this.$http.changeUserInfo(params).then(res => {
          this.$toast('修改成功', 1500, false, 'success')
          this.cancelShow = false
        })
      },
      cancel() {
        this.cancelShow = false
      }
    }
  }
</script>

<style lang='scss' scoped>
  page {
    background-color: #f7f7f7;
  }
  .set {
    margin-top: 15upx;
    background-color: #fff;
  }
  .set-item {
    display: flex;
    justify-content: space-between;
    position: relative;
    padding: 20upx 30upx;
    .option {
      padding: 10upx 0;
      font-size: 12px;
      color: #303133;
    }
    .icon-you::before {
      content: "\E606";
      font-size: 13px;
      color: #909399;
      margin-left: 4px;
    }
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      left: 12px;
      border-bottom: 1px solid #e4e7ed;
    }
  }
</style>