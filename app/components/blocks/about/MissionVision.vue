<script setup lang="ts">
const { compData } = defineProps({
  compData: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="container content">
    <div class="block">
      <h2 class="title">{{ compData.mission }}</h2>
      <div class="desc" v-html="compData.mission_description" />
    </div>

    <div class="block">
      <h2 class="title">{{ compData.vision }}</h2>
      <div class="desc" v-html="compData.vision_description" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.content {
  @include clamp-property("padding-block", 7.5, 12.5);

  .block {
    .title {
      color: $black;
      font-style: normal;
      font-weight: 550;
      line-height: 100%; /* 6rem */
      text-transform: uppercase;

      @include clamp-property("font-size", 2.25, 6);
      @include clamp-property("letter-spacing", -0.0675, -0.18);
      @include clamp-property("margin-bottom", 1.5, 3);
    }
    .desc {
      color: $black;
      font-style: normal;
      font-weight: 450;
      line-height: 150%; /* 6rem */
      text-transform: uppercase;

      @include clamp-property("font-size", 1, 1.125);
      //   @include clamp-property("letter-spacing", -0.0225, -0.18);
    }

    &:nth-child(even) {
      margin-left: auto;
      @include clamp-property("margin-top", 4, 10);
    }

    @media screen and (min-width: 1024px) {
      width: 50%;
    }
  }
}
</style>
