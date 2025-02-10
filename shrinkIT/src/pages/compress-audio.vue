<template>
  <div>
    <h1>Audio Compression</h1>
    <input type="file" accept="audio/mpeg" multiple @change="handleFileUpload" />

    <div v-if="progress < 100">
      <p>Progress: {{ progress }}%</p>
      <progress max="100" :value="progress"></progress>
    </div>

    <div v-if="currentFileName">
      <p>Processing file: {{ currentFileName }}</p>
    </div>

    <div v-if="compressionResults.length">
      <div v-for="(result, index) in compressionResults" :key="index">
        <p><strong>Original Size:</strong> {{ result.originalSize }} bytes</p>
        <p><strong>Compressed Size:</strong> {{ result.compressedSize }} bytes</p>
        <p v-if="result.ratio !== undefined"><strong>Compression Ratio:</strong> {{ result.ratio.toFixed(2) }}%</p>
        <p v-else><strong>Compression Ratio:</strong> N/A</p>
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
const progress = ref(0)
const currentFileName = ref("")

// Funktion zum Hochladen und Komprimieren von Dateien
const handleFileUpload = async (event) => {
  console.log('handleFileUpload event:', event)

  const input = event.target
  if (!input || !input.files) {
    console.error('No files selected or target not found.')
    return
  }

  const files = Array.from(input.files)
  console.log('Selected files:', files)

  if (files.length === 0) return

  compressionResults.value = []
  progress.value = 0

  const totalFiles = files.length

  for (let i = 0; i < totalFiles; i++) {
    const file = files[i]
    currentFileName.value = file.name // Setzen des aktuellen Dateinamens
    console.log('Processing file:', currentFileName.value)
    
    const formData = new FormData()
    formData.append('audio', file)

    try {
      const response = await axios.post('/api/compress-audio', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      console.log('API response:', response.data) // Überprüfe die Daten in der Konsole

      if (Array.isArray(response.data)) {
        compressionResults.value.push(...response.data)
      } else {
        compressionResults.value.push(response.data)
      }

      progress.value = ((i + 1) / totalFiles) * 100
    } catch (error) {
      console.error('Error during API call:', error)
      compressionResults.value.push({
        success: false,
        error: error.message,
      })
      progress.value = ((i + 1) / totalFiles) * 100
    }

    currentFileName.value = "" // Zurücksetzen des aktuellen Dateinamens nach der Verarbeitung
  }

  console.log('Final compression results:', compressionResults.value)
}
</script>
