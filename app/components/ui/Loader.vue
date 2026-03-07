<script setup lang="ts">

</script>

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
    width: 180px;
    height: 180px;
    z-index: 0;
    border-radius: 50%;
    background: $shade-2;
    opacity: 0.5;
    filter: blur(80px);
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
