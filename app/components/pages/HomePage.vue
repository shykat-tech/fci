<script setup lang="ts">
const { pageData } = defineProps({
  pageData: {
    type: Object,
    required: true,
  },
});

const pageRef = ref(null);

const componentLookup: any = {
  hero: "Hero",
  whatwedo: "WhatWeDo",
};
</script>

<template>
  <div ref="pageRef" :key="pageData.id + pageData.meta.slug">
    <NuxtLazyHydrate
      when-visible
      v-for="(block, idx) in pageData.body"
      :key="'comp-' + block.id"
    >
      <component
        :id="'comp-' + block.id"
        :is="resolveComponent('Lazy' + componentLookup[block.type])"
        :compData="block.value"
        :compId="block.id"
      />
    </NuxtLazyHydrate>
  </div>
</template>

<style scoped></style>
