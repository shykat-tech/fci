<script setup lang="ts">
const { align = "right" } = defineProps({
  align: {
    type: String as () => "left" | "right",
  },
  img: {
    type: String,
  },
});
</script>

<template>
  <div class="collection" :class="align === 'left' ? 'left' : 'right'">
    <div class="left-col">
      <h2>Women's Wear</h2>
      <p>
        Refined women's wear combining contemporary silhouettes with technical
        precision. Designed to balance elegance, fit, and scalable manufacturing
        excellence.
      </p>
    </div>
    <div class="right-col">
      <img :src="img ?? '/home-col.png'" alt="home collection" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.collection {
  width: 100%;
  @include flex(center, center, column);
  @include clamp-property("gap", 1.25, 2);

  .left-col,
  .right-col {
    width: 100%;
  }

  .left-col {
    h2 {
      color: $base;
      font-style: normal;
      font-weight: 600;
      line-height: 110%;
      text-transform: uppercase;

      @include clamp-property("font-size", 1.5, 2.5);
      @include clamp-property("margin-bottom", 1, 1.5);
    }

    p {
      color: $base;
      font-style: normal;
      font-weight: 400;
      line-height: 150%; /* 1.6875rem */
      letter-spacing: -0.0225rem;
      @include clamp-property("font-size", 1, 1.125);
    }
  }

  .right-col {
    img {
      width: 100%;
      height: auto;
    }
  }

  @media screen and (min-width: 1024px) {
    flex-direction: row;

    &:nth-child(even) {
      margin-top: -3rem !important;
      margin-bottom: -3rem !important;
    }

    &.left {
      width: 97%;
      margin-inline: auto;
      flex-direction: row-reverse;
      @include clamp-property("gap", 1.25, 8);

      .left-col {
        width: 45%;
      }
      .right-col {
        width: 50%;
      }
    }

    .left-col {
      width: 40%;

      h2 {
        width: 80%;
      }

      p {
        width: 60%;
      }
    }

    .right-col {
      width: 60%;
    }
  }
}
</style>
