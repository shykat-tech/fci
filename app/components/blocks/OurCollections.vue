<script setup lang="ts"></script>

<template>
  <div class="our-collections">
    <SectionTitle
      title="Our Collections"
      subtitle="We develop premium apparel through design led sourcing and responsible manufacturing, delivering technical precision and scalable global production."
    />

    <div class="content">
      <CollectionHomeCollection />
      <CollectionHomeCollection align="left" img="/men-col.png" />
      <CollectionHomeCollection img="/Fabric.png" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.our-collections {
  position: relative;
  min-height: 100vh;
  overflow: hidden;

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
