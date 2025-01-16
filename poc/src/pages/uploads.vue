<template>
  <div class="main-content position-relative max-height-vh-100 h-100">
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-md-4">
          <div class="card card-profile">
            <img :src="'/assets/img/user/' + myData?.bg" alt="Image placeholder" class="card-img-top">
            <div class="row justify-content-center">
              <div class="col-4 col-lg-4 order-lg-2">
                <div class="mt-n4 mt-lg-n6 mb-4 mb-lg-0">
                  <a href="javascript:;">
                    <img style="width: 450px;" :src="'/assets/img/user/' + myData?.image"
                      class="rounded-circle img-fluid border border-2 border-white">
                  </a>
                </div>
              </div>
            </div>

            <div class="card-body pt-0">
              <div class="row">
                <div class="col">
                  <div class="d-flex justify-content-center">
                    <div class="d-grid text-center">
                      <span class="text-lg font-weight-bolder">{{ myData?.photos }}</span>
                      <span class="text-sm opacity-8">Fotos</span>
                    </div>
                    <div class="d-grid text-center mx-2">
                      <span class="text-lg font-weight-bolder">{{ myData?.videos }}</span>
                      <span class="text-sm opacity-8">Videos</span>
                    </div>
                    <div class="d-grid text-center mx-2">
                      <span class="text-lg font-weight-bolder">{{ myData?.music }}</span>
                      <span class="text-sm opacity-8">Audio</span>
                    </div>
                    <div class="d-grid text-center mx-2">
                      <span class="text-lg font-weight-bolder">{{ myData?.volume }} MB</span>
                      <span class="text-sm opacity-8">Speicherplatz</span>
                    </div>
                    <div class="d-grid text-center">
                      <span class="text-lg font-weight-bolder">{{ myData?.used }} MB</span>
                      <span class="text-sm opacity-8">Bereits verwendet</span>
                    </div>

                  </div>
                </div>
              </div>
              <div class="text-center mt-4">
                <h5>
                  {{ myData?.name }}<span class="font-weight-light"></span>
                </h5>
                <div class="h6 font-weight-300">
                  <i class="ni location_pin mr-2"></i>{{ myData?.job }}
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card">
            <div class="card-header pb-0">
            </div>
            <div class="card-body" v-if="myData?.expired">
              <p class="text-uppercase text-danger text-lg font-weight-bold">Ihr Zugriff ist abgelaufen</p>
            </div>
            <div class="card-body" v-if="!myData?.expired">
              <p class="text-uppercase text-lg font-weight-bold"> Verbleibendes Guthaben: {{ credit }} MB</p>
              <p class="text-uppercase text-sm font-weight-bold" v-if="credit == 0"> Ihr Guthaben ist aufgebraucht</p>

              <div class="row">
                <div class="card">
                  <div>
                    <!-- Tägliche Statistik -->
                    <div v-if="totalFilesCompressedToday > 0" class="h6 font-weight-300">
                      Heute {{ totalFilesCompressedToday }} Dateien ({{ totalSizeCompressedToday }} MB) komprimiert
                    </div>

                    <div v-if="credit > 0" id="my-dropzone" class="dropzone" v-show="!compressing"></div>
                    <div v-if="uploading" class="uploading">
                      <p>Hochladen: {{ currentFileName }}...</p>
                    </div>
                    <div v-if="uploadedFiles?.length" class="uploaded-files">

                      <div class="row justify-content-center">
                        <div class="col-auto">
                          <button @click="compressFiles" :disabled="!canCompress" class="btn btn-sm btn-primary">Auswahl
                            komprimieren</button>
                        </div>

                      </div>

                      <p class="text-uppercase">Hochgeladene Dateien:</p>

                      <div class="progress-wrapper" v-if="compressing">
                        <div class="progress-info">
                          <div class="progress-label" v-if="progress==100">
                            <span>Komprimierung abgeschlossen</span>
                          </div>
                          <div class="progress-percentage">
                            <span>{{ progress }}%</span>
                          </div>
                        </div>
                        <div class="progress">
                          <div class="progress-bar bg-success" role="progressbar" aria-valuenow="0" aria-valuemin="0"
                            aria-valuemax="100" :style="{ width: `${progress}%` }"></div>
                        </div>
                      </div>

                      <div class="card mb-4">
                        <div class="card-body px-0 pt-0 pb-2">
                          <div class="table-responsive p-0">
                            <table class="table align-items-center justify-content-center mb-0">
                              <thead>
                                <tr>
                                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                    Dateiname</th>
                                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                    Größe</th>
                                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                    Status</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="file in uploadedFiles" :key="file.name">
                                  <td>
                                    <div class="d-flex px-2">
                                      <div class="my-auto">
                                        <h6 class="mb-0 text-sm">{{ file.name }}</h6>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <p class="text-sm font-weight-bold mb-0"> {{ file.size }}</p>
                                  </td>
                                  <td>
                                    <span class="badge badge-sm bg-gradient-success" v-if="file.status=='Fertig'">{{ file.status }}</span>
                                    <span class="badge badge-sm bg-gradient-secondary" v-if="file.status=='Hochgeladen'">{{ file.status }}</span>
                                    <span class="badge badge-sm bg-gradient-warning" v-if="!(file.status=='Hochgeladen' || file.status=='Fertig')">{{ file.status }}</span>
                                  </td>
                                  <td class="align-middle">
                                    <button @click="removeFile(file)" v-if="file.status == 'Hochgeladen'"
                                      class="btn btn-sm btn-danger">
                                      <i class="fa-solid fa-xmark"></i>
                                    </button>
                                  </td>
                                </tr>

                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      <div class="row justify-content-center">
                        <div class="col-auto">
                          <button @click="compressFiles" :disabled="!canCompress" class="btn btn-sm btn-primary">Auswahl
                            komprimieren</button>

                        </div>

                      </div>

                    </div>

                    <!-- Popup für Guthaben-Meldung -->
                    <div v-if="showCreditPopup" class="popup card">
                      <div class="popup-content card-body">
                        <p v-html="insufficientCreditMessage"></p>
                        <button @click="closeCreditPopup" class="btn btn-lg btn-primary">OK</button>
                      </div>
                    </div>

                    <!-- Popup für die Meldung -->
                    <div v-if="showPopup" class="popup card">
                      <div class="popup-content card-body">
                        <p>{{ compressedFilesCount }} Dateien mit einer Gesamtgröße von {{ totalCompressedSize }} MB
                          wurden komprimiert.</p>
                        <button @click="closePopup" class="btn btn-sm btn-primary">OK</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>

      </div>
      <footer class="footer pt-3  ">
      </footer>
    </div>
  </div>
