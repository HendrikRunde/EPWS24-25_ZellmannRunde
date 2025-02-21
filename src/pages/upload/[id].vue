<template>
  <div class="container">
    <h1>File Optimization</h1>

    <div v-if="!isValid" class="error-message">
      <p>{{ message }}</p>
    </div>

    <div v-else>
      <div class="upload-section" @dragover.prevent @drop="handleDrop">
        <p v-if="message" class="message">{{ message }}</p>
        <p>You have {{ remainingUploads }} uploads remaining.</p>

        <label class="file-upload">
          <input type="file" multiple @change="handleFileUpload" class="file-input" accept="image/*,video/*,audio/*" />
          <span>Select Files or Drag & Drop</span>
        </label>

        <button @click="startUpload" class="upload-button" :disabled="isUploading">
          {{ isUploading ? "Uploading..." : "Start Upload" }}
        </button>
      </div>

      <div v-if="progress.totalFiles > 0" class="progress-section">
        <p>Processing {{ progress.processedFiles }} of {{ progress.totalFiles }} files...</p>
      </div>

      <div v-if="uploadMessage" class="upload-message">
        <p>{{ uploadMessage }}</p>
      </div>

      <div v-if="results.length" class="results-section">
        <h2>Results</h2>
        <div v-for="(result, index) in results" :key="index" class="result">
          <h3>File {{ index + 1 }}</h3>
          <p><strong>Original Size:</strong> {{ formatSize(result.originalSize) }}</p>
          <p><strong>Compressed Size:</strong> {{ formatSize(result.compressedSize) }}</p>
          <p><strong>Compression Ratio:</strong> {{ result.ratio ? result.ratio.toFixed(2) : 0 }}%</p>

          <div v-if="result.success">
            <strong>Download:</strong>
            <a :href="fixOutputPath(result.outputPath)" download>Click to Download</a>
          </div>

          <div v-if="result.type && result.type.startsWith('image/')">
            <img :src="fixOutputPath(result.outputPath)" alt="Optimized Image" class="preview" />
          </div>

          <div v-if="result.type && result.type.startsWith('video/')">
            <video controls class="preview">
              <source :src="fixOutputPath(result.outputPath)" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div v-if="result.type && result.type.startsWith('audio/')">
            <audio controls>
              <source :src="fixOutputPath(result.outputPath)" type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRuntimeConfig } from '#imports';
export default {
  data() {
    return {
      remainingUploads: 0,
      progress: { processedFiles: 0, totalFiles: 0 },
      results: [],
      message: "",
      isValid: true,
      files: [],
      isUploading: false,
      uploadMessage: "",
    };
  },
  async created() {
    console.log("🚀 Validierung wird über API-Endpunkt gestartet...");
    try {
      console.log("🔍 this.$route.params:", this.$route.params);
      console.log("🔍 this.$route.query:", this.$route.query);

      const urlParams = new URLSearchParams(this.$route.query);
      const queryString = urlParams.toString();
      console.log("🛠 Erstellter Query-String aus this.$route.query:", queryString);

      const config = useRuntimeConfig();
      const apiUrl = `${config.public.baseURL}/api/validate?id=${encodeURIComponent(this.$route.params.id)}&${queryString}`;
      console.log("📡 Vollständige URL für API-Request:", apiUrl);

      const response = await fetch(apiUrl);
      console.log("🔄 Roh-Antwort von API erhalten:", response);

      if (!response.ok) {
        console.error("❌ API-Fehler beim Abrufen der Validierung:", response.status, response.statusText);
        throw new Error(`Fehler beim Abrufen der Validierung: ${response.status}`);
      }

      const validation = await response.json();
      console.log("📥 Verarbeitete API-Antwort (Validation):", validation);

      if (!validation.isValid) {
        console.error("❌ Link ist ungültig oder abgelaufen.");
        this.isValid = false;
        this.message = "The upload link is invalid or expired.";
      } else {
        console.log("✅ Link ist gültig! Verbleibende Uploads:", validation.remainingUploads);
        this.remainingUploads = validation.remainingUploads;
      }
    } catch (error) {
      console.error("❌ Validierungsfehler im Catch-Block:", error);
      this.isValid = false;
      this.message = "Validation failed due to an error.";
    }
  }
  ,  methods: {
    handleFileUpload(event) {
      this.files = Array.from(event.target.files);
      this.progress.totalFiles = this.files.length;
      this.message = `${this.files.length} file(s) selected.`;
      console.log("📂 Dateien ausgewählt:", this.files);
    },
    handleDrop(event) {
      event.preventDefault();
      this.files = Array.from(event.dataTransfer.files);
      this.progress.totalFiles = this.files.length;
      this.message = `${this.files.length} file(s) dropped.`;
      console.log("📂 Dateien per Drag & Drop hinzugefügt:", this.files);
    },
    async startUpload() {
      if (this.files.length === 0) {
        this.message = "Error: Please select files to upload.";
        return;
      }
      this.progress.totalFiles = this.files.length;
      this.progress.processedFiles = 0;
      this.message = "Uploading and processing files...";
      this.isUploading = true;
      this.uploadMessage = "";

      try {
        const uploadPromises = this.files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);

          console.log("📡 Sende Datei an API:", file.name);
          const apiUrl = `/api/compress${window.location.search}`;
          console.log("📎 Request URL:", apiUrl);

          const response = await fetch(apiUrl, {
            method: 'POST',
            body: formData,
          });

          console.log("🔄 Roh-Antwort von API erhalten:", response);

          if (!response.ok) {
            console.error("❌ API-Fehler:", response.status, response.statusText);
            throw new Error(`API-Fehler: ${response.status}`);
          }

          const result = await response.json();
          console.log("📥 Verarbeitete API-Antwort:", result);

          this.progress.processedFiles += 1;

          if (!result[0]?.outputPath) {
            console.error("❌ FEHLER: Output Path fehlt oder ist ungültig!", result);
          } else {
            console.log("✅ Output Path erfolgreich gespeichert:", result[0].outputPath);
          }

          return { ...result[0], type: file.type };
        });

        this.results = await Promise.all(uploadPromises);
        console.log("✅ Endgültige Ergebnisse nach Upload:", this.results);

        if (this.results.some(r => !r.success)) {
          this.uploadMessage = "⚠ Einige Dateien konnten nicht komprimiert werden.";
        } else {
          this.uploadMessage = "✅ Upload und Komprimierung erfolgreich!";
        }

        this.message = "";
      } catch (error) {
        console.error("❌ Upload fehlgeschlagen:", error);
        this.uploadMessage = "❌ Fehler beim Hochladen.";
      } finally {
        this.isUploading = false;
      }
    },
    fixOutputPath(path) {
      if (!path) return "";
      return path.replace("/Users/hendrikrunde/Documents/01_link_creation_rebuild/01_link_creation_rebuild", "");
    },
    formatSize(bytes) {
      if (!bytes) return "Unknown";
      const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
    },
  },
};
</script>

<style>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
.upload-section {
  margin-bottom: 20px;
}
.file-upload {
  display: inline-block;
  margin: 10px 0;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
.upload-button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.preview {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
}
</style>
