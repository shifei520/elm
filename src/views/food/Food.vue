<template>
  <div class="food">
    <!-- 头部导航区域 -->
    <nav-header>
      <span slot="left" class="iconfont backTo" @click="backPage"
        >&#xe7ef;</span
      >
      <h4 slot="center" class="search">{{ nowTitle }}</h4>
    </nav-header>

    <van-dropdown-menu z-index="9999" active-color="#3190e8">
      <!-- 分类 -->
      <van-dropdown-item :title="cateName" ref="cate" @open="getAllCategory">
        <van-row>
          <van-col span="12">
            <ul class="left-cate">
              <li
                v-for="(item, index) in storeCateList"
                :key="index"
                @click="tabSwitch(item)"
                :class="{ active: isActive == item.id }"
              >
                <section>
                  <img :src="getImgPath(item.image_url)" alt="" />{{
                    item.name
                  }}
                </section>
                <section>
                  <span>{{ item.count }} </span>
                  <i class="iconfont">&#xe61f;</i>
                </section>
              </li>
            </ul>
          </van-col>
          <van-col
            span="12"
            :style="{ height: storeCateList.length * 42 + 'px' }"
          >
            <ul class="right-cate">
              <li
                v-for="(item, index) in storeLeftDetail.slice(1)"
                :key="index"
                @click="getCategoryIds(item.id, item.name)"
              >
                <span>{{ item.name }}</span
                ><span>{{ item.count }}</span>
              </li>
            </ul>
          </van-col>
        </van-row>
      </van-dropdown-item>
      <!-- 排序 -->
      <van-dropdown-item title="排序" ref="sort" @open="getOrderInfo">
        <ul class="sort-ul">
          <li
            v-for="item in sortOrderList"
            :key="item.id"
            @click="sortStoreList(item.id)"
          >
            <span
              class="iconfont"
              v-html="item.icon"
              :style="{ color: item.color }"
            ></span
            ><span>{{ item.mode }}</span>
          </li>
        </ul>
      </van-dropdown-item>
      <!-- 筛选 -->
      <van-dropdown-item title="筛选" ref="screen">
        <!-- 配送方式 -->
        <section class="delivery-modes">
          <header>配送方式</header>
          <ul class="delivery-mode-list">
            <li
              v-for="item in deliveryList"
              :key="item.id"
              @click="checkModes(item.id, item)"
            >
              <span class="iconfont" v-if="item.status">&#xe62a;</span>
              <span class="iconfont" v-else>&#xe501;</span
              ><span :class="{ checked: item.status }">{{ item.text }}</span>
            </li>
          </ul>
        </section>
        <!-- 商家属性 -->
        <section class="seller-attr">
          <header>商家属性（可以多选）</header>
          <ul class="seller-attr-list">
            <li
              v-for="item in sellerAttrList"
              :key="item.id"
              @click="checkAttrs(item.id, item)"
            >
              <span class="iconfont" v-if="item.status">&#xe62a;</span>
              <span
                class="attr-icon"
                :style="{
                  color: '#' + item.icon_color,
                  borderColor: '#' + item.icon_color,
                }"
                v-else
                >{{ item.icon_name }}</span
              ><span :class="{ checked: item.status }">{{ item.name }}</span>
            </li>
          </ul>
        </section>
        <!-- 清空和确定按钮 -->
        <footer class="footer-btns">
          <input type="button" value="清空" @click="clearAllAttrs" />
          <input type="button" value="确定" @click="screenStoreList" />
        </footer>
      </van-dropdown-item>
    </van-dropdown-menu>
    <!-- 商品列表展示 -->
    <shop-list
      :childList="foodStoreList"
      class="food-list"
      :scrollHeight="0"
      ref="shopListRef"
    ></shop-list>
  </div>
</template>

