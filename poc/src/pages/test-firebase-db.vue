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
  
  <script>
  import firebase from '../plugins/firebase';  // Aktualisierter Pfad und Import
  import { ref, set, onValue } from 'firebase/database';
  
  export default {
    data() {
      return {
        inputValue: '',
        readData: ''
      };
    },
    methods: {
      writeData() {
        const dbRef = ref(firebase.database, 'myData');
        set(dbRef, {
          text: this.inputValue
        }).then(() => {
          console.log('Data written successfully');
        }).catch((error) => {
          console.error('Error writing data:', error);
        });
      },
      fetchData() { // Namensänderung hier
        const dbRef = ref(firebase.database, 'myData');
        onValue(dbRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            this.readData = data.text;
          } else {
            this.readData = 'No data available';
          }
        });
      }
    },
    mounted() {
      this.fetchData();
    }
  };
  </script>
  