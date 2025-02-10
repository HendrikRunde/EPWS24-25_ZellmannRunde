<template>
  <div>
    <h1>POC Read/Write to Firebase Realtime Database</h1>

    <div>
      <input v-model="inputValue" placeholder="Enter some text">
      <button @click="writeData">Write Data</button>
    </div>

    <div>
      <h2>Read Data:</h2>
      <p>{{ readData }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import firebase from '../plugins/firebase' // Aktualisierter Pfad und Import
import { ref as dbRef, set, onValue } from 'firebase/database'

// Reaktive Referenzen definieren
const inputValue = ref('')
const readData = ref('')

//kein page layout verwenden
definePageMeta({
  layout: 'empty'
})

// Funktion zum Schreiben von Daten in die Firebase-Datenbank
function writeData() {
  const databaseRef = dbRef(firebase.database, 'myData')
  set(databaseRef, {
    text: inputValue.value
  }).then(() => {
    console.log('Data written successfully')
  }).catch((error) => {
    console.error('Error writing data:', error)
  })
}

// Funktion zum Lesen von Daten aus der Firebase-Datenbank
function fetchData() {
  const databaseRef = dbRef(firebase.database, 'myData')
  onValue(databaseRef, (snapshot) => {
    const data = snapshot.val()
    if (data) {
      readData.value = data.text
    } else {
      readData.value = 'No data available'
    }
  })
}

// Daten abrufen, wenn die Komponente eingebunden wird
onMounted(() => {
  fetchData()
})
</script>
