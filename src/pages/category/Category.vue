<template>
  <view id="category">
    <scroll-view class="left">
      <block v-for="(item, index) in categoryData" :key="index">
          <view class="left-item"
                :class="{active: currentIndex === index}"
                @click="handleLeftClick(index)">
            {{item.name}}
          </view>
      </block>
    </scroll-view>
    <scroll-view class="right">
      <block v-for="(cate, index) in categoryData" :key="index">
         <block v-for="item in cate.childlist" :key="item.id">
           <view class="right-item" v-if="currentIndex === index">
            <view class="right-item-title">{{item.name}}</view>
            <view class="right-item-goodsList">
              <block v-for="goods in item.childlist" :key="goods.id">
                <navigator :url="'/pages/product/Product?id=' + goods.id">
                  <view class="right-item-goods">
                    <image :src="goods.image"/>
                    <view>{{goods.name}}</view>
                  </view>
                </navigator>
              </block>
            </view>
          </view>
         </block>
      </block>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    name: 'Category',
    data() {
      return {
        categoryData: [],
        currentIndex: 0
      }
    },
    onLoad() {
      // 获取分类数据
      this._getCategory()
    },
    onPullDownRefresh() {
      setTimeout(function () {
        uni.stopPullDownRefresh()
      }, 300)
    },
    methods: {
      // 获取分类数据
      async _getCategory() {
        uni.showLoading({
          title: '加载中'
        })
        const res = await this.$http.getCategory()
        this.categoryData = res.data.data
        uni.hideLoading()
      },
      // 分类切换
      handleLeftClick(index) {
        this.currentIndex = index
      }
    }
  }
</script>

<style lang='scss' scoped>
  page {
    height: 100%;
    background-color: #f8f8f8;
  }
  #category {
    display: flex;
    height: 100%;
    .left {
      width: 200upx;
      background-color: #fff;
      .left-item {
        position: relative;
        width: 200upx;
        height: 100upx;
        line-height: 100upx;
        text-align: center;
        font-size: 24upx;
        color: #606266;
        border-bottom: 2upx solid #eff1f5;
      }
      .active {
        background-color: #f8f8f8;
        color: #fa436a;
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 8upx;
          height: 38upx;
          background-color: #fa436a;
          border-radius: 0 4px 4px 0;
          opacity: .8;
        }
      }
    }
    .right {
      height: 100%;
      padding-left: 20upx;
      background-color: #f8f8f8;
      .right-item {
        color: #303133;
        font-size: 24upx;
        .right-item-title {
          padding: 20upx 0 10upx;
        }
        .right-item-goodsList{
          display: flex;
          flex-wrap: wrap;
          padding: 20upx 0;
          background-color: #fff;
          .right-item-goods {
            width: 175upx;
            text-align: center;
            image {
              width: 140upx;
              height: 140upx;
            }
          }
        }
      }
    }
  }

  
</style>