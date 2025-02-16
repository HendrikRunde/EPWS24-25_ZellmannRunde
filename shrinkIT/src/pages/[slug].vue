<template>
    <!-- <div v-if="error">
      <h1>Wrong Quick Link</h1>
    </div> -->
  </template>
  
  <script setup>
  import { useRouter, useRoute } from 'vue-router'
  import { ref, onMounted } from 'vue'
  
  const router = useRouter()
  const route = useRoute()
  
  const error = ref(false)
  let myData
  onMounted(async () => {
    const slug = route.params.slug

    try {
      // Füge hier deine Logik zur Überprüfung des Slugs hinzu
      const response = await fetch(`/api/check-slug/${slug}`)
      const data = await response.json()
  
      if (data.type === 'admin') {
        myData = useState('myData', () => ({ name: 'Sebastian Weber', type: 'Content manager' }))
        router.push('/login')
      } else if (data.type === 'user') {
        myData = useState('myData', () => (data))
        router.push('/uploads')
      } else {
        router.push('/invalid')
        error.value = true
      }
    } catch (err) {
      error.value = true
    }
  })
  </script>
  