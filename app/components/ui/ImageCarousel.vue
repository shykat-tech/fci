<script setup lang="ts">
const { $gsap } = useNuxtApp();

const container = ref<HTMLDivElement | null>(null);

const { images } = defineProps({
  images: {
    type: Object,
    required: true,
  },
});

const carouselImages = computed(() => [...images, ...images]);

onMounted(() => {
  if (!container.value) return;

  const track = container.value;

  const totalWidth = track.scrollWidth / 2;

  $gsap.to(track, {
    x: -totalWidth,
    duration: 20,
    ease: "none",
    repeat: -1,
  });

  $gsap.from(container.value, {
    y: 100,
    opacity: 0,
    delay: 0.3,
  });
});

const { baseURL } = useBackendAPI();
</script>

<template>
  <div class="carousel">
    <div class="track" ref="container">
      <!-- duplicate images for infinite effect -->
      <div class="item" v-for="(img, i) in carouselImages" :key="i">
        <img :src="baseURL + img?.renditions?.original" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.carousel {
  width: 100%;
  overflow: hidden;
}

.track {
  display: flex;
  width: max-content;
}

.item {
  flex: 0 0 auto;
  margin-right: 0.5rem;
}

.item img {
  object-fit: cover;

  @include clamp-property("width", 20, 40);
  @include clamp-property("height", 25, 50);
}
</style>
