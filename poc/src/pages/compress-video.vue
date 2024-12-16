<template>
  <div>
    <h1>Video Compression</h1>
    <input type="file" accept="video/mp4" @change="handleFileUpload" /> <!-- Eine oder mehrere Videodateien werden zum Hochladen ausgewählt -->
    <div v-if="compressionResult">
    <!-- Information zu Originalgröße, Komprimierung, Komprimierungsrate und benötigter Zeit -->
      <p><strong>Original Size:</strong> {{ compressionResult.originalSize }} bytes</p>
      <p><strong>Compressed Size:</strong> {{ compressionResult.compressedSize }} bytes</p>
      <p><strong>Compression Ratio:</strong> {{ compressionResult.ratio.toFixed(2) }}%</p>
      <p><strong>Time Taken:</strong> {{ compressionResult.timeTaken }}ms</p>
      <p v-if="compressionResult.success"><strong>Output Path:</strong> {{ compressionResult.outputPath }}</p>
      <p v-else><strong>Error:</strong> {{ compressionResult.error }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      compressionResult: null,
    };
  },
  methods: {
    async handleFileUpload(event) { // Aufruf der Funktion
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('video', file);

      try {
        const response = await axios.post('/api/compress-video', formData, { // Post Request eines Uploads an serverseitige API (compress-video)
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        this.compressionResult = response.data;
      } catch (error) {
        console.error('Upload Error:', error);
        this.compressionResult = {
          success: false,
          error: error.message,
        };
      }
    },
  },
};
</script>
