<template>
  <div class="msite">
    <!-- 头部区域 -->
    <nav-header class="msite-header">
      <router-link :to="`/search/${geohash}`" slot="left">
        <span class="iconfont">&#xe662;</span>
      </router-link>
      <div slot="center" class="detailInfo">{{ detailAddressInfo.name }}</div>
      <div slot="right">登录|注册</div>
    </nav-header>
    <!-- 商品分类区域 -->
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide>
        <router-link
          :to="{
            path: '/food',
            query: {
              geohash,
              title: item.title,
              restaurant_category_id: getCategoryId(item.link),
            },
          }"
          v-for="item in foodClassifyInfo.slice(0, 8)"
          :key="item.id"
        >
          <div class="food_item">
            <img
              :src="imgBaseUrl + item.image_url"
              alt=""
              class="classifyImgs"
            />
            <p>{{ item.title }}</p>
          </div>
        </router-link>
      </swiper-slide>
      <swiper-slide>
        <router-link
          :to="{
            path: '/food',
            query: {
              geohash,
              title: item.title,
              restaurant_category_id: getCategoryId(item.link),
            },
          }"
          v-for="item in foodClassifyInfo.slice(8)"
          :key="item.id"
        >
          <img :src="imgBaseUrl + item.image_url" alt="" class="classifyImgs" />
          <p>{{ item.title }}</p>
        </router-link>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- 店铺信息列表展示区域 -->
    <section class="storeInfoShow">
      <p><span class="iconfont store-icon">&#xe616;</span> 附近商家</p>
      <shop-list :childList="foodStoreList" :scrollHeight="44"></shop-list>
    </section>
  </div>
</template>

<script>
// 引入头部组件
import NavHeader from 'components/common/Header'
// 引入网络请求相关函数
import { detailAddress } from 'network/address.js'
import { categoryFoodList, storeList } from 'network/goodsInfo.js'
//--------------------------
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

// 引入vuex
import { mapMutations } from 'vuex'
// 引入店铺列表展示组件
import ShopList from 'components/content/ShopList.vue'
export default {
  name: 'Msite',
  components: {
    NavHeader,
    Swiper,
    SwiperSlide,
    ShopList,
  },
  data() {
    return {
      // 详细地址信息数据
      detailAddressInfo: {},
      // 食品分类信息数据
      foodClassifyInfo: [],
      // 店铺列表数据
      foodStoreList: [],
      //图片域名地址
      imgBaseUrl: 'https://fuss10.elemecdn.com',
      // 轮播相关配置
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          loop: true,
        },
      },
      // 获取店铺列表相关配置
      queryInfo: {
        latitude: '',
        longitude: '',
      },
      // 记录经纬度
      geohash: '',
    }
  },
  created() {
    this.getDetailAddress()
    this.getFoodCategory()
  },
  beforeMount() {
    this.geohash = this.$route.query.geohash
    this.queryInfo.latitude = this.geohash.split(',')[0]
    this.queryInfo.longitude = this.geohash.split(',')[1]
    this.RECORD_ADDRESS(this.queryInfo)
  },
  mounted() {
    this.getStoreList()
    // console.log(this.$refs.wrapper.$el.offsetTop)
  },
  methods: {
    ...mapMutations(['RECORD_ADDRESS']),
    // 根据经纬度获取详细信息
    getDetailAddress() {
      let geohash = this.$route.query.geohash
      detailAddress(geohash).then((res) => {
        this.detailAddressInfo = res.data
      })
    },
    // 获取食品分类列表
    getFoodCategory() {
      categoryFoodList().then((res) => {
        this.foodClassifyInfo = res.data
      })
    },
    // 获取店铺列表
    getStoreList() {
      storeList(this.queryInfo).then((res) => {
        this.foodStoreList = res.data
      })
    },
    // 解码url地址，求去restaurant_category_id值
    getCategoryId(url) {
      let urlData = decodeURIComponent(
        url.split('=')[1].replace('&target_name', '')
      )
      if (/restaurant_category_id/gi.test(urlData)) {
        return JSON.parse(urlData).restaurant_category_id.id
      } else {
        return ''
      }
    },
  },
}
</script>

<style lang="less" scoped>
.borderTop() {
  border-top: 1px solid #eee;
}
.msite-header {
  z-index: 9999;
}
.iconfont {
  padding-left: 8px;
  font-size: 22px;
}

.detailInfo {
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.swiper {
  margin-top: 46px;
  height: 186px;
  background-color: #fff;
  .swiper-container {
    // --swiper-theme-color: #ff6600;
    --swiper-pagination-color: #00ff33; /* 两种都可以 */
  }
  .classifyImgs {
    width: 42px;
    height: 42px;
  }
  .swiper-slide {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    a {
      width: 25%;
      height: 45%;
      padding-top: 8px;
      text-align: center;
      p {
        font-size: 14px;
      }
    }
  }
}
.storeInfoShow {
  width: 100%;
  margin-top: 10px;
  background-color: #fff;
  .borderTop();
  p {
    padding: 8px;
    font-size: 14px;
    color: #999;
    .store-icon {
      font-size: 16px;
    }
  }
  .store-main {
    li {
      height: 106px;
      &:nth-child(n + 2) {
        .borderTop();
      }
    }
  }
}
</style>