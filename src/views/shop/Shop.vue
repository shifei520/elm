<template>
  <div class="shop">
    <!-- 详情头部区域 -->
    <header class="shop-header">
      <!-- 返回按钮 -->
      <span class="iconfont goback" @click="goBack">&#xe7ef;</span>
      <!-- 头部背景 -->
      <div class="header-bc">
        <img :src="imgBaseUrl + storeDetailObj.image_path" alt="" />
      </div>
      <!-- 头部内容 -->
      <section class="main-content">
        <router-link to="/shop/shopDetail" class="skip-router">
          <!-- 头部左侧内容 -->
          <section class="main-left">
            <img :src="imgBaseUrl + storeDetailObj.image_path" alt="" />
          </section>
          <!-- 头部右侧内容 -->
          <section class="main-right">
            <h4>{{ storeDetailObj.name }}</h4>
            <p>
              商家配送 / {{ storeDetailObj.order_lead_time }}送达 / 配送费￥{{
                storeDetailObj.float_delivery_fee
              }}
            </p>
            <p>公告：{{ storeDetailObj.promotion_info }}</p>
          </section>
          <span class="iconfont next-detail">&#xe61f;</span>
        </router-link>
      </section>
    </header>
    <!-- tab标签栏切换 -->
    <van-tabs v-model="active" color="#3190e8">
      <van-tab title="商品">
        <van-sidebar v-model="activeKey" height="500px">
          <van-sidebar-item
            :title="item.name"
            v-for="item in foodCateList"
            :key="item.id"
            @click="skipPosition"
          />
        </van-sidebar>
        <section id="right-all-list" ref="wrapper">
          <ul>
            <li v-for="item in foodCateList" :key="item.id">
              <header>
                <h5>{{ item.name }}</h5>
                <span>{{ item.description }}</span>
              </header>
              <section v-for="(item1, index) in item.foods" :key="index">
                <img :src="imgBaseUrl + item1.image_path" alt="" />
                <div class="store-detail-info">
                  <div class="store-title">
                    <h4>{{ item1.name }}</h4>
                    <span v-if="item1.attributes.length !== 0"
                      ><span
                        v-if="item1.attributes[0]"
                        :style="{
                          borderColor: '#' + item1.attributes[0].icon_color,
                          color: '#' + item1.attributes[0].icon_color,
                        }"
                      >
                        {{ item1.attributes[0].icon_name }}
                      </span></span
                    >
                  </div>
                  <i>{{ item1.description }}</i>
                  <div class="rate-sales">
                    月售{{ item1.month_sales }}份 好评率{{
                      item1.satisfy_rate
                    }}%
                  </div>
                  <div class="activity-info">
                    <span
                      v-if="item1.activity"
                      :style="{
                        borderColor: '#' + item1.activity.icon_color,
                        color: '#' + item1.activity.icon_color,
                      }"
                      >{{ item1.activity.image_text }}</span
                    >
                  </div>
                  <footer>
                    <span
                      >￥{{ item1.specfoods[0].price }}
                      <i v-if="item1.specifications.length">起</i></span
                    ><span
                      v-if="item1.specifications.length"
                      class="check-specs"
                      >选{{ item1.specifications[0].name }}</span
                    >
                  </footer>
                </div>
              </section>
            </li>
          </ul>
        </section>
      </van-tab>
      <van-tab title="评价">评价</van-tab>
    </van-tabs>
  </div>
</template>

