<template>
  <div class="city">
    <!-- 头部区域 -->
    <nav-header>
      <div slot="left" @click="backPage">
        <span class="iconfont">&#xe7ef;</span>
      </div>
      <div slot="center" class="curCityName">{{ cityInfo.name }}</div>
      <div slot="right">切换城市</div>
    </nav-header>
    <!-- 搜索框 -->
    <section class="city-search">
      <input
        type="search"
        placeholder="输入学校、商务楼、地质"
        v-model="queryInfo.keyword"
      />
      <input type="submit" value="提交" @click="getSearchInfo" />
    </section>
    <header class="search-history" v-if="isHistoryShow">搜索历史</header>
    <ul class="addressItems" ref="addressItemsRef">
      <li
        v-for="(item, index) in addressInfo"
        :key="index"
        @click="saveRecord(item)"
      >
        <h4>{{ item.name }}</h4>
        <p>{{ item.address }}</p>
      </li>
    </ul>
    <footer
      class="clear-history"
      v-if="isHistoryShow && clearShow"
      @click="clearAll"
    >
      清空所有
    </footer>
  </div>
</template>

<script>
// 引入头部组件
import NavHeader from 'components/common/Header'
// 引入网络请求相关函数
import { cityCheckedInfo } from 'network/city.js'
import { searchAddress } from 'network/address.js'
// 引入配置函数
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from 'utils/search.js'
export default {
  name: 'City',
  components: {
    NavHeader,
  },
  data() {
    return {
      // 获取当前所选城市信息
      cityInfo: {},
      // 搜索参数
      queryInfo: {
        city_id: 0,
        keyword: '',
        type: 'search',
      },
      // 搜索列表
      addressInfo: [],
      // 控制搜索历史的显示与隐藏
      isHistoryShow: true,
      // 控制清空所有按钮的显示隐藏
      clearShow: true,
      // 历史记录数组
      historyList: [],
    }
  },
  created() {
    this.getCheckedCity()
    // 历史数据列表渲染
    this.getRecord()
  },

  methods: {
    // 返回上一步操作
    backPage() {
      window.history.back()
    },
    // 获取所选城市信息
    getCheckedCity() {
      let id = this.$route.params.id
      cityCheckedInfo(id).then((res) => {
        this.cityInfo = res.data
        this.queryInfo.city_id = res.data.id
      })
    },
    // 搜索信息
    getSearchInfo() {
      if (this.queryInfo.keyword === '')
        return this.$notify({ type: 'warning', message: '请输入搜索内容' })
      searchAddress(this.queryInfo).then((res) => {
        if (res.status !== 200)
          return this.$notify({ type: 'danger', message: '搜索失败' })
        this.addressInfo = res.data
        this.isHistoryShow = false
      })
    },
    // 存储历史信息
    saveRecord(item) {
      if (getLocalStorage('addressInfoHistory')) {
        let arr = JSON.parse(getLocalStorage('addressInfoHistory'))
        let isExist = false
        arr.forEach((value) => {
          if (value.geohash == item.geohash) {
            return (isExist = true)
          }
        })
        if (!isExist) {
          arr.push(item)
          setLocalStorage('addressInfoHistory', arr)
        }
      } else {
        this.historyList.push(item)
        setLocalStorage('addressInfoHistory', this.historyList)
      }
      this.$router.push({
        path: '/msite',
        query: {
          geohash: item.geohash,
        },
      })
    },
    // 获取历史信息
    getRecord() {
      if (getLocalStorage('addressInfoHistory')) {
        this.addressInfo = JSON.parse(getLocalStorage('addressInfoHistory'))
      } else {
        this.addressInfo = []
      }
    },
    // 清空所有
    clearAll() {
      removeLocalStorage('addressInfoHistory')
      this.getRecord()
      this.clearShow = false
    },
  },
}
</script>

<style lang="less" scoped>
@fontColor: #e4e4e4;
// 混入变量
.borderStyle() {
  border-top: 1px solid @fontColor;
  border-bottom: 1px solid @fontColor;
  box-shadow: 0 -0.5px 7px 0px #ccc;
}
.iconfont {
  font-size: 28px;
}
.city {
  padding-top: 1px;
}
.curCityName {
  text-align: center;
  font-size: 25px;
  font-weight: 800;
}
.city-search {
  margin-top: 60px;
  height: 100px;
  background-color: #fff;
  padding: 12px 20px;
  .borderStyle();
  input {
    width: 100%;
    height: 30px;
    &[type='submit'] {
      margin-top: 10px;
      color: #fff;
      background-color: #3190e8;
      text-align: center;
    }
    &[type='search'] {
      border: 1px solid @fontColor;
      padding-left: 8px;
      :valid + .clear-input {
        display: block;
      }
      &::-webkit-input-placeholder {
        color: #999;
        font-size: 14px;
        padding-left: 8px;
      }
      &::-moz-placeholder {
        color: #999;
        font-size: 14px;
        padding-left: 8px;
      }
      &:-moz-placeholder {
        color: #999;
        font-size: 14px;
        padding-left: 8px;
      }
      &:-ms-input-placeholder {
        color: #999;
        font-size: 14px;
        padding-left: 8px;
      }
    }
  }
}
.search-history {
  font-size: 14px;
  padding-left: 8px;
  text-align: center;
}
.clear-history {
  height: 47px;
  line-height: 47px;
  width: 100%;
  background-color: #fff;
  text-align: center;
}
.addressItems {
  background-color: #fff;
  li {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-around;
    height: 72px;
    width: 100%;
    padding-left: 12px;
    border-bottom: 1px solid @fontColor;
    p {
      font-size: 12px;
      color: #999;
    }
  }
}
</style>