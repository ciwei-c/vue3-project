<template>
  <div class="cv-page-body">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "@/styles/color.less";
.cv-page-body {
  height: calc(100% - 60px);
  border-bottom: 1px solid @border-color-base;
}
</style>
