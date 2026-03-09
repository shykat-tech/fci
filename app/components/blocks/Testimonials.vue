<script setup lang="ts">
const { $gsap } = useNuxtApp();

// Testimonials data
const slides = ref([
  { id: 1, name: "John Doe", text: "Great service! Highly recommend." },
  { id: 2, name: "Jane Smith", text: "Amazing experience, very professional." },
  { id: 3, name: "Alice Johnson", text: "Exceeded our expectations!" },
]);

const currentIndex = ref(0);
const sliderContainer = ref<HTMLElement | null>(null);

const nextSlide = async () => {
  if (currentIndex.value < slides.value.length - 1) currentIndex.value++;
  else {
    currentIndex.value = 0;
  }
  //   goToSlide(currentIndex)
};

const prevSlide = async () => {
  if (currentIndex.value > 0) currentIndex.value--;
  else {
    currentIndex.value = slides.value.length - 1;
  }
};

// const goToSlide = async (index) =>{

//   const slides = sliderContainer.value.querySelectorAll(".slide");
//   const actSlide = slides[index.value];

// //   console.log(actSlide)

// }

// let progress;

// watch(()=> {
//     progress = ((currentIndex.value+1)/slides.value.length)*100
// }, currentIndex.value)
</script>

<template>
  <div class="testimonials">
    <SectionTitle
      title="What our clients say about us?"
      heading="Testimonials"
      align="left"
    />

    <div class="content container">
      <div class="slider" ref="sliderContainer">
        <div class="slide">
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
              <h2 class="name">{{ slides[currentIndex].name }}</h2>
              <span class="designation">Director of H&M</span>
            </div>
          </div>

          <div class="quote-col">
            <svg width="54" height="40" viewBox="0 0 54 40" fill="none">
              <path
                d="M12.1823 15.9519C11.5864 15.9519 11.0146 16.0428 10.4455 16.1256..."
                fill="#085E51"
              />
            </svg>

            <p>
              FCI consistently delivers a rare balance of design understanding,
              manufacturing discipline, and responsible production. Their
              ability to scale while maintaining quality makes them a trusted
              long-term partner.
            </p>
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
            <span class="current">
              {{ String(currentIndex + 1).padStart(2, "0") }}
            </span>
            <span class="total">
              /{{ String(slides.length).padStart(2, "0") }}
            </span>
          </div>

          <div class="progress-bar">
            <div
              class="progress"
              :style="{
                width: ((currentIndex + 1) / slides.length) * 100 + '%',
              }"
            ></div>
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

    .slider {
      position: relative;
      overflow: hidden;
      @include flex();
      flex-wrap: nowrap;
      flex-direction: column;

      @media screen and (min-width: 1024px) {
        flex-direction: row;
      }

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

          svg {
            position: absolute;
            left: -4rem;
          }

          p {
            margin-top: 1rem;
            color: $black;
            font-style: normal;
            font-weight: 450;
            line-height: 150%;
            letter-spacing: -0.03rem;
            text-wrap: pretty;
            @include clamp-property("font-size", 1.125, 1.5);
          }
        }

        @media screen and (min-width: 1024px) {
          flex-direction: row;
          .profile-col {
            width: 40%;
          }
          .quote-col {
            width: 55%;
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

          .current {
            color: $shade-3;
            text-align: right;
            font-size: 3rem;
            font-style: normal;
            font-weight: 400;
            line-height: 100%;
          }

          .total {
            color: $shade-3;
            text-align: right;
            font-size: 1.5rem;
            font-style: normal;
            font-weight: 400;
            line-height: 100%;
            margin-left: 0.25rem;
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
            top: 50%;
            left: 0;
            transform: translateY(-50%);
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
