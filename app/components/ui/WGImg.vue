<script setup>
const { image, lazy, loadingBackground, fetchPriority } = defineProps({
  image: {
    type: Object,
    required: true,
  },
  lazy: {
    type: Boolean,
    // Default to true so offscreen images do not block rendering
    default: true,
  },
  loadingBackground: {
    type: Boolean,
    default: false,
  },
  // Allow callers to mark critical images
  fetchPriority: {
    type: String,
    default: "auto", // 'high' | 'low' | 'auto'
    validator: (v) => ["high", "low", "auto"].includes(v),
  },
});

const getBackgroundStyles = (image, flag) => {
  if (!flag) return {};
  switch (image.palette.length) {
    case 0:
      return {};
    case 1:
      return {
        backgroundColor: image.palette[0].color,
      };
    default:
      return {
        backgroundImage: `linear-gradient(to bottom right, ${image.palette[0]}, ${image.palette[1]})`,
      };
  }
};

const { staticHost: HOST } = useResolvedConfig();
const options = computed(() => {
  return {
    width: image?.width,
    height: image?.height,
    alternateText: image?.alt || "",
    originalSrc: image?.renditions?.original,
    originalFallbackSrc: image?.renditions?.original_fallback || null,
    tabSrc: image?.renditions?.tab || null,
    tabFallbackSrc: image?.renditions?.tab_fallback || null,
    mobileSrc: image?.renditions?.mobile || null,
    mobileFallbackSrc: image?.renditions?.mobile_fallback || null,
    imageStyles: getBackgroundStyles(image, loadingBackground),
  };
});
</script>
<template>
  <picture :style="options.imageStyles">
    <source
      v-if="options.mobileSrc"
      media="(max-width:480px)"
      :srcset="HOST + options.mobileSrc"
      type="image/avif"
    />
    <source
      v-if="options.mobileFallbackSrc"
      media="(max-width:480px)"
      :srcset="HOST + options.mobileFallbackSrc"
    />
    <source
      v-if="options.tabSrc"
      media="(max-width:1024px)"
      :srcset="HOST + options.tabSrc"
      type="image/avif"
    />
    <source
      v-if="options.tabFallbackSrc"
      media="(max-width:1024px)"
      :srcset="HOST + options.tabFallbackSrc"
    />

    <source
      v-if="options.originalFallbackSrc"
      :srcset="HOST + options.originalSrc"
    />
    <img
      class="wg-img"
      :src="
        HOST +
        (options.originalFallbackSrc
          ? options.originalFallbackSrc
          : options.originalSrc)
      "
      :alt="options.alternateText"
      :width="options.width"
      :height="options.height"
      fit="cover"
      :style="options.imageStyles"
      :loading="lazy ? 'lazy' : 'eager'"
      decoding="async"
      :fetchpriority="fetchPriority"
    />
  </picture>
</template>

<style scoped lang="scss">
picture {
  width: 100%;
}

.wg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  text-indent: -9999px;
  font-size: 0;
  border: none;
  outline: none;
}

.cover-img {
  .wg-img {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
    object-position: center;
  }
}

.full-height {
  .wg-img {
    height: 100%;
    width: auto;
  }
}

.invert-img {
  .wg-img {
    filter: invert(1);
  }
}

.full-width {
  .wg-img {
    width: 100%;
  }
}

.dark-overlay {
  height: 100%;
  width: 100%;
  position: relative;

  &::after {
    content: "";
    display: block;
    min-height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 15;
  }

  .wg-img {
    height: 100%;
    width: 100%;
  }
}

// @include full-gen('xs', 'height');
// @include full-gen('sm', 'height');
// @include full-gen('md', 'height');
// @include full-gen('lg', 'height');
// @include full-gen('xl', 'height');

// @include full-gen('xs', 'width');
// @include full-gen('sm', 'width');
// @include full-gen('md', 'width');
// @include full-gen('lg', 'width');
// @include full-gen('xl', 'width');
</style>
