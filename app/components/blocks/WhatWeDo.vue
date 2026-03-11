<script setup>
const bannerRef = ref(null);
const contentRef = ref(null);
const mainImg = ref(null);
const pattern = ref(null);
const cardsRef = ref(null);

const { $gsap } = useNuxtApp();
let mm;

onMounted(() => {
  mm = $gsap.matchMedia();

  mm.add(
    {
      sm: "(min-width: 366px) and (max-width: 480px)",
      md: "(min-width: 481px) and (max-width: 1024px)",
      lg: "(min-width: 1025px)",
    },
    (context) => {
      const { sm, lg } = context.conditions;

      const tl = $gsap.timeline({
        scrollTrigger: {
          trigger: mainImg.value,
          start: sm ? "-30% 80%" : "top 80%",
          end: "center 80%",
          scrub: true,
          toggleActions: "play none none reverse",
        },
      });

      tl.from(mainImg.value, {
        y: sm ? -200 : 200,
      }).to(mainImg.value, {
        clipPath: sm ? "circle(35% at 50% 30%)" : "circle(30% at 50% 50%)",
      });

      const tl2 = $gsap.timeline({
        scrollTrigger: {
          trigger: contentRef.value,
          start: sm ? "top top" : "top top",
          end: () => "+=" + bannerRef.value.offsetHeight * 2,
          pin: true,
          pinSpacing: true,
          scrub: true,
        },
      });

      tl2.to(mainImg.value, {
        clipPath: sm ? "circle(75% at 50% 50%)" : "circle(80% at 50% 45%)",
      });

      lg &&
        tl2
          .from(cardsRef.value, {
            xPercent: lg ? 100 : 0,
          })
          .from(
            cardsRef.value.querySelectorAll(".card"),
            {
              xPercent: lg ? 100 : 0,
              stagger: 0.2,
              ease: "power3.out",
            },
            "<",
          );

      sm &&
        tl2
          .from(cardsRef.value, {
            yPercent: 100,
          })
          .from(
            cardsRef.value.querySelectorAll(".card"),
            {
              yPercent: 100,
              stagger: 0.2,
              ease: "power3.out",
            },
            "<",
          );
    },
  );
});
</script>

<template>
  <div class="what-we-do">
    <SectionTitle
      title="What We Do"
      subtitle="We partner with leading global fashion brands to deliver premium garments, from initial concept through to final production, with precision, responsibility, and long-term value."
    />

    <div class="content" ref="contentRef">
      <div class="pattern" ref="pattern">
        <img
          src="~/assets/images/pattern1.png"
          class="pattern-img"
          alt="Pattern"
        />
      </div>

      <div class="banner" ref="bannerRef">
        <img
          src="~/assets/images/whatwedo.jpg"
          alt="What We Do Banner"
          class="main-img"
          ref="mainImg"
        />
      </div>

      <div class="cards container" ref="cardsRef">
        <div class="card">
          <span class="serial">01</span>
          <h2 class="card-title">Design and Innovation</h2>
          <span class="card-subtitle"
            >Design studios across the UK, Europe, and Bangladesh translate
            global trends into refined, commercially precise collections. We
            collaborate closely with our partners to create garments that
            balance creativity, performance, and market relevance.</span
          >
        </div>
        <div class="card">
          <span class="serial">02</span>
          <h2 class="card-title">Global Sourcing</h2>
          <span class="card-subtitle"
            >Design studios across the UK, Europe, and Bangladesh translate
            global trends into refined, commercially precise collections. We
            collaborate closely with our partners to create garments that
            balance creativity, performance, and market relevance.</span
          >
        </div>
        <div class="card">
          <span class="serial">03</span>
          <h2 class="card-title">Development & Manufacturing</h2>
          <span class="card-subtitle"
            >Design studios across the UK, Europe, and Bangladesh translate
            global trends into refined, commercially precise collections. We
            collaborate closely with our partners to create garments that
            balance creativity, performance, and market relevance.</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.what-we-do {
  overflow: hidden;
}
.content {
  width: 100%;
  height: 100vh;
  position: relative;
  @include clamp-property("margin-top", 2.17, 4.38);
  @include flex(center, end);

  @media screen and (min-width: 1024px) {
    height: 100vh;
    overflow: hidden;

    .pattern {
      position: relative;
    }
  }

  .pattern {
    width: 100%;
    background-color: $base;

    @include clamp-property("height", 35, 32.5);

    .pattern-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .banner {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;

    .main-img {
      width: 100%;
      min-height: 100%;
      object-fit: cover;
      clip-path: circle(25% at 50% 25%);

      transform: translate(-50%, -50%);
    }

    @media screen and (min-width: 1024px) {
      height: 100vh;
      .main-img {
        clip-path: circle(25% at 50% 45%);
        height: 100%;
      }
    }
  }

  .cards {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-70%);
    display: grid;
    gap: 2rem;
    z-index: 5;

    @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
      transform: translateY(-50%);
    }

    .card {
      background: $shade-2;
      font-family: $montserrat;
      position: relative;
      overflow: hidden;
      z-index: 2;

      @include clamp-property("height", 18.75, 38.75);
      @include clamp-property("border-radius", 0.75, 1.5);
      @include clamp-property("padding-inline", 1, 2.75);
      @include clamp-property("padding-block-start", 1.5, 2.5);
      @include clamp-property("padding-block-end", 1.5, 4);

      .serial {
        display: inline-block;
        color: $white;
        font-style: normal;
        font-weight: 300;
        line-height: 100%; /* 6rem */
        text-transform: uppercase;
        transition: all 0.45s ease;

        @include clamp-property("margin-bottom", 1.5, 20.75);
        @include clamp-property("font-size", 2.25, 6);
        @include clamp-property("letter-spacing", -0.1125, -0.3);
      }

      .card-title {
        color: $white;
        font-style: normal;
        font-weight: 600;
        line-height: 110%; /* 2.75rem */
        text-transform: uppercase;
        transition: all 0.45s ease;
        font-family: $montserrat;

        @include clamp-property("font-size", 1.5, 2.5);
        @include clamp-property("margin-bottom", 1, 7.5);
      }

      .card-subtitle {
        color: $light;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
        opacity: 0.8;
        @include clamp-property("font-size", 0.875, 1);
        @include clamp-property("letter-spacing", 0.0175, -0.02);
      }

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: $shade-2;
        z-index: -1;
        clip-path: inset(100% 0 0 0);
        transition: clip-path 0.45s ease-in-out;
      }

      &:hover {
        .serial {
          color: $light;
          @include clamp-property("margin-bottom", 1.5, 8);
        }
        .card-title {
          color: $light;
          @include clamp-property("margin-bottom", 1, 1.5);
        }
      }

      &:hover:after {
        clip-path: inset(0% 0 0 0);
      }

      @media screen and (min-width: 1024px) {
        background: $white;

        .serial,
        .card-title {
          color: $black;
        }
      }
    }
  }
}
</style>
