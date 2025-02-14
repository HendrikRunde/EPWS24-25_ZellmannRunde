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
      <div class="col-xl-8 col-lg-10 col-md-12 mx-auto">
        <div class="card z-index-0">
          <div class="card-body">
            <form @submit.prevent="handleRegistration">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <input type="text" id="firstname" class="form-control" placeholder="Vorname *" aria-label="Vorname" v-model="firstname"
                      required>
                  </div>
                  <div class="mb-3">
                    <input type="text" id="lastname" class="form-control" placeholder="Nachname *" aria-label="Nachname" v-model="lastname"
                      required>
                  </div>
                  <div class="mb-3">
                    <input type="email" id="email" class="form-control" placeholder="Email *" aria-label="Email" v-model="email" @input="validateEmail" autocomplete="off" required>
                    <p v-if="emailError" class="text-danger">{{ emailError }}</p>
                  </div>
                  <div class="mb-3">
                    <input type="password" id="password" class="form-control" placeholder="Passwort *" aria-label="Passwort" autocomplete="new-password"
                      v-model="password" required>
                  </div>
                  <div class="mb-3">
                    <input type="text" id="profession" class="form-control" placeholder="Beruf" aria-label="Beruf" v-model="profession">
                  </div>
                  <div class="mb-3">
                    <input type="text" id="company" class="form-control" placeholder="Firma" aria-label="Firma" v-model="company">
                  </div>                  
                </div>
                <div class="col-md-6">

                  <div class="mb-3">
                    <label for="profilePicture">Profilbild</label>
                    <input type="file" id="profilePicture" class="form-control" @change="handleFileUpload">
                  </div>
                  <div class="mb-3" v-if="profilePictureUrl">
                    <img :src="profilePictureUrl" alt="Profile Picture Preview" style="max-height: 150px;" class="img-thumbnail" />
                  </div>
                  <div class="mb-3">
                    <label for="background">Hintergrund</label>
                    <select id="background" class="form-control dropdown" v-model="selectedBackground">
                      <option value="">Kein</option>
                      <option value="/assets/img/user/bg1.jpg">Hintergrund1 (Designer)</option>
                      <option value="/assets/img/user/bg2.jpg">Hintergrund2 (Podcaster)</option>
                    </select>
                  </div>
                  <div class="mb-3" v-if="selectedBackground">
                    <img :src="selectedBackground" alt="Background Preview" style="max-height: 150px;" class="img-thumbnail" />
                  </div>
                </div>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary w-100 my-4 mb-2" :disabled="!isFormValid">Registrieren</button>
              </div>
              <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
              <p v-if="!isFormValid" class="text-danger">Bitte füllen Sie alle Pflichtfelder aus.</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// Reaktive Daten
const email = ref('')
const firstname = ref('')
const lastname = ref('')
const profession = ref('')
const company = ref('')
const password = ref('')
const errorMessage = ref('')
const profilePicture = ref<File | null>(null)
const profilePictureUrl = ref<string | null>(null)
const selectedBackground = ref<string | null>(null)
const emailError = ref<string | null>(null)

// Berechnete Eigenschaft, um den Status des Buttons zu steuern
const isFormValid = computed(() => {
  return firstname.value && lastname.value && email.value && password.value && !emailError.value
})

// Router-Instanz
const router = useRouter()

// Funktion zur Validierung der E-Mail-Adresse
const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email.value)) {
    emailError.value = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
  } else {
    emailError.value = null
  }
}

// Funktion zum Umgang mit der Anmeldung
const handleRegistration = async () => {
  try {
    let profilePictureUrl = ''

    if (profilePicture.value) {
      const formData = new FormData()
      formData.append('profilePicture', profilePicture.value)

      const uploadResponse = await useFetch('/api/upload-profile-picture', {
        method: 'POST',
        body: formData
      })

      if (uploadResponse.data.value && uploadResponse.data.value.success) {
        if ('filePath' in uploadResponse.data.value) {
          profilePictureUrl = uploadResponse.data.value.filePath
        }
      } else {
        errorMessage.value = 'Fehler beim Hochladen des Profilbildes: ' + (uploadResponse.data.value && 'error' in uploadResponse.data.value ? uploadResponse.data.value.error : 'Unbekannter Fehler')
        return
      }
    }

    const response = await useFetch('/api/register-user', {
      method: 'POST',
      body: {
        email: email.value,
        firstname: firstname.value,
        lastname: lastname.value,
        profession: profession.value,
        company: company.value,
        password: password.value,
        profilePicture: profilePictureUrl,
        background: selectedBackground.value,
        link: '',
        validUntil: '',
        volume: 0,
        used: 0,
        videos: 0,
        photos: 0,
        audios: 0
      }
    })

    if (response.data.value && response.data.value.success) {
      router.push('/success') // Redirect to a success page
    } else {
      errorMessage.value = 'Fehler bei der Registrierung: ' + (response.data.value && 'error' in response.data.value ? response.data.value.error : 'Unbekannter Fehler')
    }
  } catch (error) {
    errorMessage.value = 'Fehler bei der Registrierung: ' + (error as any).message
  }
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    profilePicture.value = target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      profilePictureUrl.value = e.target?.result as string
    }
    reader.readAsDataURL(target.files[0])
  }
}

// Meta-Daten für die Seite definieren
definePageMeta({
  layout: 'speziell'
})
</script>

<style>
.error {
  color: red;
}

main .bg-dark {
  background-color: transparent !important;
}

.dropdown {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 8px 10px;
}

.dropdown:focus {
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
</style>