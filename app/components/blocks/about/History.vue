<script setup lang="ts">
const { compData } = defineProps({
  compData: {
    type: Object,
    required: true,
  },
});

const { baseURL } = useBackendAPI();
</script>

<template>
  <div class="history">
    <SectionTitle
      :title="compData?.title"
      heading="History Timeline"
      align="left"
    />

    <div class="progress">
      <div class="progressBar" />
    </div>

    <div class="content container">
      <div class="timeline" v-for="timeline in compData?.history">
        <img
          :src="baseURL + timeline?.image?.renditions?.original"
          alt="header-img"
        />

        <div class="timeline-desc">
          <h2 class="year">{{ timeline?.year }}</h2>
          <p class="found">{{ timeline?.founded_in }}</p>

          <div class="desc" v-html="timeline?.description" />
        </div>
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
    left: 50%;
    // @include flex(center, start);

    .progressBar {
      width: 2px;
      margin-left: -1px;
      height: 30%;
      background: $shade-2;
    }
  }

  .content {
    @include clamp-property("margin-top", 3, 10);

    & > * + * {
      @include clamp-property("margin-top", 4, 7.5);
    }

    .timeline {
      @include flex(space-between, start);

      img {
        width: 40%;
      }

      .timeline-desc {
        width: 40%;

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

        .desc {
        }

        color: $black;
        font-style: normal;
        font-weight: 450;
        line-height: 150%;

        @include clamp-property("font-size", 1, 1.125);
      }

      &:nth-child(even) {
        flex-direction: row-reverse;
      }
    }
  }
}
</style>
