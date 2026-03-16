<script setup lang="ts">
interface AccordionItem {
  title: string;
  subtitle: string;
  keypoints: string[];
}

const { data } = defineProps<{
  data: AccordionItem[];
}>();

const activeIndex = ref<number | null>(0);

const toggle = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<template>
  <div class="acr" v-for="(acr, i) in data" :key="i">
    <div class="title-bar" @click="toggle(i)">
      <h2 class="title">{{ acr?.title }}</h2>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path v-if="activeIndex !== i" d="M24 0L24 48" stroke="black" />
        <path d="M0 24H48" stroke="black" />
      </svg>
    </div>

    <div class="hidden-bar" :class="{ open: activeIndex === i }">
      <p class="subtitle">{{ acr?.subtitle }}</p>

      <ul class="keypoints">
        <li v-for="kp in acr?.keypoints" :key="kp">
          {{ kp }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.acr {
  @include clamp-property("padding-top", 2.5, 4);
  border-top: 1px solid rgba(0, 0, 0, 0.5);

  .title-bar {
    cursor: pointer;

    @include flex(space-between, center);
    @include clamp-property("margin-bottom", 2.5, 4);

    .title {
      color: $shade-1;
      font-style: normal;
      font-weight: 550;
      line-height: 100%; /* 5rem */
      @include clamp-property("font-size", 2, 5);
    }
  }

  .hidden-bar {
    clip-path: inset(0% 0% 100% 0%);
    max-height: 0;
    transition: all 0.45s ease;

    .subtitle {
      color: $black;
      font-size: var(--Size-Body-Large, 1.25rem);
      font-style: normal;
      font-weight: 550;
      line-height: 150%; /* 1.875rem */
      letter-spacing: -0.025rem;
      @include clamp-property("font-size", 1.125, 1.25);
      @include clamp-property("margin-bottom", 1.5, 2);
    }

    .keypoints {
      display: grid;
      @include clamp-property("gap ", 1.25, 2);
      list-style: none;

      li {
        padding-left: 0.875rem;
        position: relative;
        color: $black;
        font-style: normal;
        font-weight: 450;
        line-height: 150%; /* 1.6875rem */
        letter-spacing: -0.0225rem;

        @include clamp-property("font-size", 1, 1.125);

        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 0.375rem;
          height: 0.375rem;
          flex-shrink: 0;
          aspect-ratio: 1/1;
          background-color: $shade-3;
          border-radius: 50%;
        }
      }

      @media screen and (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    &.open {
      max-height: 50vh;
      clip-path: inset(0% 0% 0% 0%);
    }
  }
}
</style>
