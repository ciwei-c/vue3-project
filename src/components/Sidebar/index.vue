<template>
  <div class="cv-sidebar">
    <menu-item
      v-for="menu in menus"
      :key="menu.value"
      :name="menu.name"
      :isActive="active === menu.value"
    ></menu-item>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import MenuItem from "./MenuItem";
export default {
  components: { MenuItem },
  setup() {
    const state = reactive({
      active: "recent-use",
      menus: [
        {
          name: "最近使用",
          value: "recent-use",
        },
      ],
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less" scoped>
@import "@/styles/color.less";
.cv-sidebar {
  height: 100%;
  overflow: auto;
  width: 240px;
  background: #fff;
  position: relative;
  box-shadow: @box-shadow-base;
}
</style>
