<script setup lang="ts">
const { title, subtitle } = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <div class="pageTitle container">
    <h1 class="title">{{ title }}</h1>
    <p class="subtitle">{{ subtitle }}</p>
  </div>
</template>

<style scoped lang="scss">
.pageTitle {
  --nHieght: 20.75;
  @include clamp-property("margin-top", 5.75, calc(15 + 5.75));

  .title {
    color: $shade-2;
    text-align: center;
    font-style: normal;
    font-weight: 600;
    line-height: 100%;
    text-transform: uppercase;

    @include clamp-property("font-size", 2.5, 10);
    @include clamp-property("letter-spacing", -0.075, -0.3);
    @include clamp-property("margin-bottom", 1.5, 5);
  }
  .subtitle {
    color: $black;
    font-style: normal;
    font-weight: 450;
    line-height: 150%;
    margin-left: auto;
    text-align: center;

    @include clamp-property("font-size", 1, 1.125);
    @include clamp-property("letter-spacing", -0.02, -0.0225);
    @include clamp-property("margin-bottom", 3, 5);

    @media screen and (min-width: 1024px) {
      width: 32rem;
      text-align: start;
    }
  }
}
</style>
