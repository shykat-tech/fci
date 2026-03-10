<script setup lang="ts">
const { align = "right" } = defineProps({
  align: {
    type: String as () => "left" | "right",
  },
  img: {
    type: String,
  },
});

const { $gsap } = useNuxtApp();

// refs
const collectionCard = ref<HTMLDivElement | null>(null);
const imgContainer = ref<HTMLDivElement | null>(null);
const imgInner = ref<HTMLDivElement | null>(null);
const cursor = ref<HTMLDivElement | null>(null);

onMounted(() => {
  const tl = $gsap.timeline({
    scrollTrigger: {
      trigger: collectionCard.value,
      start: "top bottom",
      toggleActions: "play none none reverse",
    },
  });

  tl.from(collectionCard.value, {
    y: 100,
    ease: "none",
  }).to(
    imgInner.value,
    {
      y: () => imgInner.value!.offsetHeight - imgContainer.value!.offsetHeight,
      ease: "none",
    },
    "<",
  );
});

// Cursor follow
const moveCursor = (e: MouseEvent) => {
  if (!cursor.value) return;
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  $gsap.to(cursor.value, {
    x,
    y,
    duration: 0.2,
    ease: "power3.out",
  });
};

const showCursor = () => {
  if (!cursor.value) return;
  $gsap.to(cursor.value, { opacity: 1, duration: 0.2 });
};

const hideCursor = () => {
  if (!cursor.value) return;
  $gsap.to(cursor.value, { opacity: 0, duration: 0.2 });
};
</script>

<template>
  <div
    class="collection"
    :class="align === 'left' ? 'left' : 'right'"
    ref="collectionCard"
  >
    <div class="left-col">
      <h2>
        <span>Women's Wear</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <g clip-path="url(#clip0_1956_6979)">
            <path
              d="M15.6465 16.3535L15.6465 5.03981L4.33278 5.03981"
              stroke="#085E51"
              stroke-width="1.5"
            />
            <path
              d="M15.6677 5.0403L4.354 16.354"
              stroke="#085E51"
              stroke-width="1.5"
            />
          </g>
          <defs>
            <clipPath id="clip0_1956_6979">
              <rect
                width="20"
                height="20"
                fill="white"
                transform="translate(8.74228e-07 20) rotate(-90)"
              />
            </clipPath>
          </defs>
        </svg>
      </h2>
      <p>
        Refined women's wear combining contemporary silhouettes with technical
        precision. Designed to balance elegance, fit, and scalable manufacturing
        excellence.
      </p>
    </div>

    <div class="right-col">
      <div
        class="img-box"
        ref="imgContainer"
        @mousemove="moveCursor"
        @mouseenter="showCursor"
        @mouseleave="hideCursor"
      >
        <div class="img-inner" ref="imgInner">
          <img :src="img ?? '/home-col.png'" alt="home collection" />
        </div>

        <div class="custom-cursor" ref="cursor">View<br />Collection</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.collection {
  width: 100%;
  @include flex(center, center, column-reverse);
  @include clamp-property("gap", 1.25, 2);

  .left-col,
  .right-col {
    width: 100%;
  }

  &.left {
    .right-col {
      .img-box {
        @include clamp-property("height", 28, 50);
      }
    }
  }

  .left-col {
    h2 {
      color: $base;
      font-style: normal;
      font-weight: 600;
      line-height: 110%;
      text-transform: uppercase;

      @include flex(space-between, center);

      @include clamp-property("font-size", 1.5, 2.5);
      @include clamp-property("margin-bottom", 1, 1.5);
    }

    p {
      color: $base;
      font-style: normal;
      font-weight: 400;
      line-height: 150%;
      letter-spacing: -0.0225rem;

      @include clamp-property("font-size", 1, 1.125);
    }
  }

  .right-col {
    .img-box {
      width: 100%;
      @include clamp-property("height", 15, 32);
      overflow: hidden;
      position: relative;
      cursor: none;

      .img-inner {
        width: 100%;
        height: 120%;
        position: absolute;
        left: 0;
        bottom: 0;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;

        transition: transform 0.45s ease;
        will-change: transform;
      }

      &:hover img {
        transform: scale(1.05);
      }
    }

    .custom-cursor {
      position: absolute;
      width: 8.75rem;
      height: 8.75rem;
      color: white;
      border-radius: 50%;
      background: rgba(121, 103, 80, 0.15);

      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(8px);
      pointer-events: none;
      border: 1px solid #d1b28c3a;
      text-align: center;

      transform: translate(-50%, -50%);
      opacity: 0;
      display: none;
      text-transform: uppercase;
    }
  }

  @media screen and (min-width: 1024px) {
    flex-direction: row;

    &:nth-child(even) {
      margin-top: -3rem !important;
      margin-bottom: -3rem !important;
    }

    &.left {
      width: 97%;
      margin-inline: auto;
      flex-direction: row-reverse;

      @include clamp-property("gap", 1.25, 8);

      .left-col {
        width: 45%;
      }

      .right-col {
        width: 50%;

        .img-box {
          @include clamp-property("height", 28, 50);
        }
      }
    }

    .left-col {
      width: 40%;

      h2 {
        svg {
          display: none;
        }
      }

      h2,
      p {
        width: 80%;
      }
    }

    .right-col {
      width: 60%;
      .custom-cursor {
        display: flex;
      }
    }
  }
}
</style>
