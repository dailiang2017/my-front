<template>
  <div class="container">
    <!-- 头部head区域 -->
    <TopNavi></TopNavi>
    <!-- 左边导航菜单栏 -->
    <LeftNavi></LeftNavi>
    <!-- 主内容区域 -->
    <MainContent></MainContent>
  </div>
</template>

<script>
  import TopNavi from './navi/TopNavi';
  import LeftNavi from './navi/LeftNavi';
  import MainContent from './navi/MainContent';
  export default {
    name: "Home",
    components: {MainContent, LeftNavi, TopNavi}
  }
</script>

<style scoped lang="scss">
  .container {
    position:absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: rgba(224, 234, 235, 0.1);
  }
</style>
