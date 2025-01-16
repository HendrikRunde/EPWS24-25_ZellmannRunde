<template>
  <div>
    <h1>Video Compression</h1>
    <input type="file" accept="video/mp4" multiple @change="handleFileUpload" />

    <div v-if="compressionResults.length">
      <div v-for="(result, index) in compressionResults" :key="index">
        <p><strong>Original Size:</strong> {{ result.originalSize }} bytes</p>
        <p><strong>Compressed Size:</strong> {{ result.compressedSize }} bytes</p>
        <p><strong>Compression Ratio:</strong> {{ result.ratio.toFixed(2) }}%</p>
        <p><strong>Time Taken:</strong> {{ result.timeTaken }}ms</p>
        <p v-if="result.success"><strong>Output Path:</strong> {{ result.outputPath }}</p>
        <p v-else><strong>Error:</strong> {{ result.error }}</p>
      </div>
    </div>

    <div v-if="progress < 100">
      <p>Progress: {{ progress }}%</p>
      <progress max="100" :value="progress"></progress>
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
    console.log('Processing file:', file.name)
    
    const formData = new FormData()
    formData.append('video', file)

    try {
      const response = await axios.post('/api/compress-video', formData, {
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
  }

  console.log('Final compression results:', compressionResults.value)
}
</script>
