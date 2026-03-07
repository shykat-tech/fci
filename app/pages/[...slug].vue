<template>
  <div
    v-if="pageData"
    class="page-container"
    :key="'page' + (pageData ? pageData.id : 'none')"
  >
    <component
      v-if="pageData"
      :key="'page' + (pageData ? pageData.id : 'none')"
      :is="resolveComponent(pageType)"
      :pageData="pageData"
    />
  </div>
</template>

<script setup>
// composable
const route = useRoute();
// const apiFetchConfig = useBackendAPI();

// get page url (remove query params and hash)
const pageUrl = route.fullPath.split("?")[0].split("#")[0];

// fetch data
// const { data, error } = await useAsyncData(pageUrl, () =>
//   $fetch(
//     `/api/v2/pages/find/?format=json&redirect=false&html_path=${pageUrl}`,
//     apiFetchConfig,
//   ),
// );

/**Commenting down this part as the backend is not ready yet.. when the backend will be ready we will uncomment this and work with real api response right now will work with mock data */

const pageData = {
  id: "1",
  meta: {
    type: "page.HomePage",
    // type: "page.AboutPage", // for testing about page - uncomment this and comment the above line
    slug: "home",
  },
  title: "Home",
  body: [
    {
      id: "1",
      type: "hero",
      value: {
        title: "Welcome to our website",
        description: "We are glad to have you here.",
      },
    },
    {
      id: "2",
      type: "whatwedo",
      value: {
        content: "This is a sample page content.",
      },
    },
  ],
};

// const pageData = data.value?.data || null;
const pageType = pageData?.meta.type.split(".")[1];
</script>
