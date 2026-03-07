// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  
  pages: true,
  app: {
    head: {
      title: "Base",

      htmlAttrs: {
        lang: "en",
      },
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0",
        },
        {
          charset: "utf-8",
        },
        { name: "title", content: "Base" },
      ],
      bodyAttrs: {
        class: "preload",
      },
    },
  },

  css: [
    "~/assets/styles/main.scss",
    "locomotive-scroll/dist/locomotive-scroll.css",
  ],

  build: {
    transpile: ["gsap"],
  },

  devServer: {
    host: "0.0.0.0", // expose to network
    port: 3000,
  },

  components: {
    dirs: [
      {
        path: "~/components/pages",
        global: true,
      },
      {
        path: "~/components/blocks",
        global: true,
      },
      {
        path: "~/components/ui",
        global: true,
      },
      {
        path: "~/components/dashboard",
        global: true,
      },
      "~/components",
    ],
  },

  runtimeConfig: {
    apiBase: process.env.VUE_APP_DEVHOST || "",
    public: {
      apiBase: process.env.VUE_APP_DEVHOST || "",
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            ' @use "@/assets/styles/_variable.scss" as *; @use "@/assets/styles/_mixins.scss" as *; @use "@/assets/styles/_fonts.scss" as *; ',
        },
      },
    },
  },
});
