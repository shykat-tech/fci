<script setup lang="ts"></script>

<template>
  <div class="customers">
    <SectionTitle
      heading="Our customers"
      title="A trusted partner to global brands."
      subtitle="FCI’s strength lies in their ability to balance design integrity, operational excellence, and responsible manufacturing."
    />

    <div class="watermark">Clients</div>

    <div class="clients-logo container">
      <div class="box">
        <img src="~/assets/images/c3.png" alt="" />
      </div>
      <div class="box">
        <img src="~/assets/images/c2.png" alt="" />
      </div>
      <div class="box">
        <img src="~/assets/images/c1.png" alt="" />
      </div>
      <div class="box">
        <img src="~/assets/images/c3.png" alt="" />
      </div>
      <div class="box">
        <img src="~/assets/images/c2.png" alt="" />
      </div>
      <div class="box">
        <img src="~/assets/images/c1.png" alt="" />
      </div>
      <div class="box">
        <img src="~/assets/images/c3.png" alt="" />
      </div>
      <div class="box">
        <img src="~/assets/images/c2.png" alt="" />
      </div>
      <div class="box">
        <img src="~/assets/images/c1.png" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.customers {
  @include clamp-property("padding-bottom", 5, 12.5);
  position: relative;
  overflow: hidden;

  .watermark {
    color: $black;
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
      left: -5rem;
      transform: translateX(0%);
    }
  }

  .clients-logo {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    @include clamp-property("gap", 1, 2);
    @include clamp-property("margin-top", 3, 4);

    .box {
      @include clamp-property("height", 7, 10);
      @include flex(center, center);

      img {
        @include clamp-property("max-height", 1.8, 2);
      }
    }

    @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(6, 1fr);
    }
  }
}
</style>
