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

  console.log(titleRef.value.clientHeight);

  mm.add(
    {
      xs: "(max-width:365px)",
      sm: "(min-width: 366px) and (max-width: 480px)",
      md: "(min-width: 481px) and (max-width: 1024px)",
      lg: "(min-width: 1025px)",
    },
    (context) => {
      const { md, lg } = context.conditions || {};

      const tl = $gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 0.8,
        },
      });

      // intro animation
      tl.from(titleRef.value, {
        opacity: 0,
        y: 120,
      }).from(
        subtitleRef.value,
        {
          opacity: 0,
          y: 120,
        },
        "-=0.5",
      );

      if ((md || lg) && titleRef.value) {
        const scrollTL = $gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.value,
            start: "10% top",
            end: "+=200",
            toggleActions: "play none none reverse",
          },
        });

        scrollTL
          .to(titleRef.value, {
            scale: 0.5,
            transformOrigin: "center top",
            xPercent: -25,
          })
          .to(
            subtitleRef.value,
            {
              y: -(titleRef.value.clientHeight + 60),
              x: 0,
            },
            "<",
          );
        // .to(
        //   sectionRef.value,
        //   {
        //     height: `34rem`,
        //   },
        //   "<",
        // );
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
