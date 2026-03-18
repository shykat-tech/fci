<script setup lang="ts">
import { ref } from "vue";

const { pageData } = defineProps({
  pageData: {
    type: Object,
    required: true,
  },
});

const pageRef = ref(null);

/* Import blocks */
import { Header, Business } from "~/components/blocks/contact";

/* Map wagtail block types to components */
const componentLookup: Record<string, any> = {
  header: Header,
  business: Business,
};

/* Resolve correct component */
const resolveComponent = (type: string) => {
  return componentLookup[type] || null;
};
</script>

<template>
  <div ref="pageRef" :key="pageData.id + pageData.meta.slug">
    <NuxtLazyHydrate
      v-for="block in pageData.body"
      :key="block.id"
      when-visible
    >
      <component
        v-if="resolveComponent(block.type)"
        :is="resolveComponent(block.type)"
        :id="'comp-' + block.id"
        :compData="block.value"
        :compId="block.id"
      />
    </NuxtLazyHydrate>
  </div>
</template>
