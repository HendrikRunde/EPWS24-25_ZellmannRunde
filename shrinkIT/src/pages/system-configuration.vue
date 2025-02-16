<template>
    <div class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
        style="background-image: url('/assets/img/background.webp'); background-position: top;">
        <span class="mask bg-gradient-dark opacity-6"></span>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-5 text-center mx-auto">
                    <h1 class="text-white mb-2 mt-5">System Konfiguration</h1>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
            <div class="col-xl-8 col-lg-10 col-md-12 mx-auto">
                <div class="card z-index-0">
                    <div class="card-body text-center">
                        <div>
                            <label for="maxVolume">Max. Speicherplatz pro Benutzer:</label>
                            <div class="mb-3 d-flex align-items-center justify-content-center">
                                <input id="maxVolume" class="form-control input-small" type="number" v-model.number="config.maxVolume"
                                    placeholder="Enter max volume">
                                <span class="ms-2">MB</span>
                            </div>
                            <div>
                                <span v-if="errors.maxVolume" class="text-danger">{{ errors.maxVolume }}</span>
                            </div>
                        </div>

                        <div>
                            <label for="photoQuality">Bildqualität:</label>
                            <div class="mb-3 d-flex align-items-center justify-content-center">
                                <input id="photoQuality" class="form-control input-small" type="number" v-model.number="config.photoQuality"
                                    placeholder="Enter photo quality">
                                <span class="ms-2">%</span>
                            </div>
                            <span v-if="errors.photoQuality" class="text-danger">{{ errors.photoQuality }}</span>
                        </div>

                        <div>
                            <label for="videoQuality">Videoqualität:</label>
                            <div class="mb-3 d-flex align-items-center justify-content-center">
                                <input id="videoQuality" class="form-control input-small" type="number" v-model.number="config.videoQuality"
                                    placeholder="Enter video quality">
                                <span class="ms-2">%</span>
                            </div>
                            <div>
                                <span v-if="errors.videoQuality" class="text-danger">{{ errors.videoQuality }}</span>
                            </div>
                        </div>

                        <div>
                            <label for="audioQuality">Audioqualität:</label>
                            <div class="mb-3 d-flex align-items-center justify-content-center">
                                <input id="audioQuality" class="form-control input-small" type="number" v-model.number="config.audioQuality"
                                    placeholder="Enter audio quality">
                                <span class="ms-2">%</span>
                            </div>
                            <div>
                                <span v-if="errors.audioQuality" class="text-danger">{{ errors.audioQuality }}</span>
                            </div>
                        </div>


                        <div class="text-center">
                            <button @click="goback" class="btn btn-secondary me-2">Zurück</button>
                            <button @click="writeConfig" class="btn btn-primary">Speichern</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useFetch, useRouter } from '#app'

definePageMeta({
    layout: 'speziell'
})

// Reaktive Referenzen definieren
const config = ref({
    maxVolume: '',
    videoQuality: '',
    audioQuality: '',
    photoQuality: ''
})

const readConfig = ref({
    maxVolume: '',
    videoQuality: '',
    audioQuality: '',
    photoQuality: ''
})

const errors = ref({
    maxVolume: '',
    videoQuality: '',
    audioQuality: '',
    photoQuality: ''
})

const router = useRouter()

// Funktion zum Schreiben der Konfigurationsdaten in die Firebase-Datenbank über die API
async function writeConfig() {
    // Validierung
    errors.value = {
        maxVolume: '',
        videoQuality: '',
        audioQuality: '',
        photoQuality: ''
    }

    let isValid = true

    if (!config.value.maxVolume || config.value.maxVolume <= 0) {
        errors.value.maxVolume = 'Max. Speicherplatz muss größer als 0 sein.'
        isValid = false
    }

    if (!config.value.videoQuality || config.value.videoQuality <= 0 || config.value.videoQuality > 100) {
        errors.value.videoQuality = 'Video-Qualität muss zwischen 1 und 100 liegen.'
        isValid = false
    }

    if (!config.value.audioQuality || config.value.audioQuality <= 0 || config.value.audioQuality > 100) {
        errors.value.audioQuality = 'Audio-Qualität muss zwischen 1 und 100 liegen.'
        isValid = false
    }

    if (!config.value.photoQuality || config.value.photoQuality <= 0 || config.value.photoQuality > 100) {
        errors.value.photoQuality = 'Foto-Qualität muss zwischen 1 und 100 liegen.'
        isValid = false
    }

    if (!isValid) {
        return
    }

    const { data, error } = await useFetch('/api/set-system-configuration', {
        method: 'POST',
        body: config.value
    })

    if (data.value && data.value.success) {
        console.log('Configuration written successfully')
        goback()
    } else {
        console.error('Fehler beim Speichern der Konfiguration:', error.value)
    }
}

function goback() {
    router.push('/cm-dashboard')
}   

// Funktion zum Lesen der Konfigurationsdaten aus der API
async function fetchConfig() {
    const { data, error } = await useFetch('/api/get-system-configuration')
    if (data.value && data.value.success) {
        readConfig.value = data.value.config
        config.value = { ...data.value.config } // Setze die aktuellen Werte in die Eingabefelder
    } else {
        console.error('Fehler beim Abrufen der Konfiguration:', error.value)
        readConfig.value = {
            maxVolume: 'Keine Daten verfügbar',
            videoQuality: 'Keine Daten verfügbar',
            audioQuality: 'Keine Daten verfügbar',
            photoQuality: 'Keine Daten verfügbar'
        }
    }
}

// Daten abrufen, wenn die Komponente gemountet wird
onMounted(() => {
    fetchConfig()
})
</script>

<style scoped>
.text-danger {
    color: red;
}

.input-small {
    width: 100px;
}

.d-flex {
    display: flex;
    align-items: center;
}

.ms-2 {
    margin-left: 0.5rem;
}

.me-2 {
    margin-right: 0.5rem;
}

main .bg-dark {
    background-color: transparent !important;
}
</style>