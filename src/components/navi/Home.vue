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
  import TopNavi from './TopNavi';
  import LeftNavi from './LeftNavi';
  import MainContent from './MainContent';
  export default {
    name: "Home",
    components: {MainContent, LeftNavi, TopNavi}
  }
</script>

<style scoped>
  .container {
    position:absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px
  }
</style>
