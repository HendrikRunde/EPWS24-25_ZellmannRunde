<template>
  <!-- Navbar -->
  <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur"
    data-scroll="false">
    <div class="container-fluid py-1 px-3">
      <nav aria-label="breadcrumb">

        <h5 class="font-weight-bolder text-white mb-0">Willkommen zurück, Sebastian Weber!</h5>
      </nav>
      <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
        <div class="ms-md-auto pe-md-3 d-flex align-items-center">
        </div>
        <ul class="navbar-nav  justify-content-end">
          <li class="nav-item d-flex align-items-center">
            <a href="javascript:;" class="nav-link text-white font-weight-bold px-0">
              <i class="fa fa-user me-sm-1"></i>
              <span class="d-sm-inline d-none">Abmelden</span>
            </a>
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
          <li class="nav-item px-3 d-flex align-items-center">
            <a href="javascript:;" class="nav-link text-white p-0">
              <i class="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
            </a>
          </li>
          <li class="nav-item dropdown pe-2 d-flex align-items-center">
            <a href="javascript:;" class="nav-link text-white p-0" id="dropdownMenuButton" data-bs-toggle="dropdown"
              aria-expanded="false">
              <i class="fa fa-bell cursor-pointer"></i>
            </a>

          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <div class="row">
              <div class="col-8">
                <div class="numbers">
                  <p class="text-sm mb-0 text-uppercase font-weight-bold">Speicherplatz pro Benutzer</p>
                  <h5 class="font-weight-bolder">
                    1000 MB
                  </h5>
                  <p class="mb-0">
                    <span class="text-success text-sm font-weight-bolder">&nbsp;</span>
                    &nbsp;
                  </p>
                </div>
              </div>
              <div class="col-4 text-end">
                <div class="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                  <i class="ni ni-money-coins text-lg opacity-10" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <div class="row">
              <div class="col-8">
                <div class="numbers">
                  <p class="text-sm mb-0 text-uppercase font-weight-bold">Aktuelle Benutzeranzahl</p>
                  <h5 class="font-weight-bolder">
                    2
                  </h5>
                  <p class="mb-0">
                    <span class="text-success text-sm font-weight-bolder">&nbsp;</span>
                    &nbsp;
                  </p>
                </div>
              </div>
              <div class="col-4 text-end">
                <div class="icon icon-shape bg-gradient-danger shadow-danger text-center rounded-circle">
                  <i class="ni ni-circle-08 text-lg opacity-10" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <div class="row">
              <div class="col-8">
                <div class="numbers">
                  <p class="text-sm mb-0 text-uppercase font-weight-bold">Verwendeter Speicherplatz aller Benutzer</p>
                  <h5 class="font-weight-bolder">
                    1490 MB
                  </h5>
                  <p class="mb-0">
                    <span class="text-danger text-sm font-weight-bolder">&nbsp;</span>
                    &nbsp;
                  </p>
                </div>
              </div>
              <div class="col-4 text-end">
                <div class="icon icon-shape bg-gradient-success shadow-success text-center rounded-circle">
                  <i class="ni ni-paper-diploma text-lg opacity-10" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row" style="padding-top: 20px;">
      <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <div class="row">
              <div class="col-8">
                <div class="numbers">
                  <p class="text-sm mb-0 text-uppercase font-weight-bold">Videos</p>
                  <h5 class="font-weight-bolder">
                    20
                  </h5>
                  <p class="mb-0">
                    <span class="text-success text-sm font-weight-bolder">&nbsp;</span>
                    &nbsp;
                  </p>
                </div>
              </div>
              <div class="col-4 text-end">
                <div class="icon icon-shape bg-gradient-danger shadow-primary text-center rounded-circle">
                  <i class="ni ni-tv-2 text-lg opacity-10" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <div class="row">
              <div class="col-8">
                <div class="numbers">
                  <p class="text-sm mb-0 text-uppercase font-weight-bold">Fotos</p>
                  <h5 class="font-weight-bolder">
                    110
                  </h5>
                  <p class="mb-0">
                    <span class="text-success text-sm font-weight-bolder">&nbsp;</span>
                    &nbsp;
                  </p>
                </div>
              </div>
              <div class="col-4 text-end">
                <div class="icon icon-shape bg-gradient-success shadow-danger text-center rounded-circle">
                  <i class="ni ni-image text-lg opacity-10" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <div class="row">
              <div class="col-8">
                <div class="numbers">
                  <p class="text-sm mb-0 text-uppercase font-weight-bold">Audio</p>
                  <h5 class="font-weight-bolder">
                    210
                  </h5>
                  <p class="mb-0">
                    <span class="text-danger text-sm font-weight-bolder">&nbsp;</span>
                    &nbsp;
                  </p>
                </div>
              </div>
              <div class="col-4 text-end">
                <div class="icon icon-shape bg-gradient-warning shadow-success text-center rounded-circle">
                  <i class="ni ni-note-03 text-lg opacity-10" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid py-4">
      <div class="row md-12">
        <div class="col-12">
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
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Speicherplatz</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Gültigkeitsdatum
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in users" :key="user.email">
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div>
                            <img :src="user.profilePicture || '/assets/img/user/default.png'"
                              class="avatar avatar-sm me-3" :alt="user.firstname + ' ' + user.lastname">
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
                        <span class="text-secondary text-xs font-weight-bold">{{ user.used }} / {{ user.volume }}
                          MB</span>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">{{ user.validUntil }}</span>
                      </td>
                      <td class="align-middle">
                        <button class="btn btn-primary">Personalisierten Link erneuern</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <footer class="footer pt-3  ">

    </footer>
  </div>

  <!-- Modal für Neue Benutzer -->
  <div v-if="showModal" class="modal" tabindex="-1" role="dialog"
    style="display: block; background-color: rgba(0, 0, 0, 0.5);">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header d-flex justify-content-between">
          <h5 class="modal-title">Neuer Benutzer</h5>
          <button type="button" class="close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveUser">
            <div class="mb-3">
              <label for="firstName">Vorname</label>
              <input type="text" class="form-control" id="firstName" v-model="newUser.firstName" required>
            </div>
            <div class="mb-3">
              <label for="lastName">Nachname</label>
              <input type="text" class="form-control" id="lastName" v-model="newUser.lastName" required>
            </div>
            <div class="mb-3">
              <label for="job">Beruf</label>
              <input type="text" class="form-control" id="job" v-model="newUser.job" required>
            </div>
            <div class="mb-3">
              <label for="company">Firma</label>
              <input type="text" class="form-control" id="company" v-model="newUser.company" required>
            </div>
            <div class="mb-3">
              <label for="storage">Speicherplatz (MB)</label>
              <input type="number" class="form-control" id="storage" v-model="newUser.storage" required>
            </div>
            <div class="mb-3">
              <label for="validity">Gültig bis</label>
              <input type="date" class="form-control" id="validity" v-model="newUser.validity" required>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal">Schließen</button>
              <button type="submit" class="btn btn-primary">Speichern</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>



<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])

onMounted(async () => {
  const { data, error } = await useFetch('/api/get-users')
  if (data.value && data.value.success) {
    users.value = Object.values(data.value.users)
  } else {
    console.error('Error fetching users:', error.value)
  }
})
</script>

<style scoped>
/* Deine Styles hier */
</style>

<style
  scoped>
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
