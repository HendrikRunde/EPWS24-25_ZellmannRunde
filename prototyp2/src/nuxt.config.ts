// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  nitro: {
    serveStatic: true, // Statische Dateien bereitstellen
    publicAssets: [{ dir: 'uploads', maxAge: 60 * 60 * 24 * 30 }], // /uploads/ verfügbar machen
  },

  compatibilityDate: '2025-02-12',

  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'http://localhost:3000', // Standard für lokale Entwicklung
    }
  }
});
