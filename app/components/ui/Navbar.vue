<script setup lang="ts"></script>

<template>
  <nav id="navbar">
    <!-- <WGImg image="/svg/logo.svg" alt="FCI-logo"/> -->
    <div class="nav container nav-desktop">
      <img src="/svg/logo-desktop.svg" alt="FCI-logo" />

      <button class="menu-btn">Menu</button>
    </div>

    <div class="nav container nav-mobile">
      <img src="/svg/logo.svg" alt="FCI-logo" />
      <svg
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
  z-index: 99999;
  top: 0;
  left: 0;
  @include flex(space-between, center);
}

.nav-desktop {
  display: none;

  .menu-btn {
    font-family: $montserrat;
    color: $light;
    font-size: 1rem;
    font-weight: 600;
    line-height: normal;
    padding-block: 1rem;
    padding-inline: 2rem;
    border-radius: 6.1875rem;
    border: 1px solid $light-50;
    background-color: transparent;
  }
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
</style>
