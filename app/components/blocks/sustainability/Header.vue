<script setup lang="ts">
const { compData } = defineProps({
  compData: {
    type: Object,
    required: true,
  },
});

const { baseURL } = useBackendAPI();
</script>

<template>
  <div class="header">
    <PageTitle :title="compData?.title" :subtitle="compData?.subtitle" />

    <div class="thumbnail">
      <img
        :src="baseURL + compData?.background_image?.renditions?.original"
        alt="header-img"
      />
    </div>

    <div class="bottom-area container">
      <div class="bottom-title" v-html="compData?.bottom_title" />
      <div class="bottom-subtitle" v-html="compData?.bottom_description" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  .thumbnail {
    @include clamp-property("padding-inline", 1.25, 2.5);

    img {
      width: 100%;
    }
  }

  .bottom-area {
    @include clamp-property("margin-bottom", 5, 12.5);

    .bottom-title {
      color: $base;
      font-style: normal;
      font-weight: 600;
      line-height: 120%;
      text-transform: uppercase;

      @include clamp-property("font-size", 1.75, 3);
      @include clamp-property("letter-spacing", -0.0525, -0.09);
      @include clamp-property("margin-bottom", 1.5, 4);
      @include clamp-property("margin-top", 5, 10);
    }

    .bottom-subtitle {
      color: $black;
      font-style: normal;
      font-weight: 450;
      line-height: 150%;
      text-transform: uppercase;

      @include clamp-property("font-size", 1, 1.125);
      @include clamp-property("letter-spacing", -0.02, -0.0225);

      & > * + * {
        margin-top: 1.5rem;
      }

      @media screen and (min-width: 1024px) {
        width: 60%;
        margin-left: auto;
      }
    }
  }
}
</style>
