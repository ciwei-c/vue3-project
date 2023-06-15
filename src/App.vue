<template>
  <page-container style="height: 100%">
    <div style="height: 100%; display: flex">
      <sidebar />
      <div style="flex: 1">
        <router-view />
      </div>
    </div>
  </page-container>
</template>
<script>
import PageContainer from "@/components/PageContainer";
import Sidebar from "@/components/Sidebar";
export default {
  components: { PageContainer, Sidebar },
};
</script>
<style lang="scss"></style>
