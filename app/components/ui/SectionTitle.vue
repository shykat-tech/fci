<script setup lang="ts">
const {
  title,
  subtitle,
  heading,
  align = "center",
} = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: false,
  },
  heading: {
    type: String,
    required: false,
  },
  align: {
    type: String as () => "left" | "center" | "right",
    required: false,
  },
});

const { $gsap } = useNuxtApp();

// Ref
const titleRef = ref<HTMLHeadingElement | null>(null);
const subtitleRef = ref<HTMLParagraphElement | null>(null);
const headingRef = ref<HTMLSpanElement | null>(null);
const sectionTitleRef = ref<HTMLSpanElement | null>(null);

onMounted(() => {
  const ctx = $gsap.context(() => {
    const tl = $gsap.timeline({
      scrollTrigger: {
        trigger: sectionTitleRef.value,
        start: "30% 90%",
        toggleActions: "play none none reverse",
        once: true,
      },
    });

    tl.from(titleRef.value, { opacity: 0, y: 100 })
      .from(subtitleRef.value, { opacity: 0, y: 150 }, "-=0.2")
      .from(headingRef.value, { opacity: 0, y: -50 }, "<");
  }, sectionTitleRef);

  onUnmounted(() => ctx.revert());
});
</script>

<template>
  <div
    class="section-title container"
    :class="align === 'center' ? 'center' : 'left'"
    ref="sectionTitleRef"
  >
    <span v-if="heading" ref="headingRef">{{ heading }}</span>
    <h2 ref="titleRef">
      {{ title }}
    </h2>
    <p v-if="subtitle" ref="subtitleRef">{{ subtitle }}</p>
  </div>
</template>

<style scoped lang="scss">
.section-title {
  font-family: $montserrat;
  color: $black;
  font-style: normal;

  &.center {
    text-align: center;

    h2 {
      margin-inline: auto;
    }
  }
  &.left {
    text-align: start;
    h2 {
      width: 100%;
    }
    @media screen and (min-width: 1024px) {
      h2 {
        width: 75%;
      }
    }
  }

  @include clamp-property("padding-top", 7.5, 12.5);

  span {
    display: inline-block;
    font-weight: 600;
    text-transform: uppercase;

    @include clamp-property("font-size", 1.125, 1.5);
    @include clamp-property("margin-bottom", 0.75, 2);
  }
  h2 {
    width: 95%;
    font-weight: 550;
    line-height: 100%; /* 6rem */
    text-transform: uppercase;
    text-wrap: pretty;

    @include clamp-property("font-size", 2.25, 6);
    @include clamp-property("letter-spacing", -0.0675, -0.18);
    @include clamp-property("margin-bottom", 1.5, 2.5);

    @media screen and (min-width: 1024px) {
      width: 90%;
    }
  }
  p {
    font-weight: 450;
    line-height: 150%; /* 1.6875rem */
    letter-spacing: -0.0225rem;
    margin-inline: auto;
    text-wrap: pretty;

    @include clamp-property("font-size", 1, 1.125);
    @include clamp-property("letter-spacing", -0.02, -0.0225);

    @media screen and (min-width: 1024px) {
      width: 45%;
    }
  }
}
</style>
