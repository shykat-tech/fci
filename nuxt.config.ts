// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },

  pages: true,
  app: {
    head: {
      title: "FCI",

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
    // for wagtail cms api
    apiBase: process.env.NUXT_API_BASE || "http://localhost:8000",
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:8000",
      staticHost:
        process.env.NUXT_PUBLIC_STATIC_HOST || "http://localhost:8000",
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
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
