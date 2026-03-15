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
const history = ref(null);
const pBar = ref(null);
const sBar = ref(null);

onMounted(async () => {
  await nextTick();

  const tl = $gsap.timeline({
    scrollTrigger: {
      trigger: history.value,
      start: "top 90%",
      // markers: true,
      scrub: true,
      onUpdate: (self) => {
        $gsap.to([pBar.value, sBar.value], {
          height: `${self.progress * 100}%`,
        });
      },
    },
  });
});
</script>

<template>
  <div class="history" ref="history">
    <SectionTitle
      :title="compData?.title"
      heading="History Timeline"
      align="left"
    />

    <div class="progress">
      <div class="progressBar" ref="pBar" />
    </div>

    <div class="content container">
      <div class="timeline" v-for="timeline in compData?.history">
        <img
          v-if="timeline?.image"
          :src="baseURL + timeline?.image?.renditions?.original"
          alt="header-img"
        />
        <div v-else class="empty"></div>

        <div class="timeline-desc">
          <h2 class="year">{{ timeline?.year }}</h2>
          <p class="found">{{ timeline?.founded_in }}</p>

          <div class="desc" v-html="timeline?.description" />
        </div>
      </div>

      <div class="s-progress">
        <div class="s-progressBar" ref="sBar" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.history {
  @include clamp-property("padding-bottom", 7.5, 12.5);

  position: relative;
  background-color: #f2f2f2;
  min-height: 100vh;

  .progress {
    width: 1px;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 0;
    display: none;
    // @include flex(center, start);

    .progressBar {
      width: 2px;
      margin-left: -1px;
      background: $shade-2;
    }

    @media screen and (min-width: 1024px) {
      left: 50%;
      display: block;
    }
  }

  .content {
    position: relative;
    @include clamp-property("margin-top", 3, 10);
    @include clamp-property("margin-left", 1.25, 0);

    & > * + * {
      @include clamp-property("padding-top", 4, 7.5);
    }

    .s-progress {
      width: 1px;
      height: 100%;
      background: rgba(0, 0, 0, 0.1);
      position: absolute;
      top: 0;
      left: 0;

      .s-progressBar {
        width: 2px;
        margin-left: -1px;
        margin-top: -4rem;
        background: $shade-2;
      }

      @media screen and (min-width: 1024px) {
        display: none;
      }
    }

    .timeline {
      @include flex(space-between, start, column-reverse);
      gap: 1.5rem;

      img {
        width: 100%;
      }

      .timeline-desc {
        width: 100%;

        .year {
          color: $shade-2;
          font-style: normal;
          font-weight: 600;
          line-height: 100%;

          @include clamp-property("font-size", 2, 5);
          @include clamp-property("margin-bottom", 1.25, 2.5);
        }

        .found {
          color: $black;
          font-style: normal;
          font-weight: 600;
          line-height: 100%;

          @include clamp-property("font-size", 1.125, 1.5);
          @include clamp-property("margin-bottom", 1, 1.5);
        }

        color: $black;
        font-style: normal;
        font-weight: 450;
        line-height: 150%;

        @include clamp-property("font-size", 1, 1.125);
      }

      &:nth-child(even) {
        flex-direction: column-reverse;
      }

      @media screen and (min-width: 1024px) {
        flex-direction: row;
        &:nth-child(even) {
          flex-direction: row-reverse;
        }
        img {
          width: 40%;
        }

        .timeline-desc {
          width: 40%;
        }
      }
    }
  }
}
</style>
