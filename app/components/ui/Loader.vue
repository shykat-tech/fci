<script setup lang="ts"></script>

<template>
  <div class="loader">
    <div class="gradient"></div>

    <div class="content">
      <img src="/svg/logo-dark.svg" alt="dark-logo" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.loader {
  width: 100%;
  height: 100vh;
  position: relative;

  .content {
    position: relative;
    z-index: 1;
    @include flex(center, center, column);
    width: 100%;
    height: 100%;

    .loader-icon {
      animation: spin 1.8s ease-in-out infinite;
    }
  }

  .gradient {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    z-index: 0;
    background: url("~/assets/images/testimonials-bg.png") center/cover
      no-repeat;
    opacity: 0.5;
    pointer-events: none;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
