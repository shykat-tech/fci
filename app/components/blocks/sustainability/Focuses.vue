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
  <div class="focuses">
    <div class="left-col">
      <h2 class="title">
        {{ compData?.title }}
      </h2>

      <div class="subtitle" v-html="compData?.subtitle" />

      <ul>
        <p class="f-title">Focus Area</p>

        <li v-for="f in compData?.keypoints">
          {{ f }}
        </li>
      </ul>
    </div>
    <div class="right-col">
      <img
        class="banner"
        :src="baseURL + compData?.image?.renditions?.exact"
        :alt="compData?.image?.alt"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.focuses {
  width: 100%;
  min-height: 100vh;
  display: grid;
  //   overflow: hidden;
  position: relative;

  .left-col {
    position: relative;
    padding-top: 7.5rem;
    padding-bottom: 3rem;
    padding-right: 1.25rem;

    @include clamp-property("padding-left", 1.25, 11.25);

    @include flex(center, start, column);

    .title {
      color: $white;
      font-size: var(--Size-Heading-3, 3rem);
      font-style: normal;
      font-weight: 600;
      line-height: 120%;
      //   letter-spacing: -0.09rem;
      text-transform: uppercase;

      @include clamp-property("font-size", 1.75, 3);
      @include clamp-property("margin-bottom", 1.5, 2.5);
    }

    .subtitle {
      color: $white;
      font-size: var(--Size-Body-Medium, 1.125rem);
      font-style: normal;
      font-weight: 450;
      line-height: 150%;
      @include clamp-property("font-size", 1, 1.125);
    }

    ul {
      @include clamp-property("margin-top", 1.88, 4);

      .f-title {
        color: $white;
        font-style: normal;
        font-weight: 600;
        line-height: 150%;
        @include clamp-property("font-size", 1, 1.125);
        @include clamp-property("margin-bottom", 0.75, 1);
      }

      li {
        color: $white;
        font-style: normal;
        font-weight: 450;
        line-height: 150%;
        @include clamp-property("font-size", 1, 1.125);
        @include clamp-property("margin-left", 1, 1.125);
        @include clamp-property("margin-bottom", 0.75, 0.75);

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background: url("~/assets/images/pattern2.png") $base no-repeat;
      z-index: -1;
    }
  }

  .right-col {
    .banner {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);

    .left-col {
      height: 100vh;
      padding-right: 2rem;

      padding-block: 0;
    }

    .right-col {
      width: 100%;
      height: 100vh;

      .banner {
        height: 100%;
      }
    }
  }
}
</style>
