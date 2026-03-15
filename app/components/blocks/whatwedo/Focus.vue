<script setup lang="ts">
const { compData } = defineProps({
  compData: {
    type: Object,
    required: true,
  },
});

const { $gsap } = useNuxtApp();
const activeSerial = ref(1);

const focusRef = ref<HTMLDivElement | null>(null);
const leftCol = ref<HTMLDivElement | null>(null);
const serialRef = ref<HTMLDivElement | null>(null);

const maxValue = computed(() =>
  Math.max(...compData.stats.map((stat: any) => Number(stat?.serial || 0))),
);

let mm: gsap.MatchMedia | null = null;

onMounted(async () => {
  await nextTick();

  mm = $gsap.matchMedia();

  mm.add(
    {
      xs: "(max-width:365px)",
      sm: "(min-width: 366px) and (max-width: 480px)",
      md: "(min-width: 481px) and (max-width: 1024px)",
      lg: "(min-width: 1025px)",
    },
    (context) => {
      const stats = $gsap.utils.toArray<HTMLElement>(".stats", focusRef.value);

      stats.forEach((el, i) => {
        $gsap.from(el, {
          y: 50,
          opacity: 0,
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom bottom",
            toggleActions: "play none none reverse",

            onEnter: () => {
              $gsap.to(serialRef.value, {
                yPercent: `-${100 * i}`,
                ease: "none",
              });
            },

            onEnterBack: () => {
              $gsap.to(serialRef.value, {
                yPercent: `-${100 * i}`,
                ease: "none",
              });
            },
            onLeaveBack: () => {
              activeSerial.value = Math.max(1, i);
            },
          },
        });
      });
    },
  );
});
</script>

<template>
  <div class="focus container" ref="focusRef">
    <div class="left-col" ref="leftCol">
      <h2 class="title">{{ compData?.title ?? "Our Focus" }}</h2>

      <span class="serial-wrapper" ref="serialWrapperRef">
        <span class="before-serial" v-if="maxValue < 10">0</span>
        <span class="serial" ref="serialRef">
          <span v-for="(stat, i) in compData?.stats" :key="i">
            {{ Number(stat?.serial) }}</span
          >
        </span>
      </span>
    </div>

    <div class="right-col" ref="statsCol">
      <div class="stats" v-for="(stat, i) in compData?.stats" :key="i">
        <span class="serial">{{ stat?.serial }}</span>

        <div class="label" v-html="stat?.label" />
        <div class="value" v-html="stat?.value" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.focus {
  width: 100%;
  position: relative;
  @include clamp-property("padding-block", 7.5, 12.5);
  @include flex(space-between, start, column);

  .left-col {
    .title {
      color: $black;
      font-style: normal;
      line-height: 100%; /* 3rem */
      letter-spacing: -0.09rem;
      text-transform: uppercase;
      font-size: 700;
      margin-bottom: 3rem;
      position: relative;

      @include clamp-property("font-size", 1.75, 3);
      @include clamp-property("letter-spacing", -0.0525, -0.09);

      @media screen and (min-width: 1024px) {
        font-weight: 450;
        margin-bottom: 0;
      }
    }

    .serial {
      display: none;
    }

    .before-serial {
      display: none;
    }

    @media screen and (min-width: 1024px) {
      width: 50%;
      height: calc(100svh - var(--nav-desktop-height));
      position: sticky;
      top: var(--nav-desktop-height);

      @include flex(start, start, column);

      @include flex(start, start, column);

      .serial-wrapper {
        margin-top: calc(4.5rem);
        position: sticky;
        top: 75%;
        overflow: hidden;

        @include clamp-property("margin-bottom ", 2.5, 5);
        @include flex(center, center);

        .before-serial {
          width: 100%;
          display: block;
          font-size: 11.25rem;
          font-weight: 600;
          line-height: 100%;
          color: $base;
          height: 11.25rem;
          transform: translateY(0);
        }

        :deep(.serial) {
          width: 100%;
          display: block;
          font-size: 11.25rem;
          font-weight: 600;
          line-height: 100%;
          color: $base;
          height: 11.25rem;

          @include flex(start, start, column);
        }
      }
    }
  }
  .right-col {
    height: auto;
    .stats {
      border-top: 1px solid $base-35;

      @include clamp-property("padding-top ", 2.5, 2);
      @include clamp-property("padding-bottom ", 2.5, 5);

      .serial {
        display: block;
        color: $base;
        font-style: normal;
        font-weight: 600;
        line-height: 100%;
        font-size: 3.5rem;
        margin-bottom: 2rem;
      }

      .label {
        color: $black;
        font-style: normal;
        font-weight: 600;
        line-height: 150%;

        @include clamp-property("font-size", 1.25, 2);
        @include clamp-property("margin-bottom", 1, 1.5);
      }

      .value {
        color: $black;
        font-style: normal;
        font-weight: 450;
        line-height: 150%;

        @include clamp-property("font-size", 1.125, 1.25);
        @include clamp-property("letter-spacing", -0.0225, -0.025);
      }
    }

    @media screen and (min-width: 1024px) {
      width: 32rem;
      overflow: hidden;
      .stats {
        .serial {
          display: none;
        }
      }
    }
  }

  @media screen and (min-width: 1024px) {
    flex-direction: row;
  }
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: url("~/assets/images/stats-bg.png") rgb(255, 255, 255) -38.39px
      0px / 169.58% 100% no-repeat;

    opacity: 0.25;
    z-index: -1;
  }
}
</style>
