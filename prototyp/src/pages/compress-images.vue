<template>
  <div>
    <h1>Image Compression</h1>
    <input type="file" multiple @change="handleFileUpload" /> <!-- Eine oder mehrere Bilddateien werden zum Hochladen ausgewählt -->
    <div v-if="progress.totalFiles > 0">
      <p>Processing {{ progress.processedFiles }} of {{ progress.totalFiles }} files...</p> <!-- Fortschrittsanzeige für die einzelnen Uploads -->
    </div>
    <div v-if="compressionResults.length">
      <div v-for="(result, index) in compressionResults" :key="index">
        <h3>File {{ index + 1 }}</h3> <!-- Information zu Originalgröße, Komprimierung, Komprimierungsrate und benötigter Zeit -->
        <p><strong>Original Size:</strong> {{ result.originalSize }} bytes</p>
        <p><strong>Compressed Size:</strong> {{ result.compressedSize }} bytes</p>
        <p><strong>Compression Ratio:</strong> {{ result.ratio.toFixed(2) }}%</p>
        <p><strong>Time Taken:</strong> {{ result.timeTaken }}ms</p>
        <p v-if="result.success"><strong>Output Path:</strong> {{ result.outputPath }}</p>
        <p v-else><strong>Error:</strong> {{ result.error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

//kein page layout verwenden
definePageMeta({
  layout: 'empty'
})


// Reaktive Referenzen
const compressionResults = ref([])
const progress = ref({
  processedFiles: 0,
  totalFiles: 0,
})

// Funktion zum Hochladen und Komprimieren von Dateien
const handleFileUpload = async (event) => {
  const files = Array.from(event.target.files)
  if (!files.length) return

  compressionResults.value = []
  progress.value.totalFiles = files.length
  progress.value.processedFiles = 0

  for (const file of files) {
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await axios.post('/api/compress-images', formData, { // Post-Request eines Uploads an serverseitige API (compress-images)
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      // Antwort in das Array `compressionResults` einfügen
      compressionResults.value.push(response.data[0])
      progress.value.processedFiles += 1
    } catch (error) {
      console.error('Upload Error:', error)
      compressionResults.value.push({
        success: false,
        error: error.message,
      })
      progress.value.processedFiles += 1
    }
  }
}
</script>
