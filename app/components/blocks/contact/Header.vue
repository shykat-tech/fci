<script setup lang="ts">
const { compData } = defineProps({
  compData: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="contact-header container">
    <h1 class="title">{{ compData?.title }}</h1>

    <div class="bottom-row">
      <svg
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

      <div class="content">
        <div class="phone-email">
          <h4>Contact</h4>
          <div class="block">
            <span class="phone">{{ compData?.phone }}</span>
            <span class="email">{{ compData?.email }}</span>
          </div>
        </div>

        <ul class="locations">
          <li v-for="location in compData?.locations" class="location">
            <span class="name">{{ location?.name }}</span>
            <NuxtLink :to="location?.google_map" target="_blank" class="btn">
              <button class="primary-btn">
                <span data-content="View on Map">View on Map</span>
              </button>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact-header {
  background-color: $base;
  padding-top: calc(var(--nav-mobile-height) + 5.75rem);

  @include clamp-property("padding-bottom", 6.75, 3.75);

  .title {
    color: $white;
    font-style: normal;
    font-weight: 600;
    line-height: 100%; /* 10rem */
    text-transform: uppercase;
    text-wrap: balance;

    @include clamp-property("font-size", 3, 10);
    @include clamp-property("letter-spacing", -0.09, -0.3);
    @include clamp-property("margin-bottom", 5, 6.25);
  }

  .bottom-row {
    svg {
      display: none;
    }
    .content {
      .phone-email {
        @include clamp-property("padding-bottom", 2, 4);

        h4 {
          color: $white;
          font-style: normal;
          font-weight: 450;
          line-height: 150%;
          text-transform: capitalize;
          text-wrap: balance;
          opacity: 0.75;

          @include clamp-property("font-size", 1.125, 1.5);
          @include clamp-property("margin-bottom", 0.75, 1);
        }

        .phone,
        .email {
          display: block;
          color: $white;
          font-style: normal;
          font-weight: 550;
          line-height: 120%;
          text-transform: capitalize;
          text-wrap: balance;

          @include clamp-property("font-size", 1.5, 2.5);
        }

        .block {
          & > * + * {
            @include clamp-property("margin-top ", 1, 1);
          }
        }
      }

      .locations {
        list-style: none;
        .location {
          border-top: 1px solid $white-50;

          @include flex(space-between, start, column);
          @include clamp-property("gap", 1.5, 4);
          @include clamp-property("padding-block", 2, 4);

          &:last-child {
            padding-bottom: 0;
          }

          .name {
            display: block;
            color: $white;
            font-style: normal;
            font-weight: 550;
            line-height: 120%;
            text-transform: capitalize;
            text-wrap: balance;

            @include clamp-property("font-size", 1.5, 2.5);
          }

          .btn {
            flex-shrink: 0;
          }
        }
      }
    }
  }

  @media screen and (min-width: 1024px) {
    padding-top: calc(var(--nav-desktop-height) + 8.75rem);

    .title {
      width: 90%;
    }

    .bottom-row {
      @include flex();

      svg {
        display: block;
        margin-top: 13.75rem;
      }

      .content {
        width: 50%;
        margin-left: auto;

        .locations {
          .location {
            flex-direction: row;
          }
        }
      }
    }
  }
}
</style>
