<template>
  <div>
    <div v-if="error">Something went wrong!</div>
    <div v-if="pageData" class="page-container" :key="'page' + pageData.id">
      <component
        :is="resolveComponent(pageType)"
        :pageData="pageData"
        :key="'page' + pageData.id"
      />
    </div>
  </div>
</template>

<script setup>
// composable
const route = useRoute();
const apiFetchConfig = useBackendAPI();

// get page url (remove query params and hash)
const pageUrl = route.fullPath.split("?")[0].split("#")[0];

// fetch data
const { data, error } = await useAsyncData(
  pageUrl,
  () =>
    // $fetch(
    //   `/api/v2/pages/find/?format=json&redirect=false&html_path=${pageUrl}`,
    //   apiFetchConfig,
    // ),
  $fetch("/home.json"),
);

const pageData = data?.value || null;
const pageType = pageData?.meta.type.split(".")[1];
</script>
