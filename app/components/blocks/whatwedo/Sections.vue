<script setup lang="ts">
const { compData } = defineProps({
  compData: {
    type: Object,
    required: true,
  },
});

const { $gsap } = useNuxtApp();

//Ref
const section = ref<HTMLDivElement | null>(null);
const overlay = ref<HTMLDivElement | null>(null);
const circleImg = ref<HTMLImageElement | null>(null);

onMounted(() => {
  const tl = $gsap.timeline({
    scrollTrigger: {
      trigger: section.value,
      start: "top center",
      end: "bottom top",
      scrub: true,
      toggleActions: "play none none reverse",
    },
  });

  tl.from(circleImg.value, {
    scale: 1.6,
  })
    .to(
      overlay.value,
      {
        top: "unset",
        bottom: "5%",
      },
      "<",
    )
    .to(circleImg.value, {
      scale: 0.9,
    });
});
</script>

<template>
  <div class="sections" ref="section">
    <div class="blocks">
      <WhatwedoSectionBlock
        :sectionData="item"
        :align="+i % 2 !== 0 ? 'left' : ''"
        v-for="(item, i) in compData?.sections"
        :key="i + 'section-block' + item?.title"
      />
    </div>

    <div class="overlay" ref="overlay">
      <img src="/svg/circle.svg" alt="big-circle" ref="circleImg" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.sections {
  position: relative;
  overflow: hidden;
  background-color: #f9f9f9;

  .blocks {
    position: relative;
    z-index: 2;
    @include clamp-property("padding-block", 7.5, 12.5);

    & > * + * {
      @include clamp-property("margin-top", 5, 12.5);
    }
  }

  .overlay {
    width: 150%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    img {
      width: 100%;
    }
  }
}
</style>
