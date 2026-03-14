<script setup lang="ts">
const route = useRoute();
const { $gsap } = useNuxtApp();
const { add, cleanup } = useGsapCleanup();
const isMenuOpen = ref(false);

const handleOpenMenu = () => {
  isMenuOpen.value = true;
  document.body.style.overflow = "hidden";
};

const handleMenuClose = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = "";
};

const navDeskEl = ref<HTMLDivElement | null>(null);
const navMobEl = ref<HTMLDivElement | null>(null);
const navRef = ref<HTMLElement | null>(null);

const navWhite = ref(false);

const handleScroll = () => {
  if (window.scrollY > 200) {
    navWhite.value = true;
  } else {
    navWhite.value = false;
  }
};

onMounted(async () => {
  await nextTick();

  if (navDeskEl.value && navMobEl.value) {
    document.body.style.setProperty(
      "--nav-desktop-height",
      `${navDeskEl.value?.offsetHeight / 16}rem`,
    );

    document.body.style.setProperty(
      "--nav-mobile-height",
      `${navMobEl.value?.offsetHeight / 16}rem`,
    );
  }

  const tl = $gsap.timeline();

  tl.from(navRef.value, {
    y: -100,
    opacity: 0,
    delay: 1,
  });

  add(tl);

  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  cleanup();
});
</script>

<template>
  <nav id="navbar" ref="navRef" :class="navWhite ? 'nav-white' : ''">
    <!-- <WGImg image="/svg/logo.svg" alt="FCI-logo"/> -->
    <div class="nav container nav-desktop" ref="navDeskEl">
      <NuxtLink to="/" class="logo">
        <Transition name="alt">
          <img
            v-if="navWhite"
            src="/svg/logo-dark.svg"
            alt="FCI-logo"
            class="alt-logo"
          />
        </Transition>
        <img
          v-if="route.path === '/'"
          src="/svg/logo.svg"
          alt="FCI-logo"
          class="main-logo"
        />
        <img v-else src="/svg/logo-dark.svg" alt="FCI-logo" class="main-logo" />
      </NuxtLink>

      <div class="btn-wrapper">
        <Transition name="alt">
          <button
            v-if="navWhite"
            class="base-btn altBtn"
            @click="handleOpenMenu"
          >
            <span data-content="Menu">Menu</span>
          </button>
        </Transition>
        <button
          class="mainBtn"
          :class="route.path === '/' ? 'primary-btn' : 'base-btn'"
          @click="handleOpenMenu"
        >
          <span data-content="Menu">Menu</span>
        </button>
      </div>
    </div>

    <div class="nav container nav-mobile" ref="navMobEl">
      <NuxtLink to="/" class="logo">
        <Transition name="alt">
          <img
            v-if="navWhite"
            src="/svg/logo-dark.svg"
            alt="FCI-logo"
            class="alt-logo"
          />
        </Transition>
        <img
          v-if="route.path === '/'"
          src="/svg/logo.svg"
          alt="FCI-logo"
          class="main-logo" />
        <img v-else src="/svg/logo-dark.svg" alt="FCI-logo" class="main-logo"
      /></NuxtLink>

      <svg
        @click="isMenuOpen = !isMenuOpen"
        :style="route.path === '/' && { mixBlendMode: 'difference' }"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 14H28"
          :stroke="route.path === '/' ? '#ffffff' : '#04312a'"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 20H28"
          :stroke="route.path === '/' ? '#ffffff' : '#04312a'"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 26H28"
          :stroke="route.path === '/' ? '#ffffff' : '#04312a'"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </nav>
  <!-- Desktop Menu -->
  <Transition name="menu">
    <div class="menu-wrapper" v-if="isMenuOpen">
      <NavMenu @close="handleMenuClose" />
    </div>
  </Transition>
</template>

<style scoped lang="scss">
#navbar {
  width: 100%;
  height: auto;
  background-color: transparent;
  position: fixed;
  z-index: 999;

  .nav-desktop,
  .nav-mobile {
    position: relative;

    .logo {
      overflow: hidden;
      .alt-logo {
        position: absolute;
        top: 0;
        transition: all 0.45s ease;
      }
      .main-logo {
        transition: all 0.45s ease;
      }
    }

    .btn-wrapper {
      overflow: hidden;
      position: relative;

      .altBtn {
        position: absolute;
        top: 0%;
        transition: all 0.45s ease;
      }
      .mainBtn {
        transition: all 0.45s ease;
      }
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgb(255, 255, 255);
      transition: all 0.45s ease;
      clip-path: inset(0% 0% 100% 0);
      border-bottom: 1px solid $light;
      z-index: -2;
    }
  }

  &.nav-white {
    .nav-desktop,
    .nav-mobile {
      .logo {
        .main-logo {
          transform: translateY(100%);
        }
      }

      .btn-wrapper {
        .mainBtn {
          transform: translateY(100%);
        }
      }
      &::after {
        clip-path: inset(0% 0% 0% 0);
      }
    }
  }
}
.nav {
  width: 100%;
  padding-block: 1.88rem;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  @include flex(space-between, center);

  .logo {
    position: relative;
    @include clamp-property("width", 6.8, 10);
    @include flex(center, center);
    // mix-blend-mode: difference;

    img {
      width: 100%;
    }
  }
}

.nav-desktop {
  display: none;
}

.nav-mobile {
  display: flex;
}

@media (min-width: 768px) {
  .nav-desktop {
    display: flex;
  }

  .nav-mobile {
    display: none;
  }
}

// Menu
.menu-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100svh;
}

.menu-enter-active,
.menu-leave-active,
.alt-enter-active,
.alt-leave-active {
  transition: all 0.45s ease;
}

.menu-enter-from,
.menu-leave-to {
  transform: translateX(-100%);
}

.alt-enter-from,
.alt-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
