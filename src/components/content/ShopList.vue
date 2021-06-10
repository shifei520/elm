<template>
  <div
    class="shop-list"
    ref="wrapper"
    :style="{ height: wrapperHeight + 'px' }"
  >
    <ul class="list-show">
      <router-link
        :to="{
          path: '/shop',
          query: {
            id: item.id,
          },
        }"
        tag="li"
        v-for="item in childList"
        :key="item.id"
      >
        <!-- 左侧图片区域 -->
        <img :src="imgBaseUrl + item.image_path" alt="" @load="imgLoaded" />
        <!-- 中间费用信息区域 -->
        <div class="price-info">
          <div class="brand-title">
            <i>品牌</i><i>{{ item.name }}</i>
          </div>
          <div>
            <van-rate v-model="item.rating" color="#ff9a0d" size="7px" /><i
              class="star"
              >{{ item.rating }}</i
            ><span class="orders">月售{{ item.recent_order_num }}单</span>
          </div>
          <div class="distri-pric">
            ￥{{ item.float_minimum_order_amount }}起送<span class="divide"
              >/</span
            >
            {{ item.piecewise_agent_fee.tips }}
          </div>
        </div>
        <!-- 右侧区域 -->
        <div class="right">
          <div class="supports">
            <span v-for="(value, index) in item.supports" :key="index">{{
              value.icon_name
            }}</span>
          </div>
          <div class="delivery">
            <span
              v-if="!!item.delivery_mode"
              :style="{ 'background-color': '#' + item.delivery_mode.color }"
              >{{ item.delivery_mode.text }}</span
            >
            <span v-if="isOntime(item.supports)">准时达</span>
          </div>
          <div class="distance">
            <span>{{ item.distance }}/</span>
            <span>{{ item.order_lead_time }}</span>
          </div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { imgBaseUrl } from 'utils/env.js'
// 引入滚动插件
import BScroll from 'better-scroll'
// 引入防抖函数
// import debounce from 'utils/debounce'
export default {
  name: 'ShopList',
  data() {
    return {
      // 图片基本地址
      imgBaseUrl,
      // 滚动插件的实例
      scroll,
      refresh: null,
      wrapperHeight: 0,
    }
  },
  props: {
    childList: Array,
    scrollHeight: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
    })
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.offsetTop -
      this.scrollHeight
  },

  methods: {
    // 图片是否加载完成
    imgLoaded() {
      this.scroll.refresh()
    },
    // 是否准时
    isOntime(value) {
      let flag = false
      value.forEach((item) => {
        if (item.icon_name === '准') flag = true
      })
      return flag
    },
  },
}
</script>

<style lang="less" scoped>
@blueColor: #3190e8;
@greyColor: #999;
.borderTop() {
  border-top: 1px solid #eee;
}
.flexStyle() {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.shop-list {
  position: absolute;
  overflow: hidden;
  width: 100%;
  .list-show {
    li {
      display: flex;
      justify-content: space-between;
      height: 106px;
      padding: 8px;
      background-color: #fff;
      &:nth-child(n + 2) {
        .borderTop();
      }
      img {
        width: 64px;
        height: 64px;
        margin-top: 8px;
      }
      .price-info {
        .flexStyle();
        padding-left: 6px;
        .brand-title {
          i {
            font-size: 16px;
            font-weight: 600;
            &:first-child {
              font-size: 12px;
              margin-right: 6px;
              background-color: #ffd930;
            }
          }
        }
        .star,
        .orders,
        .distri-pric {
          font-size: 10px;
          margin-left: 6px;
        }
        .star {
          color: #ff9a0d;
        }
      }
      .right {
        .flexStyle();
        align-items: flex-end;
        font-size: 10px;
        .supports {
          span {
            color: @greyColor;
            margin-left: 6px;
          }
        }
        .delivery {
          span {
            padding: 1px 2px;
            color: #fff;
            border-radius: 1px;
            &:nth-child(2) {
              color: @blueColor;
              border: 1px solid @blueColor;
            }
          }
        }
        .distance {
          span {
            &:first-child {
              color: @greyColor;
            }
            &:last-child {
              color: @blueColor;
            }
          }
        }
      }
    }
  }
}
</style>