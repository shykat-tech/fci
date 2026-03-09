<script setup lang="ts"></script>

<template>
  <div class="stats">
    <SectionTitle
      heading="Why Us"
      title="Where design intention meets manufacturing precision"
      subtitle="A design-led manufacturing group shaping premium apparel through craft, technology, and responsible production. Connecting British heritage with advanced global manufacturing capability."
    />

    <div class="content container">
      <div class="stat">
        <h3 class="value">06</h3>
        <h2 class="label">Production Facilities</h2>
      </div>
      <div class="stat">
        <h3 class="value">10000+</h3>
        <h2 class="label">People Across our Group</h2>
      </div>
      <div class="stat">
        <h3 class="value">$200M+</h3>
        <h2 class="label">Annual Turnover</h2>
      </div>
      <div class="stat">
        <h3 class="value">20M+</h3>
        <h2 class="label">Annual Production Capacity</h2>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.stats {
  position: relative;
  min-height: 100vh;
  @include clamp-property("padding-bottom", 7.5, 18.5);

  .content {
    @include clamp-property("margin-top", 3, 7.5);

    .stat {
      @include flex(space-between, center);
      font-family: $montserrat;
      border-top: 1px solid $base-35;

      @include clamp-property("padding-block", 2, 3);

      .value {
        color: $base;
        font-style: normal;
        font-weight: 400;
        line-height: 100%;
        @include clamp-property("font-size", 2.375, 7.5);
      }

      .label {
        color: $black;
        font-weight: 400;
        line-height: 100%;
        font-weight: 600;
        text-wrap: pretty;
        font-style: normal;
        text-align: right;

        @include clamp-property("font-size", 1.125, 2);
        @include clamp-property("width", 10, 20);
      }
    }
  }
}
.stats::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url("~/assets/images/stats-bg.png") lightgray -38.39px 0px /
    169.58% 100% no-repeat;

  opacity: 0.25;
  z-index: -1;
}
</style>
