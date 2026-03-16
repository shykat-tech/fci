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
  <div class="commitment">
    <div class="topper container">
      <div class="left-col">
        <h2 class="title">{{ compData?.title }}</h2>

        <div class="com-stats">
          <div class="stat" v-for="com in compData?.commitment">
            <div class="l-col">
              <img
                class="icon"
                :src="baseURL + com?.icon?.url"
                :alt="com?.icon?.name"
              />
              <p>{{ com?.label }}</p>
            </div>
            <div class="r-col" v-html="com?.value" />
          </div>
        </div>
      </div>
      <div class="right-col">
        <div class="banner">
          <img
            class="icon"
            :src="baseURL + compData?.image?.renditions?.exact"
            :alt="compData?.image?.alt"
          />
        </div>

        <div class="stats">
          <div class="stat" v-for="stat in compData?.stats">
            <p class="value">{{ stat?.label }}</p>
            <div class="label" v-html="stat?.value" />
          </div>
        </div>

        <div class="note" v-html="compData?.note" />
      </div>
    </div>

    <div class="bottom-area container">
      <div class="bottom-title" v-html="compData?.bottom_title" />
      <div class="bottom-subtitle" v-html="compData?.bottom_description" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.commitment {
  position: relative;
  .topper {
    background-color: $base;
    display: grid;
    @include clamp-property("gap", 3, 2);

    .left-col {
      width: 100%;
      height: 100vh;
      flex-shrink: 0;
      @include clamp-property("padding-top", 7.5, 12.5);
      position: sticky;
      //   top: var(--nav-desktop-height);
      top: 0;
      left: 0;
      z-index: 1;

      .title {
        color: $white;
        font-style: normal;
        font-weight: 550;
        line-height: 100%; /* 6rem */
        text-transform: uppercase;

        @include clamp-property("font-size", 2.25, 6);
        // @include clamp-property("letter-spacing", -0.1125, -0.3);
      }

      .com-stats {
        @include clamp-property("margin-top", 3, 4);

        & > * + * {
          @include clamp-property("margin-top", 2.5, 3);
        }

        .stat {
          display: grid;
          @include clamp-property("gap", 1.5, 2);

          .l-col {
            p {
              color: $white;
              font-style: normal;
              font-weight: 450;
              line-height: 100%; /* 6rem */
              text-transform: uppercase;

              @include clamp-property("margin-top", 0.75, 0.75);
              @include clamp-property("font-size", 1.125, 1.5);
              //   @include clamp-property("letter-spacing", -0.0225, -0.3);
            }
          }

          .r-col {
            color: $white;
            font-style: normal;
            font-weight: 400;
            line-height: 150%; /* 6rem */
            text-transform: uppercase;

            @include clamp-property("font-size", 1, 1);
            // @include clamp-property("letter-spacing", -0.02, -0.0225);

            :deep(p) {
              opacity: 0.8;
            }
          }
        }
      }
    }

    .right-col {
      width: 100%;
      position: relative;
      z-index: 2;
      @include clamp-property("padding-bottom", 7.5, 12.5);
      background-color: $base;

      .banner {
        width: 100%;
        height: 27.25rem;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .stats {
        @include clamp-property("margin-top", 3, 7.5);
        display: grid;
        @include clamp-property("gap", 1.5, 2);

        .value {
          color: $light;
          font-style: normal;
          font-weight: 600;
          line-height: 100%; /* 2rem */
          @include clamp-property("font-size", 1.25, 2);
        }

        .label {
          color: $light;
          font-style: normal;
          font-weight: 400;
          line-height: 150%;

          @include clamp-property("font-size", 1, 1.125);
          @include clamp-property("margin-top", 0.5, 0.75);
        }
      }

      .note {
        color: $light-50;
        font-style: normal;
        font-weight: 450;
        line-height: 150%; /* 2rem */

        @include clamp-property("margin-top", 2, 4);
        @include clamp-property("font-size", 1.125, 1.5);

        :deep(b) {
          color: $white;
          font-weight: 450;
        }
      }
    }

    @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);

      .left-col {
        z-index: auto;
        .com-stats {
          .stat {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      }

      .right-col {
        .banner {
          height: 58.25rem;
        }

        .stats {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }
  }

  .bottom-area {
    @include clamp-property("margin-bottom", 5, 12.5);

    .bottom-title {
      color: $base;
      font-style: normal;
      font-weight: 600;
      line-height: 120%;
      text-transform: uppercase;

      @include clamp-property("font-size", 1.75, 3);
      @include clamp-property("letter-spacing", -0.0525, -0.09);
      @include clamp-property("margin-bottom", 1.5, 4);
      @include clamp-property("margin-top", 5, 10);
    }

    .bottom-subtitle {
      color: $black;
      font-style: normal;
      font-weight: 450;
      line-height: 150%;
      text-transform: uppercase;

      @include clamp-property("font-size", 1, 1.125);
      @include clamp-property("letter-spacing", -0.02, -0.0225);

      & > * + * {
        margin-top: 1.5rem;
      }

      @media screen and (min-width: 1024px) {
        width: 60%;
        margin-left: auto;
      }
    }
  }
}
</style>
