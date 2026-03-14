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

// onMounted(() => {
//   const tl = $gsap.timeline({
//     scrollTrigger: {
//       trigger: overlay.value,
//       start: "top top",
//       end: "bottom bottom",
//       markers: true,
//       pin: true,
//       scrub: true,
//     },
//   });

//   tl.to(overlay.value, {
//     scale: 0.7,
//   });
// });
</script>

<template>
  <div class="sections" ref="section">
    <WhatwedoSectionBlock
      :sectionData="item"
      :align="+i % 2 !== 0 ? 'left' : ''"
      v-for="(item, i) in compData?.sections"
      :key="i + 'section-block' + item?.title"
    />

    <!-- <div class="overlay" ref="overlay">
      <svg
        class="back-circle"
        ref="backCircle"
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="960.5"
          cy="556.5"
          r="945.5"
          stroke="black"
          stroke-width="400"
        />
      </svg>
    </div> -->
  </div>
</template>

<style scoped lang="scss">
.sections {
  position: relative;
  overflow: hidden;
  @include clamp-property("padding-block", 7.5, 12.5);

  & > * + * {
    @include clamp-property("margin-top", 5, 12.5);
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translateX(-50%);
    z-index: -2;

    svg {
      width: 100%;
    }
  }
}
</style>
