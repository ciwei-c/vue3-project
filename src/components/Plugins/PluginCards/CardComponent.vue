<template>
  <div class="cv-plugin-card">
    <div class="cv-plugin-card__content">
      <slot></slot>
    </div>
    <div class="cv-plugin-card__name">
      {{ name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    name: String,
  },
};
</script>

<style lang="less" scoped>
@import "@/styles/color.less";
.cv-plugin-card {
  cursor: pointer;
  margin: 10px;
  transition: all 0.3s;
  text-align: center;
  &__content {
    box-shadow: @box-shadow-base;
    height: 160px;
    width: 160px;
    border-right: 2px;
    background: #fff;
    border: 1px solid @border-color-base;
    margin-bottom: 10px;
  }
  &:hover {
    .cv-plugin-card__content {
      border-color: @primary-color;
    }
    transform: translateY(-10px);
  }
}
</style>
