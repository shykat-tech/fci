<script setup lang="ts">
const { title, subtitle, heading } = defineProps({
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
});

const { $gsap } = useNuxtApp();

// Ref
const titleRef = ref<HTMLHeadingElement | null>(null);
const subtitleRef = ref<HTMLParagraphElement | null>(null);
const headingRef = ref<HTMLSpanElement | null>(null);

onMounted(() => {
  const tl = $gsap.timeline({
    scrollTrigger: {
      trigger: ".section-title",
      start: "20% 90%",
      end: "bottom 90%",
    },
  });

  tl.from(titleRef.value, {
    opacity: 0,
    y: 100,
    duration: 1,
    ease: "power3.out",
  })
    .from(
      subtitleRef.value,
      {
        opacity: 0,
        y: 150,
        duration: 1,
        ease: "power3.out",
      },
      "<",
    )
    .from(
      headingRef.value,
      {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      },
      "<",
    );
});
</script>

<template>
  <div class="section-title">
    <span v-if="heading" ref="headingRef">{{ heading }}</span>
    <h2 ref="titleRef">
      {{ title }}
    </h2>
    <p ref="subtitleRef">{{ subtitle }}</p>
  </div>
</template>

<style scoped lang="scss">
.section-title {
  font-family: $montserrat;
  color: $black;
  text-align: center;
  font-style: normal;

  @include clamp-property("padding-top", 7.5, 12.5);

  span {
    display: inline-block;
    font-weight: 600;
    @include clamp-property("font-size", 1.125, 1.5);
    @include clamp-property("margin-bottom", 0.75, 2);
  }
  h2 {
    width: 95%;
    margin-inline: auto;
    font-weight: 550;
    line-height: 100%; /* 6rem */
    text-transform: uppercase;

    @include clamp-property("font-size", 2.25, 6);
    @include clamp-property("letter-spacing", -0.0675, -0.18);
    @include clamp-property("margin-bottom", 1.5, 2.5);

    @media screen and (min-width: 1024px) {
      width: 80%;
    }
  }
  p {
    font-weight: 450;
    line-height: 150%; /* 1.6875rem */
    letter-spacing: -0.0225rem;
    margin-inline: auto;

    @include clamp-property("font-size", 1, 1.125);
    @include clamp-property("letter-spacing", -0.02, -0.0225);

    @media screen and (min-width: 1024px) {
      width: 30%;
    }
  }
}
</style>
