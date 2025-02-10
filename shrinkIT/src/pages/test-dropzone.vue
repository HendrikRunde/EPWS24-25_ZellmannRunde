<template>
  <div>
    <!-- Tägliche Statistik -->
    <div v-if="totalFilesCompressedToday > 0" class="daily-stats">
      Heute {{ totalFilesCompressedToday }} Dateien ({{ totalSizeCompressedToday }} MB) komprimiert
    </div>
    
    <!-- Guthaben Anzeige -->
    <div class="guthaben">
      Guthaben: {{ credit }} MB
    </div>

    <div id="my-dropzone" class="dropzone" v-show="!compressing"></div>
    <div v-if="uploading" class="uploading">
      <p>Hochladen: {{ currentFileName }}...</p>
    </div>
    <div v-if="uploadedFiles.length" class="uploaded-files">
      <h3>Hochgeladene Dateien:</h3>
      <ul>
        <li v-for="file in uploadedFiles" :key="file.name">
          {{ file.name }} - {{ file.size }} MB - <span>{{ file.status }}</span>
          <button @click="removeFile(file)" v-if="file.status=='Hochgeladen'"  class="btn btn-sm btn-danger">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </li>
      </ul>
      <button @click="compressFiles" :disabled="!canCompress" class="btn btn-sm btn-primary">Auswahl komprimieren</button>
      <div v-if="compressing" class="progress">
        <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
      </div>
    </div>

    <!-- Popup für Guthaben-Meldung -->
    <div v-if="showCreditPopup" class="popup">
      <div class="popup-content">
        <p>{{ insufficientCreditMessage }}</p>
        <button @click="closeCreditPopup" class="btn btn-lg btn-primary">OK</button>
      </div>
    </div>

    <!-- Popup für die Meldung -->
    <div v-if="showPopup" class="popup">
      <div class="popup-content">
        <p>{{ compressedFilesCount }} Dateien mit einer Gesamtgröße von {{ totalCompressedSize }} MB wurden komprimiert.</p>
        <button @click="closePopup" class="btn btn-sm btn-primary">OK</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Dropzone from 'dropzone'
import 'dropzone/dist/dropzone.css'

const uploading = ref(false)
const currentFileName = ref('')
const uploadedFiles = ref([])
const compressing = ref(false)
const progress = ref(0)
const showPopup = ref(false)
const showCreditPopup = ref(false)
const compressedFilesCount = ref(0)
const totalCompressedSize = ref(0)
const totalFilesCompressedToday = ref(0)
const totalSizeCompressedToday = ref(0)
const credit = ref(10) // Initiales Guthaben in MB
const insufficientCreditMessage = ref('')

const canCompress = computed(() => {
  const totalFileSize = uploadedFiles.value.reduce((acc, file) => acc + Math.ceil(parseFloat(file.size)), 0)
  return totalFileSize <= credit.value
})

const dropzoneOptions = {
  url: '/api/upload',
  maxFilesize: 200, // Maximal zulässige Dateigröße in MB
  addRemoveLinks: true,
}

let dropzoneInstance

onMounted(() => {
  dropzoneInstance = new Dropzone('#my-dropzone', dropzoneOptions)

  dropzoneInstance.on('addedfile', (file) => {
    uploading.value = true
    currentFileName.value = file.name
  })

  dropzoneInstance.on('success', (file, response) => {
    uploading.value = false
    const fileSizeMB = Math.ceil(file.size / 1024 / 1024) // Konvertiert Byte in aufgerundete MB
    uploadedFiles.value.push({
      name: file.name,
      size: fileSizeMB,
      dropzoneFile: file,
      status: 'Hochgeladen',
      response
    })
    updateCredit()
  })

  dropzoneInstance.on('error', (file, errorMessage) => {
    uploading.value = false
    console.error('Fehler beim Hochladen:', errorMessage)
  })

  dropzoneInstance.on('complete', () => {
    uploading.value = false
  })

  dropzoneInstance.on('removedfile', (file) => {
    uploadedFiles.value = uploadedFiles.value.filter(f => f.dropzoneFile !== file)
    updateCredit()
  })
})

async function compressFiles() {
  const totalFileSize = uploadedFiles.value.reduce((acc, file) => acc + Math.ceil(parseFloat(file.size)), 0)
  if (totalFileSize > credit.value) {
    insufficientCreditMessage.value = `Sie haben ${uploadedFiles.value.length} Dateien mit einer Gesamtgröße von ${totalFileSize} MB ausgewählt. Ihr Guthaben von ${credit.value} MB reicht nicht mehr aus. Entfernen Sie manuell einige Dateien aus der Liste.`
    showCreditPopup.value = true
    return
  }
  
  compressing.value = true
  let processedFiles = 0
  let totalSize = 0

  for (let file of uploadedFiles.value) {
    file.status = 'Wird komprimiert'
    await new Promise(resolve => setTimeout(resolve, 100)) // 10 Sekunden Verzögerung simulieren
    file.status = 'Fertig'
    processedFiles++
    totalSize += Math.ceil(parseFloat(file.size))
    progress.value = (processedFiles / uploadedFiles.value.length) * 100
  }

  compressedFilesCount.value = processedFiles
  totalCompressedSize.value = totalSize
  totalFilesCompressedToday.value += processedFiles
  totalSizeCompressedToday.value = Math.ceil(parseFloat(totalSizeCompressedToday.value) + totalSize)
  credit.value -= totalSize // Guthaben nach der Komprimierung reduzieren
  showPopup.value = true
  compressing.value = false
}

function closePopup() {
  showPopup.value = false
  uploadedFiles.value = []
   dropzoneInstance.removeAllFiles(true)
}

function closeCreditPopup() {
  showCreditPopup.value = false
}

async function removeFile(file) {
  try {
    const response = await fetch(`/api/remove?filename=${file.name}`, { method: 'DELETE' })
    const result = await response.json()
    if (response.ok) {
      uploadedFiles.value = uploadedFiles.value.filter(f => f.name !== file.name)
      // Entferne die Datei aus Dropzone
      dropzoneInstance.removeFile(file.dropzoneFile)
      updateCredit()
    } else {
      console.error(result.statusMessage)
    }
  } catch (error) {
    console.error('Fehler beim Entfernen der Datei:', error)
  }
}

function updateCredit() {
  const totalFileSize = uploadedFiles.value.reduce((acc, file) => acc + Math.ceil(parseFloat(file.size)), 0)
  const remainingCredit = 10 - totalFileSize // initial 10 MB Guthaben minus Gesamtgröße der hochgeladenen Dateien
  //credit.value = remainingCredit >= 0 ? remainingCredit : 0
  if (totalFileSize > credit.value) {
    insufficientCreditMessage.value = `Sie haben ${uploadedFiles.value.length} Dateien mit einer Gesamtgröße von ${totalFileSize} MB ausgewählt. Ihr Guthaben von ${credit.value} MB reicht nicht mehr aus. Entfernen Sie manuell einige Dateien aus der Liste.`
    showCreditPopup.value = true
  }
}
</script>


<style scoped>
.dropzone {
  border: 2px dashed #007BFF;
  padding: 20px;
}
.uploading {
  margin-top: 20px;
  font-style: italic;
}
.uploaded-files {
  margin-top: 20px;
}
.progress {
  margin-top: 20px;
  height: 20px;
  background-color: #f3f3f3;
  border-radius: 5px;
  overflow: hidden;
}
.progress-bar {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s ease-in-out;
}
.popup {
  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.popup-content {
  text-align: center;
}
.daily-stats {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}
.guthaben {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #e0e0e0;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
}
</style>
