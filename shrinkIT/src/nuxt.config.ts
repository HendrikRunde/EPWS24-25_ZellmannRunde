import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: false,

  
  plugins: [
    { src: '~/plugins/firebase.js', mode: 'client' },
    { src: '~/plugins/dropzone.js', mode: 'client' }
  ],

  modules: [],

  nitro: {
    preset: 'node-server',
  },

  compatibilityDate: '2025-01-14',
})