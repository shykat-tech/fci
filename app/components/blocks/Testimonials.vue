<script setup lang="ts">
const { $gsap } = useNuxtApp();

// Testimonials data
const slides = ref([
  { id: 1, name: "John Doe", text: "Great service! Highly recommend." },
  { id: 2, name: "Jane Smith", text: "Amazing experience, very professional." },
  { id: 3, name: "Alice Johnson", text: "Exceeded our expectations!" },
  { id: 4, name: "Galli Johnson", text: "Exceeded our expectations!" },
]);

const currentIndex = ref(0);
const sliderContainer = ref<HTMLElement | null>(null);

const progressRef = ref<HTMLElement | null>(null);

const nextSlide = async () => {
  if (currentIndex.value < slides.value.length - 1) currentIndex.value++;
  else {
    currentIndex.value = 0;
  }
  goToSlide(currentIndex.value, "next");
};

const prevSlide = async () => {
  if (currentIndex.value > 0) currentIndex.value--;
  else {
    currentIndex.value = slides.value.length - 1;
  }
  goToSlide(currentIndex.value, "prev");
};

const goToSlide = async (index: number, dir: "next" | "prev") => {
  const slideNodeList =
    sliderContainer.value?.querySelectorAll<HTMLElement>(".slide");
  if (!sliderContainer.value || !slideNodeList || slideNodeList.length === 0)
    return;

  // Convert NodeList to array so we can safely access by index
  const slideArray = Array.from(slideNodeList);

  const activeSlide = slideArray[index];
  const activeProfileCol =
    activeSlide?.querySelector<HTMLElement>(".profile-col");
  const activeQuoteCol = activeSlide?.querySelector<HTMLElement>(".quote-col");

  const slideWidth = slideArray[0].offsetWidth;
  const xPos = -index * slideWidth;

  // Animate slider container
  $gsap.to(sliderContainer.value, {
    x: xPos,
    duration: 0.5,
    ease: "power3.out",
  });

  // Animate active columns
  if (activeProfileCol && activeQuoteCol) {
    const tl = $gsap.timeline();

    tl.from(activeProfileCol, {
      yPercent: dir === "next" ? -20 : 20,
      opacity: 0,
      duration: 0.25,
      delay: 0.42,
      ease: "none",
    })
      .from(
        activeQuoteCol,
        {
          yPercent: dir === "next" ? -20 : 20,
          opacity: 0,
          duration: 0.3,
          ease: "none",
        },
        "-=0.3",
      )
      .to(
        progressRef.value,
        {
          width: ((index + 1) / slides.value.length) * 100 + "%",
        },
        "-=0.7",
      );
  }
};

onMounted(() => {
  $gsap.set(progressRef.value, {
    width: (1 / slides.value.length) * 100 + "%",
  });
});

const currentNumRef = ref<HTMLElement | null>(null);

// Watch currentIndex and animate the number
watch(currentIndex, () => {
  if (!currentNumRef.value) return;

  const currentEl = currentNumRef.value.querySelector(".current");
  if (!currentEl) return;

  $gsap.fromTo(
    currentEl,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
  );
});
</script>

