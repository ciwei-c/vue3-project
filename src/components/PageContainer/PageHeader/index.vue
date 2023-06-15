<template>
  <div class="cv-page-header">
    <div></div>
    <div>
      <a-button type="primary"> 登录/注册 </a-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "@/styles/color.less";
.cv-page-header {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  justify-content: space-between;
  border-bottom: 1px solid @border-color-base;
}
</style>
