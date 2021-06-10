// 按需引入
import Vue from 'vue'
import 'vant/lib/index.css'
import { IndexBar, IndexAnchor } from 'vant'
import { Notify } from 'vant'
import { Rate } from 'vant'
import { DropdownMenu, DropdownItem } from 'vant'
import { Col, Row } from 'vant'
import { Tab, Tabs } from 'vant'
import { Sidebar, SidebarItem } from 'vant'

Vue.use(Sidebar)
Vue.use(SidebarItem)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Col)
Vue.use(Row)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Rate)
Vue.use(IndexBar)
Vue.use(IndexAnchor)
Vue.use(Notify)
