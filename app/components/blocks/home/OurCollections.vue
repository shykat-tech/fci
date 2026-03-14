<script setup lang="ts"></script>

<template>
  <div class="our-collections">
    <SectionTitle
      title="Our Collections"
      subtitle="We develop premium apparel through design led sourcing and responsible manufacturing, delivering technical precision and scalable global production."
    />

    <div class="content">
      <CollectionHomeCollection
        :data="{
          title: `WoMen's Wear`,
          subtitle: `Refined womenswear combining contemporary silhouettes with technical precision. Designed to balance elegance, fit, and scalable manufacturing excellence.`,
        }"
      />
      <CollectionHomeCollection
        align="left"
        img="/men-col.png"
        :data="{
          title: `Men's Wear`,
          subtitle: `Modern menswear designed for structure, comfort, and versatility. Crafted with precise tailoring, quality fabrics, and production standards suited for global fashion markets.`,
        }"
      />
      <CollectionHomeCollection
        img="/Fabric.png"
        :data="{
          title: `Fabric`,
          subtitle: `Curated fabric collections developed with a focus on quality, performance, and responsible sourcing. Supporting diverse apparel applications with consistent standards and scalable supply.`,
        }"
      />
    </div>

    <div class="bottom-line"></div>
  </div>
</template>

<style scoped lang="scss">
.our-collections {
  position: relative;
  min-height: 100vh;
  // overflow: hidden;

  .bottom-line {
    position: absolute;
    bottom: -5%;
    left: 0;
    width: 100%;
    height: 10%;
    background: linear-gradient(transparent 0%, $light 50%, transparent 100%);
  }

  @include clamp-property("padding-bottom", 7.5, 12.62);
  .content {
    @include clamp-property("margin-top", 3, 7.5);
    @include clamp-property("padding-inline", 1.25, 19.5);

    & > * + * {
      margin-top: 2rem;
    }

    @media screen and (min-width: 1024px) {
      & > * + * {
        margin-top: 0;
      }
    }
  }
}

.our-collections::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url("~/assets/images/collections-bg.png") center/cover no-repeat;
  opacity: 0.2;
  z-index: -1;
}
</style>
