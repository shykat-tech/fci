<script setup lang="ts"></script>

<template>
  <div class="sustainability container">
    <div class="watermark">Sustainability</div>

    <div class="left-col">
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
    <div class="right-col">
      <img src="~/assets/images/sustainability.png" alt="" />

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
    img {
      width: 100%;
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
