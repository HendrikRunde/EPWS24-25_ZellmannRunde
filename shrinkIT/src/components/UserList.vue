<template>
  <div class="card mb-3">
    <div class="card-header pb-0">
      <h6>Benutzer</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Beruf</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Speicherplatz</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Gültigkeitsdatum</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.email">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img :src="user.profilePicture || '/assets/img/user/default.png'" class="avatar avatar-sm me-3" :alt="user.firstname + ' ' + user.lastname">
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ user.firstname }} {{ user.lastname }}</h6>
                    <p class="text-xs text-secondary mb-0">{{ user.email }}</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{ user.profession }}</p>
                <p class="text-xs text-secondary mb-0">{{ user.company }}</p>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{ user.used }} / {{ user.volume }} MB</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{ user.validUntil }}</span>
              </td>
              <td class="align-middle">
                <button v-if="!user.link" @click="createPersLink(user)" class="btn btn-primary">Personalisierten Link erstellen</button>
                <button v-else @click="refreshPersLink(user)" class="btn btn-warning">Personalisierten Link erneuern</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  users: Array,
  createPersLink: Function,
  refreshPersLink: Function
})
</script>

<style scoped>
.avatar {
  width: 40px;
  height: 40px;
}
</style>