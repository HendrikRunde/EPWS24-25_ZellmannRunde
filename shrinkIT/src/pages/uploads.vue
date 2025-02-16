<template>
  <div class="main-content position-relative max-height-vh-100 h-100">
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-md-4">
          <div class="card card-profile">
            <img :src="myData?.bg" alt="Image placeholder" class="card-img-top">
            <div class="row justify-content-center">
              <div class="col-4 col-lg-4 order-lg-2">
                <div class="mt-n4 mt-lg-n6 mb-4 mb-lg-0">
                  <a href="javascript:;">
                    <img style="width: 450px;" :src="myData?.image"
                      class="rounded-circle img-fluid border border-white">
                  </a>
                </div>
              </div>
            </div>

            <div class="card-body pt-0">
              <div class="row">
                <div class="col">
                  <div class="d-flex justify-content-center">
                    <!-- Display user statistics -->
                    <div class="d-grid text-center">
                      <span class="text-lg font-weight-bolder">{{ myData?.photos }}</span>
                      <span class="text-sm opacity-8">Bilder</span>
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

                <div>
                  <!-- Daily statistics -->
                  <div v-if="totalFilesCompressedToday > 0" class="h6 font-weight-300">
                    Zuletzt {{ totalFilesCompressedToday }} Dateien ({{ totalSizeCompressedToday }} MB) komprimiert
                  </div>

                  <!-- Dropzone for file uploads -->
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

                    <!-- Progress bar for compression -->
                    <div class="progress-wrapper" v-if="compressing">
                      <div class="progress-info">
                        <div class="progress-label" v-if="progress == 100">
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

                    <!-- Table of uploaded files -->
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
                                  <span class="badge badge-sm bg-gradient-success" v-if="file.status == 'Fertig'">{{
                                    file.status }}</span>
                                  <span class="badge badge-sm bg-gradient-secondary"
                                    v-if="file.status == 'Hochgeladen'">{{ file.status }}</span>
                                  <span class="badge badge-sm bg-gradient-warning"
                                    v-if="!(file.status == 'Hochgeladen' || file.status == 'Fertig')">{{ file.status
                                    }}</span>
                                </td>
                                <td class="align-middle">
                                  <button @click="removeFile(file)" v-if="file.status == 'Hochgeladen'"
                                    class="btn btn-sm btn-danger">
                                    <i class="fa-solid fa-xmark"></i>
                                  </button>
                                  <button @click="abortCompression(file)" v-if="file.status == 'Wird komprimiert'"
                                    class="btn btn-sm btn-warning">
                                    <i class="fa-solid fa-ban"></i>
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

                  <!-- Bereits komprimierte Mediendateien des Benutzers -->
                  <div class="card mb-4" style="margin-top: 30px;">
                    <div class="card-body px-0 pt-0 pb-2">
                      <div class="table-responsive p-5">
                        <p class="text-uppercase text-lg font-weight-bold"> Ihre komprimierte Mediendateien</p>

                        <table class="table align-items-center justify-content-center mb-0">
                          <thead>
                            <tr>
                              <th class="text-secondary text-s font-weight-bolder opacity-7">
                                Dateiname</th>
                              <th class="text-secondary text-s font-weight-bolder opacity-7 ps-2">
                                Originalgröße (MB)</th>
                              <th class="text-secondary text-s font-weight-bolder opacity-7 ps-2">
                                Komprimierte Größe (MB)</th>
                              <th class="text-secondary text-s font-weight-bolder opacity-7 ps-2">
                                Kompressionsrate (%)</th>
                              <th class="text-secondary text-s font-weight-bolder opacity-7 ps-2">
                                Datum</th>
                              <th></th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="file in compressedFiles" :key="file.filename">
                              <td>
                                <div class="d-flex px-2">
                                  <div class="my-auto">
                                    <h6 class="mb-0 text-sm">{{ file.filename }}</h6>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p class="text-sm font-weight-bold mb-0"> {{ (file.originalSize / (1024 * 1024)).toFixed(2) }} MB</p>
                              </td>
                              <td>
                                <p class="text-sm font-weight-bold mb-0"> {{ (file.compressedSize / (1024 * 1024)).toFixed(2) }} MB</p>
                              </td>
                              <td>
                                <p class="text-sm font-weight-bold mb-0"> {{ file.compressionRatio.toFixed(2) }} %</p>
                              </td>
                              <td>
                                <p class="text-sm font-weight-bold mb-0"> {{ formatDate(file.dateCreated) }}</p>
                              </td>
                              <td class="align-middle">
                                <a :href="`${file.path.replace(/^public/, '').replace(/\\/g, '/')}`" download
                                  class="btn btn-sm btn-outline-info" title="Herunterladen">
                                  <i class="fa-solid fa-download"></i>
                                </a>
                              </td>
                              <td class="align-middle">
                                <button @click="copyToClipboard(file.directLink)" class="btn btn-sm btn-outline-success" title="In die Zwischenablage kopieren">
                                  <i class="fa-solid fa-copy"></i>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
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

                  <!-- Popup for copied link -->
                  <PopupDialog :show="showLinkPopup" :message="copiedLinkMessage" @close="closeLinkPopup" />

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
import { initializeApp } from 'firebase/app';
import { getDatabase, ref as dbRef, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import PopupDialog from '~/components/PopupDialog.vue'

// Initialize Firebase

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
const compressedFiles = ref([])
const abortController = ref(null)
const showLinkPopup = ref(false)
const copiedLink = ref('')
const copiedLinkMessage = ref('')

const credit = await computed(() => {
  console.log('myData', myData.value, myData.value.volume - myData.value.used)
  return (myData.value.volume - myData.value.used).toFixed(2)
})

const canCompress = computed(() => {
  const totalFileSize = uploadedFiles.value.reduce((acc, file) => acc + parseFloat(file.size), 0)
  return totalFileSize <= parseFloat(credit.value)
})

const dropzoneOptions = {
  url: '/api/upload',
  maxFilesize: 200, // Maximal zulässige Dateigröße in MB
  dictDefaultMessage: "Dateien zum Hochladen hier ablegen",
  dictRemoveFile: "Datei entfernen",
  addRemoveLinks: true,
}

let dropzoneInstance

onMounted(async () => {
  dropzoneInstance = new Dropzone('#my-dropzone', dropzoneOptions)

  dropzoneInstance.on('addedfile', (file) => {
    uploading.value = true
    currentFileName.value = file.name
  })

  function bytesToMB(bytes) { return (bytes / (1024 * 1024)).toFixed(2); }

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

  // Fetch compressed files
  const { data: compressedData, error: compressedError } = await useFetch(`/api/get-compressed-files?userId=${myData.value.id}`)
  if (compressedData.value && compressedData.value.success) {
    compressedFiles.value = Object.values(compressedData.value.files)
  } else {
    console.error('Error fetching compressed files:', compressedError.value)
  }
})

// Determine the file type based on the file extension
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

// Compress the uploaded files
async function compressFiles() {
  const totalFileSize = uploadedFiles.value.reduce((acc, file) => acc + parseFloat(file.size), 0);
  if (totalFileSize > parseFloat(credit.value)) {
    insufficientCreditMessage.value = `Sie haben ${uploadedFiles.value.length} Datei(en) mit einer Gesamtgröße von ${totalFileSize.toFixed(2)} MB ausgewählt.<br>Ihr Guthaben von ${credit.value} MB wurde um ${(totalFileSize - parseFloat(credit.value)).toFixed(2)} MB überschritten.`;
    showCreditPopup.value = true;
    return;
  }

  compressing.value = true;
  let processedFiles = 0;
  let totalSize = 0;
  const userId = myData.value.id;

  // Get compression quality from Firebase
  const { data: configData, error: configError } = await useFetch('/api/get-system-configuration');
  if (!configData.value || !configData.value.success) {
    console.error('Error fetching system configuration:', configError.value);
    compressing.value = false;
    return;
  }
  const { videoQuality, audioQuality, photoQuality } = configData.value.config;

  for (let file of uploadedFiles.value) {
    if (file.status === 'Abgebrochen') continue;

    file.status = 'Wird komprimiert';
    const fileType = getFileType(file.name);
    let apiEndpoint = '';

    if (fileType === 'video') {
      apiEndpoint = '/api/compress-video';
    } else if (fileType === 'audio') {
      apiEndpoint = '/api/compress-audio';
    } else if (fileType === 'image') {
      apiEndpoint = '/api/compress-images';
    } else {
      file.status = 'Fehler';
      continue;
    }

    try {
      const formData = new FormData();
      formData.append(fileType, file.dropzoneFile);
      formData.append('userId', userId);
      formData.append('videoQuality', videoQuality);
      formData.append('audioQuality', audioQuality);
      formData.append('photoQuality', photoQuality);

      abortController.value = new AbortController();
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: formData,
        signal: abortController.value.signal,
      });

      const result = await response.json();
      console.log('Compression Result:', result);

      // Handle the case where result is an array
      const successResults = Array.isArray(result) ? result.filter(r => r.success) : [result].filter(r => r.success);

      if (successResults.length > 0) {
        file.status = 'Fertig';
        processedFiles++;
        totalSize += parseFloat(file.size);
        progress.value = ((processedFiles / uploadedFiles.value.length) * 100).toFixed(0);

        if (fileType === 'video') {
          myData.value.videos++;
        } else if (fileType === 'image') {
          myData.value.photos++;
        } else if (fileType === 'audio') {
          myData.value.music++;
        }

        // Save file metadata to Firebase Realtime Database
        for (const successResult of successResults) {
          const fileMetadata = {
            filename: file.name,
            path: successResult.outputPath,
            size: successResult.compressedSize,
            originalSize: successResult.originalSize,
            compressedSize: successResult.compressedSize,
            compressionRatio: successResult.ratio,
            quality: fileType === 'video' ? videoQuality : fileType === 'audio' ? audioQuality : photoQuality,
            dateCreated: new Date().toISOString(),
            directLink: crypto.randomUUID(),
            userId: userId,
          };

          await fetch('/api/save-file-metadata', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(fileMetadata),
          });

          // Download the compressed file
          const downloadLink = document.createElement('a');
          const downloadPath = successResult.outputPath.replace(/^public\\assets\\uploads\\/, '').replace(/\\/g, '/');
         // console.log('Download Path:', downloadPath);
          downloadLink.href = `/assets/uploads/${downloadPath}`;
          downloadLink.download = file.name;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        }
      } else {
        file.status = 'Fehler';
        console.error('Compression Error:', result.error);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        file.status = 'Abgebrochen';
        console.log('Compression aborted for file:', file.name);
      } else {
        file.status = 'Fehler';
        console.error('Compression Error:', error);
      }
    }
  }

  compressedFilesCount.value = processedFiles;
  totalCompressedSize.value = totalSize.toFixed(2);
  totalFilesCompressedToday.value += processedFiles;
  totalSizeCompressedToday.value = (parseFloat(totalSizeCompressedToday.value) + totalSize).toFixed(2);
  myData.value.used = (parseFloat(myData.value.used) + totalSize).toFixed(2);

  // Update user stats in Firebase
  await fetch('/api/update-user-stats', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: myData.value.id,
      videos: myData.value.videos,
      photos: myData.value.photos,
      music: myData.value.music,
      used: myData.value.used,
    }),
  });

  progress.value = 0;
  showPopup.value = true;
  compressing.value = false;

  // Refresh compressed files list
  const { data: compressedData, error: compressedError } = await useFetch(`/api/get-compressed-files?userId=${myData.value.id}`)
  if (compressedData.value && compressedData.value.success) {
    compressedFiles.value = Object.values(compressedData.value.files)
  } else {
    console.error('Error fetching compressed files:', compressedError.value)
  }
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
  const totalFileSize = uploadedFiles.value.reduce((acc, file) => acc + parseFloat(file.size), 0)
  if (totalFileSize > parseFloat(credit.value)) {
    insufficientCreditMessage.value = `Sie haben ${uploadedFiles.value.length} Datei(en) mit einer Gesamtgröße von ${totalFileSize.toFixed(2)} MB ausgewählt.<br>Ihr Guthaben von ${credit.value} MB wurde um ${(totalFileSize - parseFloat(credit.value)).toFixed(2)} MB überschritten.`
    showCreditPopup.value = true
  }
}

function copyToClipboard(directLink) {
  const fullLink = `${window.location.origin}/downloads/${directLink}`;
  navigator.clipboard.writeText(fullLink).then(() => {
    copiedLinkMessage.value = `Link wurde in die Zwischenablage kopiert: ${fullLink}`;
    showLinkPopup.value = true;
  }, (err) => {
    console.error('Fehler beim Kopieren des Links: ', err);
  });
}

function closeLinkPopup() {
  showLinkPopup.value = false;
}

function abortCompression(file) {
  if (abortController.value) {
    abortController.value.abort();
    file.status = 'Abgebrochen';
  }
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('de-DE', options);
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