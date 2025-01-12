import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  plugins: [
    { src: '~/plugins/firebase.js', mode: 'client' },
  ],
  modules: [],
  nitro: {
    preset: 'node-server',
  },
})