<template>
  <div class="testimonials">
    <SectionTitle
      title="What our clients say about us?"
      heading="Testimonials"
      align="left"
    />

    <div class="content container">
      <div class="slider-wrapper">
        <div class="slider" ref="sliderContainer">
          <div class="slide" v-for="slide in slides">
            <div class="profile-col">
              <div class="avatars">
                <img
                  src="~/assets/images/avatar.png"
                  alt="avatar"
                  class="avatar"
                />
                <img
                  src="~/assets/images/company.png"
                  alt="company"
                  class="company-logo"
                />
              </div>

              <div class="details">
                <h2 class="name">{{ slide.name }}</h2>
                <span class="designation">Director of H&M</span>
              </div>
            </div>

            <div class="quote-col">
              <svg
                width="54"
                height="40"
                viewBox="0 0 54 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.1823 15.9519C11.5864 15.9519 11.0146 16.0428 10.4455 16.1256C10.6299 15.5057 10.8196 14.8751 11.1242 14.3086C11.4288 13.4856 11.9044 12.7722 12.3774 12.0534C12.7728 11.2759 13.4702 10.7495 13.9832 10.0842C14.5203 9.43754 15.2524 9.00735 15.8323 8.47027C16.4014 7.90915 17.1469 7.62859 17.7401 7.23313C18.36 6.87775 18.8997 6.48497 19.4769 6.29793L20.9171 5.70474L22.1836 5.17836L20.8877 0L19.2925 0.384768C18.7822 0.513025 18.1596 0.662657 17.4515 0.841682C16.7274 0.975283 15.9552 1.34135 15.0948 1.67535C14.2451 2.05478 13.2618 2.31129 12.348 2.92051C11.4288 3.50301 10.368 3.98931 9.43281 4.76954C8.52699 5.57381 7.43414 6.27121 6.62719 7.29459C5.74543 8.25117 4.87435 9.25584 4.19834 10.3995C3.41544 11.4896 2.88371 12.6867 2.32258 13.8704C1.8149 15.0541 1.40608 16.2645 1.07208 17.4402C0.438817 19.7969 0.155584 22.0361 0.0460314 23.9519C-0.044817 25.8704 0.00862325 27.4656 0.120848 28.6199C0.160928 29.165 0.235744 29.6941 0.289185 30.0601L0.355984 30.509L0.425457 30.493C0.900704 32.713 1.99474 34.7531 3.581 36.3772C5.16727 38.0014 7.18094 39.1433 9.38909 39.6709C11.5972 40.1984 13.9096 40.09 16.0587 39.3583C18.2079 38.6265 20.1059 37.3013 21.5333 35.5358C22.9607 33.7704 23.8591 31.6369 24.1246 29.3822C24.3902 27.1275 24.0119 24.8437 23.0337 22.795C22.0555 20.7463 20.5172 19.0163 18.5969 17.8053C16.6765 16.5943 14.4526 15.9518 12.1823 15.9519ZM41.5744 15.9519C40.9786 15.9519 40.4068 16.0428 39.8376 16.1256C40.022 15.5057 40.2117 14.8751 40.5163 14.3086C40.8209 13.4856 41.2965 12.7722 41.7695 12.0534C42.1649 11.2759 42.8623 10.7495 43.3754 10.0842C43.9124 9.43754 44.6446 9.00735 45.2244 8.47027C45.7935 7.90915 46.539 7.62859 47.1322 7.23313C47.7521 6.87775 48.2919 6.48497 48.869 6.29793L50.3092 5.70474L51.5758 5.17836L50.2798 0L48.6846 0.384768C48.1743 0.513025 47.5517 0.662657 46.8436 0.841682C46.1195 0.975283 45.3473 1.34135 44.4869 1.67535C43.6399 2.05745 42.6539 2.31129 41.7401 2.92318C40.8209 3.50568 39.7601 3.99198 38.8249 4.77221C37.9191 5.57649 36.8263 6.27388 36.0193 7.29459C35.1375 8.25117 34.2665 9.25584 33.5905 10.3995C32.8076 11.4896 32.2758 12.6867 31.7147 13.8704C31.207 15.0541 30.7982 16.2645 30.4642 17.4402C29.8309 19.7969 29.5477 22.0361 29.4381 23.9519C29.3473 25.8704 29.4007 27.4656 29.513 28.6199C29.553 29.165 29.6279 29.6941 29.6813 30.0601L29.7481 30.509L29.8176 30.493C30.2928 32.713 31.3869 34.7531 32.9731 36.3772C34.5594 38.0014 36.5731 39.1433 38.7812 39.6709C40.9893 40.1984 43.3017 40.09 45.4508 39.3583C47.6 38.6265 49.498 37.3013 50.9254 35.5358C52.3528 33.7704 53.2512 31.6369 53.5168 29.3822C53.7823 27.1275 53.404 24.8437 52.4258 22.795C51.4476 20.7463 49.9093 19.0163 47.989 17.8053C46.0686 16.5943 43.8447 15.9518 41.5744 15.9519Z"
                  fill="#085E51"
                />
              </svg>

              <p>
                FCI consistently delivers a rare balance of design
                understanding, manufacturing discipline, and responsible
                production. Their ability to scale while maintaining quality
                makes them a trusted long-term partner.
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- Navigation -->
      <div class="navigation">
        <div class="prev-next">
          <button class="prev" @click="prevSlide">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path d="M13 2L5 10L13 18" stroke="#04312A" stroke-width="1.5" />
              <path d="M15 4L9 10L15 16" stroke="#04312A" stroke-width="1.5" />
            </svg>
          </button>

          <button class="next" @click="nextSlide">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path d="M7 18L15 10L7 2" stroke="#04312A" stroke-width="1.5" />
              <path d="M5 16L11 10L5 4" stroke="#04312A" stroke-width="1.5" />
            </svg>
          </button>
        </div>

        <!-- Counter + Progress -->
        <div class="slider-info">
          <div class="counter" ref="currentNumRef">
            <div class="current-box">
              <span class="current">
                {{ String(currentIndex + 1).padStart(2, "0") }}
              </span>
            </div>
            <span class="total">
              /{{ String(slides.length).padStart(2, "0") }}
            </span>
          </div>

          <div class="progress-bar">
            <div class="progress" ref="progressRef" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.testimonials {
  position: relative;
  min-height: 100vh;
  overflow: hidden;

  @include clamp-property("padding-bottom", 7.5, 12.5);

  .content {
    @include clamp-property("margin-top", 3, 7.5);

    .slider-wrapper {
      overflow: hidden;
    }

    .slider {
      position: relative;
      @include flex();
      flex-wrap: nowrap;
      flex-direction: row;

      .slide {
        flex-shrink: 0;
        width: 100%;
        @include flex(space-between, start);
        flex-direction: column;

        @include clamp-property("gap", 1, 10);
        overflow: visible;

        .profile-col {
          width: 100%;

          .avatars {
            @include clamp-property("margin-bottom", 1.5, 2);

            img {
              width: 5rem;
              height: 5rem;
              position: relative;
            }

            .company-logo {
              margin-left: -1.5rem;
              z-index: -1;
            }
          }

          .name {
            color: $shade-2;
            font-style: normal;
            font-weight: 600;
            line-height: 100%;
            /* 3rem */
            text-transform: uppercase;
            @include clamp-property("font-size", 1.75, 3);
            @include clamp-property("margin-bottom", 0.5, 0.75);
          }

          .designation {
            color: $black;
            font-style: normal;
            font-weight: 450;
            line-height: 150%;
            /* 1.6875rem */
            letter-spacing: -0.0225rem;
            @include clamp-property("font-size", 1, 1.125);
          }
        }

        .quote-col {
          width: 100%;
          position: relative;

          p {
            color: $black;
            font-style: normal;
            font-weight: 450;
            line-height: 150%;
            letter-spacing: -0.03rem;
            text-wrap: pretty;
            @include clamp-property("font-size", 1.125, 1.5);
            @include clamp-property("margin-top", 0.5, 1);
          }
        }

        @media screen and (min-width: 1024px) {
          flex-direction: row;
          .profile-col {
            width: 40%;
          }
          .quote-col {
            width: 55%;

            svg {
              position: absolute;
              left: -4rem;
            }
          }
        }
      }
    }

    .navigation {
      @include flex(space-between, center, column);
      @include clamp-property("gap", 1, 10);
      @include clamp-property("margin-top", 3, 5);

      @media screen and (min-width: 1024px) {
        flex-direction: row;

        .prev-next {
          width: 40%;
        }
        .slider-info {
          width: 55%;
        }
      }

      .prev-next {
        width: 100%;
        @include flex(start, start, row);

        button {
          background-color: transparent;
          outline: none;
          @include clamp-property("width", 3, 3.75);
          @include clamp-property("height", 3, 3.75);
          @include flex(center, center, row);

          aspect-ratio: 1/1;
          border-radius: 50%;
          border: 1px solid $base;
          margin-right: 1rem;
          cursor: pointer;

          svg {
            @include clamp-property("width", 0.9, 1);
            @include clamp-property("height", 0.9, 1);
          }
        }
      }

      .slider-info {
        width: 100%;

        .counter {
          text-align: end;
          @include flex(end, end);

          .current-box {
            overflow: hidden;
            .current {
              color: $shade-3;
              text-align: right;
              font-size: 3rem;
              font-style: normal;
              font-weight: 400;
              line-height: 100%;
              display: inline-block;
            }
          }

          .total {
            color: $shade-3;
            text-align: right;
            font-size: 1.5rem;
            font-style: normal;
            font-weight: 400;
            line-height: 100%;
            margin-left: 0.25rem;
            padding-bottom: 2px;
          }
        }

        .progress-bar {
          height: 1px;
          position: relative;
          @include clamp-property("margin-top", 0.75, 1.25);

          .progress {
            height: 300%;
            background: $shade-3;
          }

          &::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            top: 100%;
            left: 0;
            background: $shade-3;
            opacity: 0.5;
          }
        }
      }
    }

    /* Progress & counter */
  }
}

.testimonials::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url("~/assets/images/testimonials-bg.png") center/cover no-repeat;
  opacity: 0.5;
  z-index: -1;
}

.testimonials::after {
  content: "";
  position: absolute;
  inset: 0;
  background-color: #efefef;
  opacity: 0.5;
  z-index: -2;
}
</style>
