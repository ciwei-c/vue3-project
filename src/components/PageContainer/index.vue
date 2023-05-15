<template>
  <div>
    <page-header />
    <page-body>
      <slot></slot>
    </page-body>
  </div>
</template>

<script>
import PageBody from "./PageBody";
import PageHeader from "./PageHeader";
export default {
  components: { PageHeader, PageBody },
};
</script>

<style></style>
