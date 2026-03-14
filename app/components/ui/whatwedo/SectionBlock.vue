<script setup lang="ts">
const { sectionData, align } = defineProps({
  sectionData: {
    type: Object,
    required: true,
  },
  align: {
    type: String,
    default: "right",
    required: false,
  },
});
const { baseURL } = useBackendAPI();

const { data } = await useFetch(baseURL + sectionData?.link?.url);

console.log(sectionData);

const route = useRoute();

const { $gsap } = useNuxtApp();

// refs
const sectionRef = ref<HTMLDivElement | null>(null);
const rightCol = ref<HTMLDivElement | null>(null);

onMounted(() => {
  $gsap.from(sectionRef.value, {
    y: 100,
    ease: "none",
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top bottom",
      toggleActions: "play none none reverse",
    },
  });

  $gsap.from(rightCol.value, {
    width: "50rem",
    scrollTrigger: {
      trigger: rightCol.value,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
});
</script>

<template>
  <div
    class="section container"
    :class="align === 'left' && 'reverse'"
    ref="sectionRef"
  >
    <div class="left-col">
      <h2 class="title">{{ sectionData?.title }}</h2>
      <div class="desc" v-html="sectionData?.description" />

      <NuxtLink
        :to="`${route.path}/${sectionData?.link ? sectionData?.link?.id : '#'}`"
      >
        <button class="secondary-btn">
          <span :data-content="'Explore ' + sectionData?.title">
            Explore {{ sectionData?.title }}
          </span>
        </button>
      </NuxtLink>
    </div>

    <div class="right-col" ref="rightCol">
      <ImageWrapperAnim>
        <img
          :src="baseURL + sectionData?.image?.renditions?.original"
          ref="img"
        />
      </ImageWrapperAnim>
    </div>
  </div>
</template>

<style scoped lang="scss">
.section {
  @include flex(space-between, center, column-reverse);
  @include clamp-property("gap", 2.5, 12.25);

  .left-col {
    @media screen and (min-width: 1024px) {
      width: 47.75rem;
    }

    .title {
      color: $base;
      font-style: normal;
      font-weight: 550;
      line-height: 100%; /* 5rem */
      text-transform: uppercase;

      @include clamp-property("font-size", 2, 5);
      @include clamp-property("letter-spacing", -0.06, -0.15);
      @include clamp-property("margin-bottom", 1.5, 3);
    }

    .desc {
      color: $black;
      font-style: normal;
      font-weight: 450;
      line-height: 150%; /* 5rem */
      text-transform: uppercase;

      @include clamp-property("font-size", 1, 1.125);
      @include clamp-property("margin-bottom", 1.25, 2.5);

      & > * + * {
        @include clamp-property("margin-top", 1.5, 2);
      }
    }

    button {
      @include clamp-property("padding-inline", 1.94, 5);
      @include clamp-property("padding-inline", 0.94, 5);

      a {
        text-decoration: none;
        text-wrap: nowrap;
      }
    }
  }

  .right-col {
    width: 100%;
    height: 27.5rem;

    img {
      width: 100%;
      height: 120%;
      object-fit: cover;
      object-position: center;

      position: absolute;
      left: 0;
      bottom: 0;
    }
    @media screen and (min-width: 1024px) {
      width: 40rem;
      height: 48rem;
    }
  }

  @media screen and (min-width: 1024px) {
    flex-direction: row;

    &.reverse {
      flex-direction: row-reverse;
    }
  }
}
</style>
