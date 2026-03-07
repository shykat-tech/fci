<script setup lang="ts">
const loading = useLoader();
const nuxtApp = useNuxtApp();

nuxtApp.hook("app:mounted", () => {
  loading.value = false;
});
</script>

<template>
  <div>
    <Loader v-if="loading" />
    <div v-else>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>
