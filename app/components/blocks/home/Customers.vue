<script setup lang="ts">
const { compData } = defineProps({
  compData: {
    type: Object,
    required: true,
  },
});

const { baseURL } = useBackendAPI();

const { $gsap } = useNuxtApp();

// Ref
const container = ref<HTMLDivElement | null>(null);
const customers = ref<HTMLDivElement | null>(null);
const watermark = ref<HTMLDivElement | null>(null);

onMounted(() => {
  const tl = $gsap.timeline({
    scrollTrigger: {
      trigger: container.value,
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
  });

  $gsap.fromTo(
    watermark.value,
    {
      xPercent: 50,
    },
    {
      xPercent: -60,
      scrollTrigger: {
        trigger: customers.value,
        start: "top bottom",
        toggleActions: "play none none reverse",
        scrub: true,
      },
    },
  );

  const el = container.value?.querySelectorAll(".box");

  if (el) {
    tl.from(el, {
      y: 50,
      opacity: 0,
      stagger: 0.1,
    });
  }
});
</script>

<template>
  <div class="customers" ref="customers">
    <SectionTitle
      :heading="compData?.heading?.length && compData?.heading"
      :title="compData?.title"
      :subtitle="compData?.subtitle"
    />

    <div class="watermark" ref="watermark">
      {{ compData?.heading?.length ? compData?.heading : compData?.title }}
    </div>

    <div class="clients-logo container" ref="container">
      <div class="box" v-for="img in compData?.partners">
        <img :src="baseURL + img?.renditions?.exact" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.customers {
  @include clamp-property("padding-bottom", 5, 12.5);
  position: relative;
  overflow: hidden;

  .watermark {
    color: $black;
    font-family: $montserrat;
    font-size: 18.75rem;
    font-style: normal;
    font-weight: 700;
    line-height: 100%;
    text-transform: uppercase;
    position: absolute;
    top: 3.4rem;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0.02;
    text-wrap: nowrap;

    @include clamp-property("font-size", 5, 18.75);

    @media screen and (min-width: 1024px) {
      top: -3rem;
      left: -5rem;
      transform: translateX(0%);
    }
  }

  .clients-logo {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    @include clamp-property("gap", 1, 2);
    @include clamp-property("margin-top", 3, 4);

    .box {
      @include clamp-property("height", 7, 10);
      @include flex(center, center);

      img {
        @include clamp-property("max-height", 1.8, 2);
      }
    }

    @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(6, 1fr);
      justify-content: center;
    }
  }
}
</style>