<script>
// 引入头部组件
import NavHeader from 'components/common/Header'
// 引入网络请求函数
import {
  storeList,
  restaurantCategory,
  deliveryModes,
  sellerAttr,
} from 'network/goodsInfo.js'
// 引入店铺列表展示组件
import ShopList from 'components/content/ShopList.vue'
// 对传过来的图片地址进行转码拼接
import { getImgPath } from 'utils/env.js'
import axios from 'axios'
export default {
  name: 'Food',
  components: {
    NavHeader,
    ShopList,
  },
  data() {
    return {
      // 当前导航标题
      nowTitle: '',
      // 店铺列表
      foodStoreList: [],
      // 请求店铺列表相关参数
      queryInfo: {
        latitude: '',
        longitude: '',
        restaurant_category_id: 0,
        support_ids: [],
        delivery_mode: [],
      },
      // 进入页面时显示的分类
      cateName: '',
      // 商铺左侧分类列表
      storeCateList: [],
      // 商铺右侧分类列表
      storeLeftDetail: [],
      // 控制tab栏切换样式
      isActive: 0,
      // 排序信息列表
      sortOrderList: [],
      // 配送方式列表
      deliveryList: [],
      // 商家属性列表
      sellerAttrList: [],
      // 商家属性颜色
    }
  },
  mixins: [getImgPath],
  created() {
    this.initData()
    this.getStoreList()
    this.getStoreList()
    // 配送方式
    this.getDeliveryModes()
  },
  methods: {
    // 返回上一步操作
    backPage() {
      window.history.back()
    },
    // 初始化数据
    initData() {
      this.nowTitle = this.$route.query.title
      this.cateName = this.$route.query.title
      this.queryInfo.restaurant_category_id = parseInt(
        this.$route.query.restaurant_category_id
      )
      this.isActive = this.$route.query.restaurant_category_id
      this.queryInfo.latitude = this.$route.query.geohash.split(',')[0]
      this.queryInfo.longitude = this.$route.query.geohash.split(',')[1]
    },
    // 获取店铺列表
    getStoreList() {
      storeList(this.queryInfo).then((res) => {
        this.foodStoreList = res.data
      })
    },
    // 获取所有商铺分类列表
    getAllCategory() {
      restaurantCategory(
        this.queryInfo.latitude,
        this.queryInfo.longitude
      ).then((res) => {
        this.storeCateList = res.data
        this.storeCateList.forEach((item) => {
          if (item.id == this.queryInfo.restaurant_category_id) {
            this.storeLeftDetail = item.sub_categories
          }
        })
      })
    },
    // 店铺分类列表右侧切换
    tabSwitch(item) {
      this.storeLeftDetail = item.sub_categories
      this.isActive = item.id
    },
    // 点击分类列表右侧从新获取店铺列表
    getCategoryIds(id, name) {
      // let newQueryInfo = JSON.parse(JSON.stringify(this.queryInfo))
      this.queryInfo.restaurant_category_ids = []
      this.queryInfo.restaurant_category_ids[0] = id

      storeList(this.queryInfo).then((res) => {
        this.foodStoreList = res.data
        this.$refs.cate.toggle()
        this.cateName = name
        this.$refs.shopListRef.scroll.refresh()
      })
    },
    // 获取排序信息
    getOrderInfo() {
      axios('../sort.json').then((res) => {
        this.sortOrderList = res.data
      })
    },
    // 点击相应排序方式后进行店铺排序
    sortStoreList(id) {
      this.queryInfo.order_by = id
      storeList(this.queryInfo).then((res) => {
        this.foodStoreList = res.data
        this.$refs.sort.toggle()
        this.$refs.shopListRef.scroll.refresh()
      })
    },
    // 获取筛选功能中的配送方式和商家属性
    getDeliveryModes() {
      // 获取配送方式
      let latitude = this.queryInfo.latitude
      let longitude = this.queryInfo.longitude
      deliveryModes(latitude, longitude).then((res) => {
        res.data.forEach((item) => {
          item.status = false
        })
        this.deliveryList = res.data
      })
      // 获取商家属性列表
      sellerAttr(latitude, longitude).then((res) => {
        res.data.forEach((item) => {
          item.status = false
        })
        this.sellerAttrList = res.data
      })
    },
    // 选中商家属性列表id数组
    checkAttrs(id, item) {
      let index = this.queryInfo.support_ids.indexOf(id)
      if (index < 0) {
        this.queryInfo.support_ids.push(id)
      } else {
        this.queryInfo.support_ids.splice(index, 1)
      }
      item.status = !item.status
    },
    // 选中商家配送方式列表数组
    checkModes(id, item) {
      let index = this.queryInfo.delivery_mode.indexOf(id)
      if (index < 0) {
        this.queryInfo.delivery_mode.push(id)
      } else {
        this.queryInfo.delivery_mode.splice(index, 1)
      }
      item.status = !item.status
    },
    // 清空选中的属性
    clearAllAttrs() {
      this.queryInfo.support_ids = []
      this.queryInfo.delivery_mode = []
      this.deliveryList.forEach((item) => {
        item.status = false
      })
      this.sellerAttrList.forEach((item) => {
        item.status = false
      })
    },
    // 点击筛选确定按钮进行筛选
    screenStoreList() {
      storeList(this.queryInfo).then((res) => {
        this.foodStoreList = res.data
        this.$refs.screen.toggle()
        this.$refs.shopListRef.scroll.refresh()
      })
    },
  },
}
</script>

