<script setup>
const bannerRef = ref(null);
const mainImg = ref(null);
const pattern = ref(null);

const { $gsap } = useNuxtApp();

onMounted(() => {
  const tl = $gsap.timeline({
    scrollTrigger: {
      trigger: bannerRef.value,
      start: "top 80%",
    },
  });

  tl.from(mainImg.value, {
    y: 100,
    ease: "none",
  }).to(mainImg.value, {
    clipPath: "circle(30% at 50% 50%)",
    ease: "none",
  });

  const tl2 = $gsap.timeline({
    scrollTrigger: {
      trigger: pattern.value,
      start: "top center",
      toggleActions: "play none none reverse",
    },
  });

  tl2.to(mainImg.value, {
    clipPath: "circle(100% at 50% 50%)",
    duration: 1.45,
    ease: "none",
  });
});
</script>

<template>
  <div class="what-we-do">
    <SectionTitle
      title="What We Do"
      subtitle="We partner with leading global fashion brands to deliver premium garments, from initial concept through to final production, with precision, responsibility, and long-term value."
    />

    <div class="banner" ref="bannerRef">
      <img
        src="~/assets/images/whatwedo.jpg"
        alt="What We Do Banner"
        class="main-img"
        ref="mainImg"
      />

      <div class="pattern" ref="pattern">
        <img
          src="~/assets/images/pattern1.png"
          class="pattern-img"
          alt="Pattern"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.what-we-do {
  width: 100%;

  .banner {
    position: relative;
    @include clamp-property("margin-top", 16, 62);

    @include clamp-property("margin-top", 2.17, 4.38);
    @include flex(center, center);

    @media screen and (min-width: 1024px) {
      height: auto;
    }

    .main-img {
      clip-path: circle(25% at 50% 50%);
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .pattern {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $base;
      z-index: -1;

      .pattern-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
