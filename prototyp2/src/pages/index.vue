<template>
  <div class="container">
    <h1>Generate Upload Link</h1>
    <form @submit.prevent="generateLink" class="form">
      <div class="form-group">
        <label for="maxUploads">Max Uploads:</label>
        <input type="number" id="maxUploads" v-model="maxUploads" class="form-control" min="1" />
      </div>

      <div class="form-group">
        <label for="validity">Validity (e.g., 7d, 12h):</label>
        <input type="text" id="validity" v-model="validity" class="form-control" />
      </div>

      <div class="form-group">
        <label for="quality">Quality:</label>
        <select id="quality" v-model="quality" class="form-control">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <!-- Dropdown für `resize` -->
      <div class="form-group">
        <label for="resize">Resize (optional):</label>
        <select id="resize" v-model="resize" class="form-control">
          <option value="">Original Size</option>
          <option value="1920x1080">1920x1080 (Full HD)</option>
          <option value="1280x720">1280x720 (HD)</option>
          <option value="1024x576">1024x576 (Medium)</option>
          <option value="854x480">854x480 (SD)</option>
          <option value="640x360">640x360 (Small)</option>
          <option value="400x400">400x400 (Square)</option>
        </select>
      </div>

      <button type="submit" class="generate-button">Generate Link</button>
    </form>

    <div v-if="generatedLink" class="generated-link">
      <p>Generated Link:</p>
      <a :href="generatedLink" target="_blank" rel="noopener noreferrer">{{ generatedLink }}</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      maxUploads: 3,
      validity: "7d",
      quality: "medium",
      resize: "", // Standard: Originalgröße
      generatedLink: null,
    };
  },
  methods: {
    async generateLink() {
      try {
        const response = await fetch("/api/generate-link", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            maxUploads: this.maxUploads,
            validity: this.validity,
            quality: this.quality,
            resize: this.resize || null, // Falls leer, bleibt Originalgröße erhalten
          }),
        });

        const data = await response.json();
        if (data.success) {
          this.generatedLink = data.link;
        } else {
          console.error("Error generating link:", data.message);
        }
      } catch (error) {
        console.error("An error occurred while generating the link:", error);
      }
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

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.generate-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.generate-button:hover {
  background-color: #0056b3;
}

.generated-link {
  margin-top: 20px;
  word-wrap: break-word;
}

.generated-link a {
  color: #007bff;
  text-decoration: none;
}

.generated-link a:hover {
  text-decoration: underline;
}
</style>
