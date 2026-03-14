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
      const { sm, lg } = context.conditions || {};

      const stats = $gsap.utils.toArray<HTMLElement>(".stats");

      stats.forEach((el, i) => {
        $gsap.from(el, {
          y: 80,
          opacity: 0,
          scrollTrigger: {
            trigger: el,
            start: "-10% bottom",
            end: "bottom bottom",
            toggleActions: "play none none reverse",

            onEnter: () => {
              activeSerial.value = i + 1;

              lg &&
                $gsap.to(leftCol.value, {
                  height: `${15 * (i + 1)}rem`,
                });
            },

            onEnterBack: () => {
              activeSerial.value = i + 1;

              lg &&
                $gsap.to(leftCol.value, {
                  height: `${15 * (i + 1)}rem`,
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
      <h2 class="title">Our Focus</h2>

      <span class="serial-wrapper">
        <span class="serial" ref="serialRef">{{
          String(activeSerial).padStart(2, "0")
        }}</span>
      </span>
    </div>

    <div class="right-col" ref="statsCol">
      <div class="stats" v-for="(stat, i) in compData?.stats" :key="i">
        <span class="serial">{{ stat?.serial }}</span>

        <div class="label">{{ stat?.title }}</div>
        <div class="value">{{ stat?.description }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.focus {
  width: 100%;
  position: relative;

  @include clamp-property("padding-block", 7.5, 12.5);
  @include flex(space-between, stretch, column);

  .left-col {
    height: 100%;
    @include flex(start, start, column);
    .title {
      color: $black;
      font-style: normal;
      line-height: 100%; /* 3rem */
      letter-spacing: -0.09rem;
      text-transform: uppercase;
      font-size: 700;
      margin-bottom: 3rem;

      @include clamp-property("font-size", 1.75, 3);
      @include clamp-property("letter-spacing", -0.0525, -0.09);

      @media screen and (min-width: 1024px) {
        font-weight: 450;
        margin-bottom: 5.5rem;
      }
    }

    .serial {
      display: none;
    }

    @media screen and (min-width: 1024px) {
      width: 50%;
      position: sticky;
      top: var(--nav-desktop-height);
      padding-bottom: 5.5rem;

      @include flex(space-between, start, column);

      .serial-wrapper {
        :deep(.serial) {
          width: 100%;
          display: block;
          color: $base;
          font-style: normal;
          font-weight: 600;
          line-height: 100%;
          font-size: 11.25rem;
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
          margin-top: 5rem;
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
    background: url("~/assets/images/stats-bg.png") lightgray -38.39px 0px /
      169.58% 100% no-repeat;

    opacity: 0.25;
    z-index: -1;
  }
}
</style>
