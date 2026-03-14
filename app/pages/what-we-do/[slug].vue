<script setup lang="ts">
const route = useRoute();

// Access the slug param
const slug = route.params.slug as string;
const { baseURL } = useBackendAPI();

const { data: response } = await useFetch(baseURL + "/api/v2/pages/" + slug);

const data = computed(() => response.value?.body[0]?.value);
</script>

<template>
  <div class="container">
    <div class="header">
      <div class="title">{{ data?.title }}</div>
      <div class="desc" v-html="data?.subtitle" />
    </div>

    <img
      :src="baseURL + data?.image?.renditions?.original"
      alt="header-img"
      class="thumbnail"
    />

    <div class="stats">
      <div class="stat" v-for="stat in data?.stats">
        <h2 class="serial">{{ stat?.serial }}</h2>

        <div class="desc">
          <span class="label">{{ stat?.title }}</span>
          <span class="value">{{ stat?.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  padding-top: calc(4.5rem + var(--nav-mobile-height));
  @include flex(space-between, start, column);
  @include clamp-property("gap", 1.5, 2);

  .title {
    color: $black;
    font-style: normal;
    font-weight: 450;
    line-height: 100%;
    letter-spacing: -0.09rem;
    text-transform: uppercase;

    @include clamp-property("font-size", 1.75, 3);
  }

  .desc {
    color: $black;
    font-style: normal;
    font-weight: 450;
    line-height: 150%; /* 5rem */
    text-transform: uppercase;
    text-wrap: pretty;

    @include clamp-property("font-size", 1, 1.125);
    @include clamp-property("letter-spacing", -0.02, -0.0225);
  }

  @media screen and (min-width: 1024px) {
    padding-top: calc(4.5rem + var(--nav-desktop-height));
    flex-direction: row;
    .title {
      width: 30%;
    }

    .desc {
      width: 50%;
    }
  }
}

.thumbnail {
  width: 100%;
  @include clamp-property("margin-top", 3, 2.5);
  @include clamp-property("border-radius", 0.75, 1.5);
}

.stats {
  @include clamp-property("padding-block", 7.5, 12.5);
  @include flex(start, start, column);
  @include clamp-property("gap", 0.5, 1.5);

  .stat {
    border-top: 1px solid $base-35;
    @include clamp-property("padding-block", 2.5, 3);
    @include flex(space-between, start, column);
    @include clamp-property("gap", 2, 2);

    h2 {
      color: $base;
      font-style: normal;
      font-weight: 600;
      line-height: 100%; /* 7.5rem */

      @include clamp-property("font-size", 2.375, 7.5);
    }

    .label {
      color: $black;
      font-style: normal;
      font-weight: 600;
      line-height: 150%;
      display: block;

      @include clamp-property("font-size", 1.25, 2);
      @include clamp-property("margin-bottom", 1, 1.5);
    }

    .value {
      color: $black;
      font-style: normal;
      font-weight: 450;
      line-height: 150%;

      @include clamp-property("font-size", 1.125, 1.25);
      @include clamp-property("letter-spacing", -0.0225, -0.02);
    }

    @media screen and (min-width: 1024px) {
      flex-direction: row;
      .desc {
        width: 70%;
      }
    }
  }
}
</style>
