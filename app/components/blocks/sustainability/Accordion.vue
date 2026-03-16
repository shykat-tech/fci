<script setup lang="ts">
const { compData } = defineProps({
  compData: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="accordion container">
    <CommonAccordion :data="compData?.sections" />
  </div>
</template>

<style scoped lang="scss">
.accordion {
  @include clamp-property("padding-bottom", 7.5, 12.5);

  & > * + * {
    @include clamp-property("margin-top", 2.5, 4);
  }
}
</style>
