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
const media = ref<HTMLDivElement | null>(null);
const img = ref<HTMLImageElement | null>(null);

onMounted(() => {
  const tl = $gsap.timeline({
    scrollTrigger: {
      trigger: media.value,
      start: "top bottom",
      toggleActions: "play none none reverse",
    },
  });

  tl.from(media.value, {
    scale: 0.8,
    y: 200,
  });

  $gsap.to(img.value, {
    y: () => {
      const imgH = img.value?.offsetHeight ?? 0;
      const mediaH = media.value?.offsetHeight ?? 0;
      const viewportFactor = window.innerHeight; // adjust smoothness

      return imgH - mediaH;
    },
    scrollTrigger: {
      trigger: media.value,
      start: "top bottom",
      toggleActions: "play none none reverse",
      scrub: true,
    },
  });
});
</script>

<template>
  <div class="media" ref="media">
    <img :src="baseURL + compData?.image?.renditions?.original" ref="img" />
  </div>
</template>

<style scoped lang="scss">
.media {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 140%;
    object-fit: cover;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>
