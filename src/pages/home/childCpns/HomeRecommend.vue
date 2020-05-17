<template>
  <navigator id="recommend"
             url="/pages/category/Category" 
             open-type="switchTab">
    <view class="image-icon">
      <image src="@/static/img/home/circle.png" class="circle"/>
      <image src="@/static/img/home/diamond.png" class="diamond"/>
    </view>
    <view class="content">
      <view class="content-top">分类精选</view>
      <view class="content-bottom">Competitive Products For You</view>
    </view>
    <uni-icons type="arrowright" size="18" color="#999"/>
  </navigator>
</template>

<script>
  import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"

  export default {
    name: 'HomeRecommend',
    components: {
      uniIcons
    }
  }
</script>

<style lang="scss" scoped>
  #recommend {
    display: flex;
    align-items: center;
    padding: 0 33upx 0  56upx;
    border-top: 20upx solid #f5f5f5;
    border-bottom: 20upx solid #f5f5f5;
    .image-icon {
      width: 15%;
      position: relative;
      top: 32upx;
      .circle {
        width: 72upx;
        height: 72upx;
      }
      .diamond {
        position: relative;
        top: -66upx;
        left: 12upx;
        width: 48upx;
        height: 40upx;
      }
    }
    .content {
      flex: 1;
      font-size: 32upx;
      font-weight: 700;
      .content-bottom {
        color: #999;
        font-size: 16upx;
      }
    }
  }
</style>