<style lang="less" scoped>
@greyColor: #ccc;
.borderStyle() {
  border-bottom: 1px solid #e4e4e4;
}
.backTo {
  font-size: 24px;
  margin-right: 39px;
}
.search {
  font-weight: 600;
}
.van-dropdown-menu {
  margin-top: 46px;
}
.food-list {
  z-index: 9998;
}
.left-cate {
  background-color: #f5f5f5;
  li {
    display: flex;
    height: 42px;
    line-height: 42px;
    font-size: 12px;
    text-align: center;
    justify-content: space-around;
    align-items: baseline;
    img {
      width: 18px;
      height: 18px;
      margin-right: 8px;
      vertical-align: middle;
    }
    span {
      padding: 3px;
      margin-right: 5px;
      color: #fff;
      background-color: @greyColor;
      border: 1px soild @greyColor;
      border-radius: 14px;
    }
    .iconfont {
      font-size: 12px;
      color: @greyColor;
    }
  }
}
.van-col {
  overflow-y: scroll;
  .right-cate {
    margin-left: 8px;
    li {
      display: flex;
      justify-content: space-around;
      height: 42px;
      line-height: 42px;
      font-size: 12px;
      .borderStyle();
    }
  }
}
.sort-ul {
  li {
    display: flex;
    height: 59px;
    line-height: 59px;

    span {
      font-size: 14px;
      &:nth-child(1) {
        width: 40px;
        text-align: center;
      }
      &:nth-child(2) {
        flex: 1;
        .borderStyle();
      }
    }
  }
}
.delivery-modes,
.seller-attr {
  padding: 0 12px 20px;
  font-size: 14px;
  header {
    height: 36px;
    line-height: 36px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      height: 32px;
      line-height: 32px;
      padding: 0 20px 0 8px;
      margin-right: 5px;
      margin-bottom: 5px;
      border: 1px solid #eee;
      border-radius: 3px;
      .iconfont {
        color: #57a9ff;
      }
    }
  }
}
.seller-attr-list {
  li {
    .attr-icon {
      padding: 0 3px;
      border: 1px solid #fff;
      border-radius: 3px;
    }
    span {
      &:last-child {
        margin-left: 5px;
      }
    }
  }
}
.footer-btns {
  display: flex;
  height: 56px;
  width: 100%;
  padding: 8px 5px;
  background-color: #f1f1f1;
  justify-content: space-between;
  input {
    width: 48%;
    height: 100%;
    border-radius: 3px;
    &:first-child {
      background-color: #fff;
    }
    &:last-child {
      background-color: #56d176;
    }
  }
}
.active {
  background-color: #fff;
}
.checked {
  color: #3190e8;
}
</style>