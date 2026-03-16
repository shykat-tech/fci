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

    <div class="carousel">
      <ImageCarousel :images="compData?.carousel" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
