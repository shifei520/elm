<template>
  <div class="nav-bottom-bar" v-if="isshow">
    <div @click="routeSkip({ path: '/msite', query: { geohash } })">
      <span class="iconfont" :class="{ active: curRoute('/msite') !== -1 }"
        >&#xe8ca;</span
      >
      <p>外卖</p>
    </div>
    <div @click="routeSkip({ path: `/search/${geohash}` })">
      <span class="iconfont" :class="{ active: curRoute('/search') !== -1 }"
        >&#xe68f;</span
      >
      <p>搜索</p>
    </div>
    <div @click="routeSkip('/order')">
      <span class="iconfont" :class="{ active: curRoute('/order') !== -1 }"
        >&#xe61d;</span
      >
      <p>订单</p>
    </div>
    <div @click="routeSkip('/profile')">
      <span class="iconfont" :class="{ active: curRoute('/profile') !== -1 }"
        >&#xe642;</span
      >
      <p>我的</p>
    </div>
  </div>
</template>

<script>
// 引入vuex的辅助函数
import { mapState } from 'vuex'
export default {
  name: 'NavBottomBar',
  computed: {
    ...mapState(['latitude', 'longitude']),
    // 计算经纬度
    geohash() {
      return this.latitude + ',' + this.longitude
    },
    // 是否显示底部导航栏
    isshow() {
      return (
        this.$route.path.indexOf('/msite') !== -1 ||
        this.$route.path.indexOf('/order') !== -1 ||
        this.$route.path.indexOf('/search') !== -1 ||
        this.$route.path.indexOf('/profile') !== -1
      )
    },
  },
  methods: {
    // 路由跳转方法
    routeSkip(name) {
      this.$router.push(name)
    },
    // 计算当前路由
    curRoute(name) {
      return this.$route.path.indexOf(name)
    },
  },
}
</script>

<style lang="less" scoped>
.nav-bottom-bar {
  position: fixed;
  display: flex;
  height: 46px;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: 1px solid #eee;
  background-color: #fff;
  div {
    flex: 1;
    padding-top: 4px;
    text-align: center;
    p {
      font-size: 12px;
    }
  }
}
.active {
  color: #3190e8;
}
</style>