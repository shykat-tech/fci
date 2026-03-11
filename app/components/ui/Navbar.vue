<script setup lang="ts">
const isMenuOpen = ref(false);

const handleOpenMenu = () => {
  isMenuOpen.value = true;
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed"; // prevent scroll jump
  document.body.style.width = "100%"; // prevent layout shift
};

const handleMenuClose = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.width = "";
};
</script>

<template>
  <nav id="navbar">
    <!-- <WGImg image="/svg/logo.svg" alt="FCI-logo"/> -->
    <div class="nav container nav-desktop">
      <img src="/svg/logo-desktop.svg" alt="FCI-logo" />

      <button class="primary-btn" @click="handleOpenMenu">
        <span data-content="Menu">Menu</span>
      </button>
    </div>

    <div class="nav container nav-mobile">
      <img src="/svg/logo.svg" alt="FCI-logo" />
      <svg
        @click="isMenuOpen = !isMenuOpen"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 14H28"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 20H28"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 26H28"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <!-- Desktop Menu -->
    <Transition name="menu">
      <div class="menu-wrapper" v-if="isMenuOpen">
        <NavMenu @close="handleMenuClose" />
      </div>
    </Transition>
  </nav>
</template>

<style scoped lang="scss">
#navbar {
  background-color: transparent;
  position: relative;
  z-index: 99999;
}
.nav {
  width: 100%;
  padding-block: 1.88rem;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  @include flex(space-between, center);
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
.menu-leave-active {
  transition: transform 0.5s ease;
}

.menu-enter-from,
.menu-leave-to {
  transform: translateX(-100%);
}
</style>
