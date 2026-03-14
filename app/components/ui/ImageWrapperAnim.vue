<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
const { $gsap } = useNuxtApp();

// Refs
const containerRef = ref<HTMLDivElement | null>(null);
const imgRef = ref<HTMLImageElement | null>(null);

onMounted(async () => {
  if (!containerRef.value) return;
  await nextTick();

  // grab the img from slot
  imgRef.value = containerRef.value.querySelector("img");

  if (!imgRef.value) return;

  // Set starting position (optional)
  $gsap.set(imgRef.value, { y: 0 });

  // Scroll animation
  $gsap.to(imgRef.value, {
    y: () =>
      ((imgRef.value?.offsetHeight ?? 0) -
        (containerRef.value?.offsetHeight ?? 0)) *
      1.1,
    ease: "none",
    scrollTrigger: {
      trigger: containerRef.value,
      start: "-20% bottom", // starts when container top hits viewport bottom
      scrub: true,
      toggleActions: "play none none reverse",
    },
  });
});
</script>

<template>
  <div class="imgWrapper" ref="containerRef">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.imgWrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 120%;
    object-fit: cover;
    object-position: center;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>