<script>
// 引入网络请求相关函数
import { storeDetailInfo, foodCateMenu } from 'network/storeDetail.js'
// 引入图片前缀
import { imgBaseUrl } from 'utils/env.js'
// 引入better-scroll滚动插件
import BScroll from 'better-scroll'
export default {
  name: 'Shop',
  data() {
    return {
      // 店铺详情信息
      storeDetailObj: {},
      // 图片地址
      imgBaseUrl,
      // 控制tab栏切换
      active: 0,
      // 餐馆id
      restaurant_id: 0,
      // 侧边栏导航的索引
      activeKey: 0,
      // 左侧视频分类列表数据
      foodCateList: [],
      bs: null,
    }
  },
  created() {
    this.initData()
    this.getStoreDetailInfo()
    this.getFoodCateMenu()
  },
  mounted() {
    this.$nextTick(() => {
      this.bs = new BScroll('#right-all-list', {
        bounce: false,
      })
      console.log(this.bs)
    })
  },
  methods: {
    // 初始化数据
    initData() {
      this.restaurant_id = this.$route.query.id
    },
    // 获取餐馆详情信息
    getStoreDetailInfo() {
      storeDetailInfo(this.restaurant_id).then((res) => {
        this.storeDetailObj = res.data
      })
    },
    // 返回上一级历史记录
    goBack() {
      window.history.back()
    },
    // 获取左侧食品分类列表
    getFoodCateMenu() {
      foodCateMenu(this.restaurant_id).then((res) => {
        this.foodCateList = res.data
      })
    },
    // 点击左侧导航跳转到相应位置
    skipPosition() {
      // this.bs.scrollTo()
    },
  },
}
</script>

<style lang="less" scoped>
.shop-header {
  position: relative;
  height: 90px;
  width: 100%;
  .header-bc {
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;
    z-index: 1;
    img {
      width: 100%;
      -webkit-filter: blur(7px) brightness(70%);
      filter: blur(7px) brightness(70%);
    }
  }
  .main-content {
    position: relative;
    padding: 8px;
    z-index: 2;
    img {
      width: 68px;
      height: 68px;
    }
    .skip-router {
      display: flex;
      .main-right {
        margin-left: 5px;
        h4,
        p {
          color: #fff;
        }
        p {
          margin-top: 8px;
          font-size: 12px;
        }
        h4 {
          font-weight: 700;
        }
      }
      .next-detail {
        position: absolute;
        right: 5px;
        top: 50%;
        color: #fff;
        transform: translateY(-50%);
      }
    }
  }
  .goback {
    position: absolute;
    top: -3px;
    left: -3px;
    color: #fff;
    font-size: 34px;
    font-weight: 700;
    z-index: 999;
  }
}
#right-all-list {
  width: 100%;
  height: 500px;
  overflow: hidden;
  li {
    header {
      display: flex;
      height: 49px;
      line-height: 49px;
      h5 {
        margin: 0 8px;
        color: #666;
        font-size: 18px;
        font-weight: 700;
      }
      span {
        font-size: 14px;
        color: #999;
      }
    }
    section {
      display: flex;
      height: 138px;
      width: 100%;
      padding: 10px;
      background-color: #fff;
      border-bottom: 1px solid #f8f8f8;
      img {
        width: 46px;
        height: 46px;
        margin-right: 8px;
      }
      .store-detail-info {
        width: 100%;
        .store-title {
          display: flex;
          justify-content: space-between;
          h4 {
            color: #333;
            font-weight: 700;
          }
          span {
            padding: 0 2px;
            font-size: 12px;
            border: 1px solid #fff;
            border-radius: 8px;
          }
        }
        i,
        .rate-sales {
          font-size: 14px;
        }
        i {
          color: #999;
        }
        .activity-info {
          span {
            padding: 0 1px;
            font-size: 12px;
            border: 1px solid #fff;
            border-radius: 8px;
          }
        }
        footer {
          display: flex;
          justify-content: space-between;
          span {
            &:first-child {
              color: #f60;
              font-weight: 700;
            }
          }
          .check-specs {
            padding: 4px;
            color: #fff;
            font-size: 14px;
            background-color: #3190e8;
            border-radius: 5px;
          }
        }
      }
    }
  }
}
.van-sidebar {
  height: 500px;
}
.van-sidebar-item--select::before {
  height: 100%;
  background-color: #3190e8;
}
.van-tab__pane {
  display: flex;
}
</style>