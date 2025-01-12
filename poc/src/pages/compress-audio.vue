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

<script>
import axios from 'axios';

export default {
  data() {
    return {
      compressionResults: [],
      progress: 0,
      currentFileName: "", // Hinzufügen eines Feldes für den aktuellen Dateinamen
    };
  },
  methods: {
    async handleFileUpload(event) {
      const files = Array.from(event.target.files);
      if (!files.length) return;

      this.compressionResults = [];
      this.progress = 0;

      const totalFiles = files.length;

      for (let i = 0; i < totalFiles; i++) {
        const file = files[i];
        this.currentFileName = file.name; // Setzen des aktuellen Dateinamens
        const formData = new FormData();
        formData.append('audio', file);

        try {
          const response = await axios.post('/api/compress-audio', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });

          console.log(response.data); // Überprüfe die Daten in der Konsole

          if (Array.isArray(response.data)) {
            this.compressionResults.push(...response.data);
          } else {
            this.compressionResults.push(response.data);
          }

          this.progress = ((i + 1) / totalFiles) * 100;
        } catch (error) {
          console.error('Error:', error);
          this.compressionResults.push({
            success: false,
            error: error.message,
          });
          this.progress = ((i + 1) / totalFiles) * 100;
        }

        this.currentFileName = ""; // Zurücksetzen des aktuellen Dateinamens nach der Verarbeitung
      }
    },
  },
};
</script>
