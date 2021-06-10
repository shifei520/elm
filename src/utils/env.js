/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = ''
let routerMode = 'hash'
let imgBaseUrl = ''

if (process.env.NODE_ENV == 'development') {
  imgBaseUrl = '//elm.cangdu.org/img/'
} else if (process.env.NODE_ENV == 'production') {
  baseUrl = '//elm.cangdu.org'
  imgBaseUrl = '//elm.cangdu.org/img/'
}

export { baseUrl, routerMode, imgBaseUrl }

// 解析图片地址
export const getImgPath = {
  methods: {
    //传递过来的图片地址需要处理后才能正常使用
    getImgPath(path) {
      let suffix
      if (!path) {
        return '//elm.cangdu.org/img/default.jpg'
      }
      if (path.indexOf('jpeg') !== -1) {
        suffix = '.jpeg'
      } else {
        suffix = '.png'
      }
      let url =
        '/' +
        path.substr(0, 1) +
        '/' +
        path.substr(1, 2) +
        '/' +
        path.substr(3) +
        suffix
      return 'https://fuss10.elemecdn.com' + url
    }
  }
}
