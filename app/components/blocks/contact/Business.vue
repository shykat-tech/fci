import { Business } from '~/components/blocks/contact';
<script setup lang="ts">
const { compData } = defineProps({
  compData: {
    type: Object,
    required: true,
  },
});

const socialIconType = [
  {
    link_type: "facebook",
    icon: "/facebook.jpg",
  },
  {
    link_type: "linkedin",
    icon: "/linkedin.jpg",
  },
  {
    link_type: "instagram",
    icon: "/instagram.jpg",
  },
];
</script>

<template>
  <div class="business container">
    <h2 class="title">{{ compData?.title }}</h2>

    <ul class="business-info">
      <li v-for="b in compData?.businesses">
        <div class="logo">
          <img src="~/assets/images/b-logo.png" />
        </div>

        <div class="info">
          <div class="address">
            <p>{{ b?.address?.location }}</p>

            <div class="phone-email">
              <span class="phone">{{ b?.address?.phone }}</span>
              <span class="emial">{{ b?.address?.email }}</span>
            </div>
          </div>

          <div
            class="social"
            v-for="social in b?.address?.socials"
            :key="social.link_type"
          >
            <NuxtLink>
              <img
                :src="
                  socialIconType.find((l) => l.link_type === social.link_type)
                    ?.icon
                "
                :alt="social.link_type"
              />
            </NuxtLink>
          </div>
        </div>

        <NuxtLink :to="b?.address?.google_map" target="_blank" class="map_link"
          ><svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="47.4"
              y="47.4"
              width="46.8"
              height="46.8"
              rx="23.4"
              transform="rotate(-180 47.4 47.4)"
              stroke="#04312A"
              stroke-width="1.2"
            />
            <path
              d="M30 30C31.2447 30.4244 32 30.9819 32 31.5925C32 32.9221 28.4183 34 24 34C19.5817 34 16 32.9221 16 31.5925C16 30.9819 16.7553 30.4244 18 30"
              stroke="#04312A"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M27 21.5C27 23.1569 25.6569 24.5 24 24.5C22.3431 24.5 21 23.1569 21 21.5C21 19.8432 22.3431 18.5 24 18.5C25.6569 18.5 27 19.8432 27 21.5Z"
              stroke="#04312A"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M24 14C28.0588 14 31.5 17.428 31.5 21.5869C31.5 25.812 28.0028 28.777 24.7725 30.7932C24.5371 30.9287 24.2709 31 24 31C23.7291 31 23.4629 30.9287 23.2275 30.7932C20.0032 28.7573 16.5 25.8266 16.5 21.5869C16.5 17.428 19.9412 14 24 14Z"
              stroke="#04312A"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>

          <span>View on Map</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.business {
  @include clamp-property("padding-block", 7.5, 12.5);

  .title {
    width: 95%;
    font-weight: 550;
    line-height: 100%; /* 6rem */
    text-transform: uppercase;
    text-wrap: balance;

    @include clamp-property("font-size", 2.25, 6);
    @include clamp-property("letter-spacing", -0.0675, -0.18);
    @include clamp-property("margin-bottom", 3, 7.5);

    @media screen and (min-width: 1024px) {
      width: 50%;
    }
  }

  .business-info {
    list-style: none;

    li {
      border-top: 1px solid rgba(0, 0, 0, 0.25);
      @include clamp-property("padding-top", 2.5, 2.5);
      @include flex(space-between, start, column);
      gap: 2rem;

      .logo {
        flex-shrink: 0;
      }

      .info {
        .address {
          @include flex(start, start, column);
          gap: 2rem;

          p {
            color: $black;
            font-style: normal;
            font-weight: 450;
            line-height: 150%; /* 1.6875rem */
            @include clamp-property("font-size", 1, 1.125);
          }

          .phone-email {
            span {
              display: block;
              color: $black;
              font-style: normal;
              font-weight: 550;
              line-height: 180%;
              @include clamp-property("font-size", 1.125, 1.25);
            }
          }
        }

        .social {
          @include clamp-property("margin-top", 1.25, 1.5);
          @include flex();
          grid-area: 0.75rem;

          img {
            padding: 0.75rem;

            border: 1px solid;
          }
        }
      }

      .map_link {
        @include flex(start, center);
        gap: 0.75rem;
        text-decoration: none;

        span {
          color: $black;
          font-size: 1rem;
          font-style: normal;
          font-weight: 550;
          line-height: 120%; /* 1.2rem */
          letter-spacing: -0.02rem;
        }
      }
    }

    & > * + * {
      @include clamp-property("margin-top", 2.5, 4);
    }
  }

  @media screen and (min-width: 1024px) {
    .logo {
      width: 40%;
    }

    .business-info {
      li {
        flex-direction: row;

        .info {
          width: 50%;

          .address {
            flex-direction: row;

            p,
            .phone-email {
              width: 50%;
            }
          }
        }

        .map_link {
          span {
            display: none;
          }
        }
      }
    }
  }
}
</style>
