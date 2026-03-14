<script setup lang="ts">
const { compData } = defineProps({
  compData: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div>
    <PageTitle :title="compData?.title" :subtitle="compData?.subtitle" />

    <ImageCarousel :images="compData?.carousel" />
  </div>
</template>

<style scoped lang="scss"></style>
