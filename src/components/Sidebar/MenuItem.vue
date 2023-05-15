<template>
  <div
    :class="{
      'cv-sidebar__menuitem': true,
      'cv-sidebar__menuitem--active': isActive,
    }"
  >
    {{ name }}
  </div>
</template>

<script>
export default {
  props: {
    isActive: Boolean,
    name: String,
    value: String,
  },
};
</script>

<style lang="less" scoped>
@import "@/styles/color.less";
.cv-sidebar__menuitem {
  height: 40px;
  line-height: 40px;
  display: flex;
  padding: 0 20px;
  cursor: pointer;
  &--active {
    background: rgba(@primary-color, 0.2);
    position: relative;
    &::after {
      position: absolute;
      content: " ";
      height: 100%;
      width: 4px;
      right: 0;
      background: @primary-color;
    }
  }
  &:hover {
    background: rgba(@primary-color, 0.2);
  }
}
</style>
