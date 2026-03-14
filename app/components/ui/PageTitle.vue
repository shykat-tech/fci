<script setup lang="ts">
const { $gsap } = useNuxtApp();

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

// Ref
const titleRef = ref<HTMLHeadingElement | null>(null);
const subtitleRef = ref<HTMLParagraphElement | null>(null);
const sectionRef = ref<HTMLDivElement | null>(null);

let mm: gsap.MatchMedia | null = null;

onMounted(async () => {
  await nextTick();
  mm = $gsap.matchMedia();

  mm.add(
    {
      xs: "(max-width:365px)",
      sm: "(min-width: 366px) and (max-width: 480px)",
      md: "(min-width: 481px) and (max-width: 1024px)",
      lg: "(min-width: 1025px)",
    },
    (context) => {
      const { xs, sm, md, lg } = context.conditions || {};

      const tl = $gsap.timeline();

      tl.from(titleRef.value, { opacity: 0, y: 150 }).from(
        subtitleRef.value,
        { opacity: 0, y: 150 },
        "-=0.2",
      );

      if ((md || lg) && titleRef.value) {
        const tl2 = $gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.value,
            start: "15% top",
            toggleActions: "play none none reverse",
          },
        });

        tl2
          .to(titleRef.value, {
            fontSize: "3rem",
            justifyContent: "start",
            duration: 0.6,
          })
          .to(
            subtitleRef.value,
            {
              marginTop: `-${titleRef.value?.offsetHeight - 16}px`,
              duration: 0.6,
            },
            "<",
          );
      }
    },
  );
});

onUnmounted(() => {
  // Cleanup matchMedia
  mm?.revert();
});
</script>

<template>
  <div class="pageTitle container" ref="sectionRef">
    <h1 class="title" ref="titleRef">{{ title }}</h1>
    <p class="subtitle" ref="subtitleRef">{{ subtitle }}</p>
  </div>
</template>

<style scoped lang="scss">
.pageTitle {
  position: relative;
  padding-top: calc(5.75rem + var(--nav-mobile-height));

  @media screen and (min-width: 1024px) {
    padding-top: calc(15rem + var(--nav-desktop-height));
  }

  .title {
    color: $shade-2;
    text-align: center;
    font-style: normal;
    font-weight: 600;
    line-height: 100%;
    text-transform: uppercase;
    text-wrap: pretty;
    @include flex(center, center);

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
