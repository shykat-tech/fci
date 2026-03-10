<script setup lang="ts">
const { $gsap } = useNuxtApp();

// Ref
const sustainability = ref<HTMLDivElement | null>(null);
const watermark = ref<HTMLDivElement | null>(null);
const leftCol = ref<HTMLDivElement | null>(null);
const rightCol = ref<HTMLDivElement | null>(null);
const imgContainer = ref<HTMLDivElement | null>(null);
const imgRef = ref<HTMLImageElement | null>(null);

onMounted(() => {
  const tl = $gsap.timeline({
    scrollTrigger: {
      trigger: leftCol.value,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  $gsap.fromTo(
    watermark.value,
    {
      xPercent: 50,
    },
    {
      xPercent: -60,
      scrollTrigger: {
        trigger: sustainability.value,
        start: "top bottom",
        toggleActions: "play none none reverse",
        scrub: true,
      },
    },
  );

  if (imgRef.value && imgContainer.value) {
    tl.from(leftCol.value, {
      y: 200,
    })
      .from(
        rightCol.value,
        {
          y: 400,
        },
        "<",
      )
      .to(
        imgRef.value,
        {
          y: imgRef.value?.offsetHeight - imgContainer.value?.offsetHeight,
        },
        "-=0.3",
      );
  }
});
</script>

<template>
  <div class="sustainability container" ref="sustainability">
    <div class="watermark" ref="watermark">Sustainability</div>

    <div class="left-col" ref="leftCol">
      <h2>Shaping progress responsibly.</h2>
      <p>
        We are actively engaged in reducing the impact of garment manufacturing
        on people and the planet. Our commitment to the environment goes hand in
        hand with our vision for growth.
      </p>

      <NuxtLink to="#" class="explore">
        <button class="primary-btn">
          <span data-content="Explore">Explore</span>
        </button>
      </NuxtLink>
    </div>
    <div class="right-col" ref="rightCol">
      <div class="img-box" ref="imgContainer">
        <img src="~/assets/images/sustainability.png" alt="" ref="imgRef" />
      </div>

      <div class="stats">
        <div class="stat">
          <h3 class="value">147,289,629.6 MJ</h3>
          <h2 class="label">Annual energy consumption</h2>
        </div>
        <div class="stat">
          <h3 class="value">417,727 m³</h3>
          <h2 class="label">Annual water usage</h2>
        </div>
        <div class="stat">
          <h3 class="value">1,896 tons</h3>
          <h2 class="label">Annual waste generated</h2>
        </div>
        <div class="stat">
          <h3 class="value">14,018 tons CO₂e</h3>
          <h2 class="label">Greenhouse gas emissions</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sustainability {
  width: 100%;
  overflow-x: hidden;
  background-color: $base;
  position: relative;

  @include clamp-property("padding-top", 7.5, 18.75);
  @include clamp-property("padding-bottom", 5, 12.5);
  @include flex(center, start, column);
  @include clamp-property("gap", 3, 2);

  .left-col {
    h2 {
      color: $light;
      font-style: normal;
      font-weight: 550;
      line-height: 100%;
      text-transform: uppercase;

      @include clamp-property("font-size", 2.25, 6);
      @include clamp-property("letter-spacing", -0.1125, -0.3);
    }

    p {
      color: $light;
      line-height: 150%;
      font-weight: 400;

      @include clamp-property("font-size", 1, 1.125);
      @include clamp-property("letter-spacing", -0.02, -0.0225);
      @include clamp-property("margin-top", 1.5, 3);
      @include clamp-property("margin-bottom", 1.25, 2.5);
    }
  }

  .right-col {
    width: 100%;
    .img-box {
      overflow: hidden;
      width: 100%;
      @include clamp-property("height", 15.75, 35);
      position: relative;

      img {
        width: 100%;
        height: 120%;
        object-fit: cover;

        position: absolute;
        bottom: 0;
        left: 0%;
      }
    }

    .stats {
      display: grid;
      @include clamp-property("margin-top", 2.5, 4);
      @include clamp-property("gap", 1.5, 2);

      .stat {
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
    }
  }

  @media screen and (min-width: 1024px) {
    flex-direction: row;

    .left-col {
      width: 50%;

      p {
        width: 65%;
      }
    }

    .right-col {
      width: 50%;

      .stats {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }

  .watermark {
    color: $white;
    font-family: $montserrat;
    font-size: 18.75rem;
    font-style: normal;
    font-weight: 700;
    line-height: 100%;
    text-transform: uppercase;
    position: absolute;
    top: 3.4rem;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0.02;

    @include clamp-property("font-size", 5, 18.75);

    @media screen and (min-width: 1024px) {
      top: -3rem;
      left: 0rem;
      transform: translateX(0%);
    }
  }
}
</style>
