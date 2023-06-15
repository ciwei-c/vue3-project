<template>
  <div class="cv-home">
    <div>
      <component
        :is="renderComponent"
        v-for="renderComponent in renderComponents"
        :key="renderComponent"
      ></component>
      <component
        :is="renderComponent"
        v-for="renderComponent in renderComponents"
        :key="renderComponent"
      ></component>
      <component
        :is="renderComponent"
        v-for="renderComponent in renderComponents"
        :key="renderComponent"
      ></component>
      <component
        :is="renderComponent"
        v-for="renderComponent in renderComponents"
        :key="renderComponent"
      ></component>
      <component
        :is="renderComponent"
        v-for="renderComponent in renderComponents"
        :key="renderComponent"
      ></component>
    </div>
  </div>
</template>

<script>
import ImageHandleCard from "@/components/Plugins/PluginCards/ImageHandleCard.vue";
import { reactive, computed } from "vue";
export default {
  components: { ImageHandleCard },
  setup() {
    const state = reactive({
      types: ["imageHandle"],
    });
    const componentMap = {
      imageHandle: "ImageHandleCard",
    };
    const renderComponents = computed(() => {
      return state.types.map((v) => componentMap[v]);
    });
    return {
      renderComponents,
    };
  },
};
</script>

<style lang="less" scoped>
.cv-home {
  height: 100%;
  background: #f5f5f5;
  > div {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
  }
}
</style>
