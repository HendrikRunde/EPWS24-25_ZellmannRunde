import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // Global page headers
  ssr: false,
  app: {
    head: {
      title: "shrinkIT",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "" },
      ],
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "76x76",
          href: "/assets/img/apple-icon.png",
        },
        { rel: "icon", type: "image/png", href: "/assets/img/favicon.png" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700",
        },
        { rel: "stylesheet", href: "/assets/css/nucleo-icons.css" },
        { rel: "stylesheet", href: "/assets/css/nucleo-svg.css" },
        {
          rel: "stylesheet",
          href: "/assets/css/argon-dashboard.css?v=2.1.0",
          id: "pagestyle",
        },
      ],
    },
  },

  // Global CSS
  css: [
    "@/assets/css/nucleo-icons.css",
    "@/assets/css/nucleo-svg.css",
    "@/assets/css/argon-dashboard.css",
  ],

  // Plugins to run before rendering page
  plugins: [
    { src: "~/plugins/firebase.js", mode: "client" },
    { src: "~/plugins/dropzone.js", mode: "client" },
  ],

  // Auto import components
  components: true,

  // Modules for dev and build (recommended)
  modules: [],

  nitro: {
    preset: "node-server",
  },

  // Build Configuration
  build: {},
  compatibilityDate: "2025-01-14",
});
