<script setup lang="ts">
const { compData } = defineProps({
  compData: {
    type: Object,
    required: true,
  },
});

// ref
const bannerRef = ref<HTMLImageElement | null>(null);
const titleRef = ref<HTMLHeadingElement | null>(null);
const downBtn = ref<SVGSVGElement | null>(null);
const header = ref<HTMLDivElement | null>(null);
const subtitle = ref<HTMLHeadingElement | null>(null);

const { $gsap } = useNuxtApp();

onMounted(() => {
  const titleSpans = titleRef.value?.querySelectorAll(
    "span",
  ) as NodeListOf<HTMLSpanElement>;

  const tl = $gsap.timeline({
    defaults: {
      duration: 0.6,
    },
  });

  tl.fromTo(
    bannerRef.value,
    {
      scale: 1.5,
    },
    {
      scale: 1.1,
      ease: "power3.inOut",
      duration: 1.5,
    },
  )
    .from(
      "#navbar",
      {
        y: -100,
        opacity: 1,
      },
      "-=0.5",
    )
    .from(
      titleSpans[1],
      {
        y: 100,
        opacity: 0,
      },
      "<",
    )
    .from(
      titleSpans[0],
      {
        x: -200,
        opacity: 0,
      },
      "-=0.5",
    )
    .from(
      titleSpans[2],
      {
        x: 200,
        opacity: 0,
      },
      "<",
    )
    .from(
      downBtn.value,
      {
        y: 100,
        opacity: 0,
      },
      "-=0.5",
    );

  const tl2 = $gsap.timeline({
    scrollTrigger: {
      trigger: header.value,
      start: "5% top",
      toggleActions: "play none none reverse",
    },
  });

  tl2
    .to(bannerRef.value, {
      scale: 1,
      ease: "none",
    })
    .fromTo(
      subtitle.value,
      {
        y: 200,
        opacity: 0,
        ease: "none",
      },
      {
        y: 0,
        opacity: 1,
        ease: "none",
      },
      "<",
    )
    .to(
      titleSpans[1],
      {
        marginTop: "0.25rem",
        marginBottom: "0.25rem",
      },
      "<",
    );
});
</script>

<template>
  <div class="header" ref="header">
    <img src="~/assets/images/hero.png" alt="" class="banner" ref="bannerRef" />

    <div class="content container">
      <h1 class="title" ref="titleRef">
        <span>Design</span>
        <span>Engineer</span>
        <span>Deliver</span>
      </h1>

      <div class="subtitle-block">
        <svg
          ref="downBtn"
          width="61"
          height="61"
          viewBox="0 0 61 61"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="30.5"
            cy="30.5"
            r="30"
            stroke="#F2F2F2"
            stroke-opacity="0.5"
          />
          <path
            d="M22.5 27.5L30.5 35.5L38.5 27.5"
            stroke="#F2F2F2"
            stroke-width="1.5"
          />
          <path
            d="M24.5 25.5L30.5 31.5L36.5 25.5"
            stroke="#F2F2F2"
            stroke-width="1.5"
          />
        </svg>

        <h3 class="subtitle" ref="subtitle">
          An ongoing dialogue between creativity and craftsmanship, shaped into
          garments made to be lived in.
        </h3>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;

  @media screen and (min-width: 1024px) {
    height: 130vh;
  }

  .banner {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    z-index: -1;
    transform-origin: top center;
  }

  .content {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
    @include flex(center, start, column);

    .title {
      width: 100%;
      color: $light;
      font-family: $montserrat;
      font-style: normal;
      font-weight: 550;
      line-height: 100%;
      text-transform: uppercase;
      margin-top: 90%;

      @include clamp-property("font-size", 2.5, 9);
      @include clamp-property("letter-spacing", -0.075, -0.27);

      span {
        display: block;

        &:nth-child(2) {
          @include clamp-property("margin-block", 0.25, 2.5);
        }
      }

      @media screen and (min-width: 1024px) {
        margin-top: 0;
        span {
          &:nth-child(2) {
            text-align: center;
          }
          &:last-child {
            text-align: end;
          }
        }
      }
    }

    .subtitle-block {
      width: 95%;
      display: flex;
      flex-direction: column-reverse;
      justify-content: space-between;
      align-items: center;
      @include clamp-property("margin-top", 1.5, 3);

      svg {
        margin-top: 4.5rem;
      }

      @media screen and (min-width: 1024px) {
        flex-direction: row;
        padding-right: 17.5rem;

        svg {
          margin-top: 0rem;
        }
      }
    }
    .subtitle {
      color: $light;
      font-family: $montserrat;
      font-style: normal;
      font-weight: 500;
      line-height: 150%; /* 1.875rem */
      letter-spacing: -0.025rem;
      // @include clamp-property("margin-top", 1.5, 5);
      @include clamp-property("font-size", 1.125, 1.25);
      opacity: 0;

      @media screen and (min-width: 1024px) {
        margin-top: 2rem;
        width: 26.3125rem;
      }
    }
  }

  &::after,
  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
  }

  &::after {
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.35) 0%,
      rgba(0, 0, 0, 0) 47.6%,
      rgba(0, 0, 0, 0.35) 100%
    );
  }
  &::before {
    opacity: 0.35;
    background:
      linear-gradient(270deg, #000 0%, rgba(0, 0, 0, 0) 100%),
      linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.35) 10%,
        rgba(0, 0, 0, 0) 50%,
        rgba(0, 0, 0, 0.35) 90%
      );
  }
}
</style>
