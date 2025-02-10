<template>
  <div class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg" 
  style="background-image: url('/assets/img/background.webp'); background-position: top;">
    <span class="mask bg-gradient-dark opacity-6"></span>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-5 text-center mx-auto">
          <h1 class="text-white mb-2 mt-5">Willkommen bei shrinkIT!</h1>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
      <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
        <div class="card z-index-0">
          <div class="card-body">
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <input type="email" class="form-control" placeholder="Email" aria-label="Email" v-model="email" required>
              </div>
              <div class="mb-3">
                <input type="password" class="form-control" placeholder="Passwort" aria-label="Passwort" v-model="password" required>
              </div>
              <div class="text-center">
                <button type="submit" class="btn bg-gradient-dark w-100 my-4 mb-2">Login</button>
              </div>
              <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Reaktive Daten
const email = ref('')
const password = ref('')
const errorMessage = ref('')

// Router-Instanz
const router = useRouter()

// Funktion zum Umgang mit der Anmeldung
const handleLogin = () => {
  if (email.value === 'cm@shrinkit.com' && password.value === 'demo') {
    // Erfolgreiche Anmeldung, Weiterleitung zum Admin-Dashboard
    router.push('/cm-dashboard')
  } else {
    // Fehlerhafte Anmeldedaten, Anzeige einer Fehlermeldung
    errorMessage.value = 'Ungültige Anmeldedaten. Bitte versuchen Sie es erneut.'
  }
}

// Meta-Daten für die Seite definieren
definePageMeta({
  layout: 'speziell'
})
</script>

<style scoped>
.error {
  color: red;
}
</style>
