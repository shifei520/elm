<template>
  <!-- 首页城市列表 -->
  <div class="home">
    <!-- 头部区域 -->
    <nav-header>
      <div slot="left" @click="reLoad">ele.me</div>
      <div slot="right"><a href="#">登录|注册</a></div>
    </nav-header>
    <!-- 当前定位城市区域 -->
    <div class="city-guess">
      <div class="tip">
        <span>当前定位城市</span><span>定位不准时，请在城市列表中选择</span>
      </div>
      <div class="guess">
        <span @click="toAddress()">{{ currentCity.name }}</span
        ><i class="iconfont icon-jiantou"></i>
      </div>
    </div>
    <!-- 热门城市 -->
    <div class="city-hot">
      <h4>热门城市</h4>
      <ul class="hot-city-ul">
        <li
          v-for="item in hotCityList"
          :key="item.id"
          @click="toAddress(item.id)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>

    <!-- 所有城市 -->
    <van-index-bar :sticky="false">
      <div v-for="(value, i) in allCityObj" :key="i" class="city-letter-mode">
        <van-index-anchor
          :index="Object.keys(value)[0]"
          class="city-letter-hd"
        />
        <ul class="city-letter-main">
          <li
            v-for="item in Object.values(value)[0]"
            :key="item.id"
            @click="toAddress(item.id)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </van-index-bar>
  </div>
</template>

<script>
// 引入头部组件
import NavHeader from 'components/common/Header'
// 引入城市网络请求函数
import { citiesList } from 'network/city.js'

export default {
  name: 'Home',
  components: {
    NavHeader,
  },
  data() {
    return {
      // 当前城市信息
      currentCity: {
        name: '',
        id: 0,
      },
      // 热门城市信息
      hotCityList: [],
      // 所有城市信息
      allCityObj: [],
    }
  },
  created() {
    this.getCityList()
  },
  methods: {
    getCityList() {
      // 定位城市
      citiesList('guess').then((res) => {
        if (res.status === 200) {
          ;({ name: this.currentCity.name, id: this.currentCity.id } = res.data)
        }
      })
      // 热门城市
      citiesList('hot').then((res) => {
        if (res.status === 200) {
          this.hotCityList = res.data
        }
      })
      // 所有城市
      citiesList('group').then((res) => {
        if (res.status === 200) {
          let obj = res.data
          let arr = [
            { A: [] },
            { B: [] },
            { C: [] },
            { D: [] },
            { E: [] },
            { F: [] },
            { G: [] },
            { H: [] },
            { I: [] },
            { J: [] },
            { K: [] },
            { L: [] },
            { M: [] },
            { N: [] },
            { O: [] },
            { P: [] },
            { Q: [] },
            { R: [] },
            { S: [] },
            { T: [] },
            { U: [] },
            { V: [] },
            { W: [] },
            { X: [] },
            { Y: [] },
            { Z: [] },
          ]

          for (let k in obj) {
            for (let i in arr) {
              let index = Object.keys(arr[i])[0]
              if (k == index) {
                arr[i][index] = obj[k]
              }
            }
          }
          this.allCityObj = arr
        }
      })
    },
    // 刷新事件
    reLoad() {
      window.location.reload()
    },
    // 城市跳转
    toAddress(id) {
      let iid = 0
      if (id) {
        iid = id
      } else {
        iid = this.currentCity.id
      }
      this.$router.push('/city/' + iid)
    },
  },
}
</script>

<style lang="less" scoped>
@fontColor: #e4e4e4;
@blueColor: #3190e8;
.borderStyle() {
  border-top: 1px solid @fontColor;

  box-shadow: 0 -1px 5px #ccc;
}
.home {
  background-color: #f5f5f5;
  .city-guess {
    height: 82px;
    margin-top: 46px;
    background-color: #fff;
    box-shadow: 0 1px 5px #ccc;
    .tip,
    .guess {
      display: flex;
      height: 41px;
      padding: 0 8px;
      justify-content: space-between;
      align-items: center;
    }
    .tip {
      font-size: 12px;
    }
    .guess {
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      span {
        color: @blueColor;
        font-size: 18px;
      }
    }
  }
  .city-hot {
    margin-top: 20px;
    font-size: 12px;
    border-bottom: 1px solid @fontColor;
    background-color: #fff;
    .borderStyle();

    h4 {
      padding: 0 8px;
      height: 36px;
      line-height: 36px;
    }
  }
  .hot-city-ul,
  .city-letter-main {
    display: flex;
    flex-flow: wrap;
    font-size: 14px;
    text-align: center;
    li {
      width: 25%;
      height: 41px;
      line-height: 41px;
      color: @blueColor;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      border-top: 1px solid #e4e4e4;
      border-right: 1px solid #e4e4e4;
      &:nth-child(4n) {
        border-right: 0;
      }
    }
  }
  .city-letter-mode {
    margin-top: 15px;
    background-color: #fff;

    border-bottom: 1px solid @fontColor;
    .city-letter-hd {
      .borderStyle();
    }
    .city-letter-main {
      li {
        color: #000;
      }
    }
  }
}
</style>