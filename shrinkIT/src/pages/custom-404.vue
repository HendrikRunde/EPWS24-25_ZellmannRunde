<template>
  <div class="error-page">
    <h1 class="text-danger">Download-Link ungültig</h1>
    <h4>Der von Ihnen ausgewählte Download-Link ist ungültig. Prüfen Sie bitte, ob der Link vollständig bzw. korrekt eingegeben wurde.</h4>
  </div>
</template>

<script setup>
definePageMeta({
    layout: 'empty'
})
</script>

<style scoped>
.error-page {
  text-align: center;
  margin-top: 50px;
}
</style>