</template>


<script setup>

import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Dropzone from 'dropzone'
import 'dropzone/dist/dropzone.css'

const router = useRouter()
const route = useRoute()
const myData = useState('myData')


if (myData?.value == undefined) {
  router.push('/login')
}

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
const insufficientCreditMessage = ref('')

const credit = await computed(() => {
  console.log('myData', myData.value, myData.value.volume - myData.value.used)
  return myData.value.volume - myData.value.used
})

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

  function bytesToMB(bytes) { return (bytes / (1024 * 1024)).toFixed(1); }

  dropzoneInstance.on('success', (file, response) => {
    uploading.value = false
    const fileSizeMB = bytesToMB(file.size) // Konvertiert Byte in aufgerundete MB
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

function getFileType(fileName) {
  const videoExtensions = ['mp4', 'avi', 'mov', 'mkv', 'flv', 'wmv', 'webm'];
  const audioExtensions = ['mp3', 'wav', 'aac', 'flac', 'ogg', 'wma', 'm4a'];
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];

  const fileExtension = fileName.split('.').pop().toLowerCase();

  if (videoExtensions.includes(fileExtension)) {
    return 'video';
  } else if (audioExtensions.includes(fileExtension)) {
    return 'audio';
  } else if (imageExtensions.includes(fileExtension)) {
    return 'image';
  } else {
    return 'unknown';
  }
}

async function compressFiles() {
  const totalFileSize = uploadedFiles.value.reduce((acc, file) => acc + Math.ceil(parseFloat(file.size)), 0)
  if (totalFileSize > credit.value) {
    insufficientCreditMessage.value = `Sie haben ${uploadedFiles.value.length} Datei(en) mit einer Gesamtgröße von ${totalFileSize} MB ausgewählt.<br>Ihr Guthaben von ${credit.value} MB wurde um ${(totalFileSize - credit.value)} MB überschritten.`
    showCreditPopup.value = true
    return
  }

  compressing.value = true
  let processedFiles = 0
  let totalSize = 0

  for (let file of uploadedFiles.value) {
    file.status = 'Wird komprimiert'
    console.log('compress file', file);
    await new Promise(resolve => setTimeout(resolve, 1000)) // 10 Sekunden Verzögerung simulieren
    file.status = 'Fertig'
    processedFiles++
    totalSize += Math.ceil(parseFloat(file.size))
    progress.value = ((processedFiles / uploadedFiles.value.length) * 100).toFixed(0)
    const fileType = getFileType(file.name);
    console.log(`Die Datei ${file.name} ist vom Typ: ${fileType}`); // Ausgabe: "Die Datei example.mp4 ist vom Typ: video"

    if (fileType == 'video') {
      myData.value.videos++
    }

    if (fileType == 'image') {
      myData.value.photos++
    }
    if (fileType == 'audio') {
      myData.value.music++
    }

  }


  compressedFilesCount.value = processedFiles
  totalCompressedSize.value = totalSize
  totalFilesCompressedToday.value += processedFiles
  totalSizeCompressedToday.value = Math.ceil(parseFloat(totalSizeCompressedToday.value) + totalSize)
  myData.value.used += totalSize

  progress.value = 0
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
    insufficientCreditMessage.value = `Sie haben ${uploadedFiles.value.length} Datei(en) mit einer Gesamtgröße von ${totalFileSize} MB ausgewählt.<br>Ihr Guthaben von ${credit.value} MB wurde um ${(totalFileSize - credit.value)} MB überschritten.`
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