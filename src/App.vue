<template>
  <div id="app">
    <router-view></router-view>
    <nav-bottom-bar />
  </div>
</template>

<script>
// 引入底部导航
import NavBottomBar from 'components/common/NavBottomBar'

export default {
  name: 'App',
  components: {
    NavBottomBar,
  },
}
</script>

<style>
</style>
