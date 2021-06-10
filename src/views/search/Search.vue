<template>
  <div class="search">
    <!-- 头部导航区域 -->
    <nav-header>
      <span slot="left" class="iconfont backTo" @click="backPage"
        >&#xe7ef;</span
      >
      <h4 slot="center" class="search">搜索</h4>
    </nav-header>
    <!-- 搜索框 -->
    <section class="search-box-area">
      <input
        type="search"
        name="search"
        id="search-box"
        placeholder="请输入商家或美食名称"
        v-model="searchInfo.keyword"
      /><input type="submit" value="提交" id="submit" @click="getRestaurList" />
    </section>
    <!-- 利用表展示区域 -->
    <header class="store" v-if="isStoreWordShow">商家</header>
    <header class="store history" v-if="!isStoreWordShow">搜索历史</header>
    <ul class="list-display">
      <li v-for="item in restaurantList" :key="item.id">
        <img :src="imgBaseUrl + item.image_path" alt="" />
        <div class="list-main">
          <span>{{ item.name }} <i class="bee">支付</i></span>
          <span>月售{{ item.recent_order_num }}单</span>
          <span
            >{{ item.float_minimum_order_amount }}元起送 / 距离{{
              item.distance
            }}</span
          >
        </div>
      </li>
    </ul>
    <ul class="list-history" v-if="!isStoreWordShow">
      <li
        v-for="(item, index) in historyList"
        :key="index"
        @click="historyClick(item)"
      >
        {{ item }}
        <span class="iconfont" @click.stop="deleteOneHistory(item)"
          >&#xe60e;</span
        >
      </li>
    </ul>
    <footer
      class="clear-history"
      @click="clearAllHistory"
      v-if="!isStoreWordShow && historyList.length > 0"
    >
      清空搜索历史
    </footer>
  </div>
</template>

<script>
// 引入网络请求相关函数
import { searchRestaurant } from 'network/goodsInfo.js'
// 引入头部组件
import NavHeader from 'components/common/Header'
// 引入vuex辅助函数取货经纬度
import { mapGetters } from 'vuex'
import { imgBaseUrl } from 'utils/env.js'
// 引入localstorage函数存储历史记录
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from 'utils/search.js'
export default {
  name: 'Search',
  components: {
    NavHeader,
  },
  data() {
    return {
      // 搜索餐馆相关参数
      searchInfo: {
        keyword: '',
        geohash: '',
      },
      // 搜索餐馆列表
      restaurantList: [],
      // 决定商家字样是否出现
      isStoreWordShow: false,
      // 图片基本地址
      imgBaseUrl,
      // 历史记录数组
      historyList: [],
      // 历史记录列表展示
    }
  },
  computed: {
    ...mapGetters(['getGeohash']),
  },
  created() {
    this.searchInfo.geohash = this.getGeohash
    this.getHistory()
  },
  methods: {
    // 点击搜索获取附近餐馆列表
    getRestaurList() {
      if (this.searchInfo.keyword === '')
        return this.$notify({ type: 'warning', message: '请输入搜索内容' })
      searchRestaurant(this.searchInfo).then((res) => {
        this.restaurantList = res.data
        this.isStoreWordShow = true
        // 判断历史记录是否为空，如果为空直接存储，不为空......
        if (getLocalStorage('searchInfoHistory')) {
          let arr = JSON.parse(getLocalStorage('searchInfoHistory'))
          let index = arr.findIndex((value) => {
            return value === this.searchInfo.keyword
          })
          if (index === -1) {
            arr.push(this.searchInfo.keyword)
            setLocalStorage('searchInfoHistory', arr)
          }
        } else {
          this.historyList.push(this.searchInfo.keyword)
          setLocalStorage('searchInfoHistory', this.historyList)
        }
      })
    },
    // 获取历史记录
    getHistory() {
      if (getLocalStorage('searchInfoHistory')) {
        this.historyList = JSON.parse(getLocalStorage('searchInfoHistory'))
      } else {
        this.historyList = []
      }
    },
    // 清空所有搜索历史
    clearAllHistory() {
      removeLocalStorage('searchInfoHistory')
      this.historyList = []
    },
    // 点击搜索历史再次搜索
    historyClick(item) {
      this.searchInfo.keyword = item
      this.getRestaurList()
    },
    // 删除当前点击的历史记录
    deleteOneHistory(item) {
      let arr = JSON.parse(getLocalStorage('searchInfoHistory'))
      arr = arr.filter((value) => {
        return value !== item
      })
      setLocalStorage('searchInfoHistory', arr)
      this.getHistory()
    },
    // 返回上一步操作
    backPage() {
      window.history.back()
    },
  },
}
</script>

<style lang="less" scoped>
@color: #3190e8;
.borderBottom() {
  border-bottom: 1px solid #eee;
}
.search {
  .backTo {
    font-size: 24px;
    margin-right: 39px;
  }
  .search {
    font-weight: 600;
  }
  .search-box-area {
    display: flex;
    height: 60px;
    margin-top: 46px;
    padding: 10px;
    background-color: #fff;
    #search-box {
      flex: 1;
      height: 36px;
      font-weight: 700;
      padding: 0 6px;
      font-size: 16px;
      border: 1px solid #e4e4e4;
      border-radius: 3px;
      background-color: #f2f2f2;
    }
    #submit {
      width: 78px;
      height: 36px;
      margin-left: 4px;
      color: #fff;
      background-color: @color;
      border-radius: 3px;
    }
  }
  .store {
    padding-left: 10px;
    height: 44px;
    line-height: 44px;
    font-size: 16px;
  }
  .list-display {
    li {
      display: flex;
      height: 100px;
      padding: 0 8px 15px;

      background-color: #fff;
      .borderBottom();
      img {
        width: 64px;
        height: 64px;
        margin-top: 8px;
      }
      .list-main {
        display: flex;
        width: 100%;
        padding: 10px 8px;
        font-size: 14px;
        flex-direction: column;
        justify-content: space-around;
        .borderBottom();
        .bee {
          display: inline-block;
          height: 20px;
          width: 31px;
          font-weight: 550;
          color: rgb(255, 96, 0);
          border: 1px solid rgb(255, 96, 0);
          transform: skew(-30deg);
          -webkit-transform: skew(-30deg);
          -moz-transform: skew(-30deg);
          -ms-transform: skew(-30deg);
          -o-transform: skew(-30deg);
        }
      }
    }
  }
  .list-history > li {
    display: flex;
    justify-content: space-between;
  }
  .list-history > li,
  .clear-history {
    height: 46px;
    line-height: 46px;
    padding: 0 8px;
    background-color: #fff;
    .borderBottom();
  }

  .clear-history {
    color: @color;
    font-weight: 700;
    text-align: center;
  }
}
</style>