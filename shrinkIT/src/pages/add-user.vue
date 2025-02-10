<template>
  <div>
    <h1>Benutzer hinzufügen</h1>
    
    <form @submit.prevent="addUser">
      Firstname: <input v-model="firstName" placeholder="Vorname"> <br>
      Lastname: <input v-model="lastName" placeholder="Nachname"> <br>
      Email: <input type="email" v-model="email" placeholder="Email"> <br>
      Password: <input type="password" v-model="password" placeholder="Password"> <br>
      Data volume: <input type="number" v-model.number="dataVolume" placeholder="Datenvolumen in MB"> <br>
      Limit files: <input type="number" v-model.number="fileCount" placeholder="Anzahl der Dateien"> <br>
      <button type="submit">Benutzer hinzufügen</button>
    </form>

    <div v-if="message" class="message">{{ message }}</div>
  </div>
</template>

<script>
import  firebase  from '../plugins/firebase';  // Pfad an deine Struktur anpassen
import { getDatabase, ref, set } from 'firebase/database';


export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      dataVolume: 0,
      fileCount: 0,
      message: ''
    };
  },
  methods: {
    async addUser() {
      // Monatliche Benutzerschlüssel generieren
      const userId = new Date().getTime();

      const newUser = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        dataVolume: this.dataVolume,
        fileCount: this.fileCount
      };

      try {
        const dbRef = ref(firebase.database, 'users/' + userId);
        await set(dbRef, newUser);
        this.message = 'Benutzer erfolgreich hinzugefügt!';
        this.resetForm();
      } catch (error) {
        console.error('Error adding user:', error);
        this.message = 'Fehler beim Hinzufügen des Benutzers.';
      }
    },
    resetForm() {
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
      this.dataVolume = 0;
      this.fileCount = 0;
    }
  }
};
</script>
