<template>
  <div class="header">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  height: 46px;
  width: 100%;
  background-color: #3190e8;
  align-items: center;
  text-align: center;
  .left {
    width: 80px;
    padding-left: 8px;
  }
  .center {
    flex: 1;
  }
  .right {
    width: 80px;
  }
}
</style>