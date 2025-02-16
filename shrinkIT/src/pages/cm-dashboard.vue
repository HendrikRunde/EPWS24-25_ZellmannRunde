<template>
  <!-- Navbar -->
  <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
    <div class="container-fluid py-1 px-3">
      <nav aria-label="breadcrumb">
        <h5 class="font-weight-bolder text-white mb-0">Willkommen zurück, Sebastian Weber!</h5>
      </nav>
      <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
        <div class="ms-md-auto pe-md-3 d-flex align-items-center"></div>
        <ul class="navbar-nav justify-content-end">
          <li class="nav-item px-3 d-flex align-items-center">
            <NuxtLink to="/system-configuration" class="nav-link text-white p-0">
              <i class="fa fa-cog fixed-plugin-button-nav cursor-pointer me-sm-1"></i>
              <span class="d-sm-inline d-none">Konfiguration</span>
            </NuxtLink>
          </li>


          <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
            <a href="javascript:;" class="nav-link text-white p-0" id="iconNavbarSidenav">
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line bg-white"></i>
                <i class="sidenav-toggler-line bg-white"></i>
                <i class="sidenav-toggler-line bg-white"></i>
              </div>
            </a>
          </li>

          <li class="nav-item d-flex align-items-center">
            <NuxtLink to="/login" class="nav-link text-white font-weight-bold px-0">
              <i class="fa fa-user me-sm-1"></i>
              <span class="d-sm-inline d-none">Abmelden</span>
            </NuxtLink>
          </li>

          <!-- <li class="nav-item dropdown pe-2 d-flex align-items-center">
            <a href="javascript:;" class="nav-link text-white p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa fa-bell cursor-pointer"></i>
            </a>
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->

  <div class="container-fluid py-4">
    <div class="row">
      <InfoCard title="Registrierte Benutzer" :value="users.length" iconClass="ni ni-circle-08" iconBgClass="bg-gradient-danger" />
      <InfoCard title="Speicherplatz pro Benutzer" :value="`${systemConfig.maxVolume} MB`" iconClass="ni ni-money-coins" iconBgClass="bg-gradient-primary" />
      <InfoCard title="Verwendeter Speicherplatz aller Benutzer" :value="`${totalUsedStorage} MB`" iconClass="ni ni-paper-diploma" iconBgClass="bg-gradient-success" />
    </div>

    <div class="row" style="padding-top: 20px;">
      <InfoCard title="Bilder" :value="`${systemConfig.photoQuality} %`" iconClass="ni ni-image" iconBgClass="bg-gradient-success" />
      <InfoCard title="Videos" :value="`${systemConfig.videoQuality} %`" iconClass="ni ni-tv-2" iconBgClass="bg-gradient-danger" />
      <InfoCard title="Audio" :value="`${systemConfig.audioQuality} %`" iconClass="ni ni-note-03" iconBgClass="bg-gradient-warning" />
    </div>

    <div class="row" style="padding-top: 20px;">
      <InfoCard title="Bilder" :value="totalPhotos" iconClass="ni ni-image" iconBgClass="bg-gradient-success" />
      <InfoCard title="Videos" :value="totalVideos" iconClass="ni ni-tv-2" iconBgClass="bg-gradient-danger" />
      <InfoCard title="Audio" :value="totalAudios" iconClass="ni ni-note-03" iconBgClass="bg-gradient-warning" />
    </div>

    <div class="container-fluid py-4">
      <UserList :users="users" :createPersLink="createPersLink" :refreshPersLink="refreshPersLink" />
    </div>

    <footer class="footer pt-3"></footer>
  </div>

  <PopupDialog :show="showPopup" :message="popupMessage" @close="closePopup" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import InfoCard from '~/components/InfoCard.vue'
import UserList from '~/components/UserList.vue'
import PopupDialog from '~/components/PopupDialog.vue'

const users = ref([])
const systemConfig = ref({
  maxVolume: '',
  videoQuality: '',
  audioQuality: '',
  photoQuality: ''
})

const totalUsedStorage = ref(0)
const totalVideos = ref(0)
const totalPhotos = ref(0)
const totalAudios = ref(0)
const showPopup = ref(false)
const popupMessage = ref('')

onMounted(async () => {
  const { data: userData, error: userError } = await useFetch('/api/get-users')
  if (userData.value && userData.value.success) {
    users.value = Object.values(userData.value.users)
    totalUsedStorage.value = users.value.reduce((sum, user) => sum + (user.used || 0), 0)
    totalVideos.value = users.value.reduce((sum, user) => sum + (user.videos || 0), 0)
    totalPhotos.value = users.value.reduce((sum, user) => sum + (user.photos || 0), 0)
    totalAudios.value = users.value.reduce((sum, user) => sum + (user.audios || 0), 0)
  } else {
    console.error('Error fetching users:', userError.value)
  }

  const { data: configData, error: configError } = await useFetch('/api/get-system-configuration')
  if (configData.value && configData.value.success) {
    systemConfig.value = configData.value.config
  } else {
    console.error('Error fetching system configuration:', configError.value)
  }
})

const sendPersonalizedLink = async (user, action) => {
  const { data, error } = await useFetch('/api/create-personalized-link', {
    method: 'POST',
    body: { userId: user.id, }
  })

  if (data.value && data.value.success) {
    const link = `${window.location.origin}/${data.value.link}`;
    const emailBody = `Hallo ${user.firstname} ${user.lastname},\n\nIhr personalisierter Zugriffslink wurde ${action}. Klicken Sie auf folgenden Hyperlink, um direkt in die Anwendung zu kommen: ${link}\n\nMit freundlichen Grüßen,\nIhr shrinkIT Team`
    await useFetch('/api/sendemail', {
      method: 'POST',
      body: {
        to: user.email,
        subject: 'Ihr personalisierter Link',
        text: emailBody
      }
    })

    popupMessage.value = `Personalisierter Zugriffslink für Benutzer "${user.firstname} ${user.lastname}" wurde ${action} und per Email an ${user.email} gesendet.\nLink: ${data.value.link}`
    showPopup.value = true
    user.link = data.value.link
    user.validUntil = data.value.validUntil
  } else {
    console.error(`Fehler beim ${action} des personalisierten Links:`, error.value)
  }
}

const createPersLink = async (user) => {
  await sendPersonalizedLink(user, 'erstellt')
}

const refreshPersLink = async (user) => {
  await sendPersonalizedLink(user, 'erneuert')
}


const closePopup = () => {
  showPopup.value = false
}

</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-dialog {
  max-width: 500px;
}

.modal-header .close {
  background: none;
  border: none;
  font-size: 1.5rem;
}

.close span {
  font-size: 1.5rem;
}
</style>
