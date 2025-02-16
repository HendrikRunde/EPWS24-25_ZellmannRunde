<template>
  <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4">
    <div class="card">
      <div class="card-body p-3">
        <div class="row">
          <div class="col-8">
            <div class="numbers">
              <p class="text-sm mb-0 text-uppercase font-weight-bold">{{ title }}</p>
              <h5 class="font-weight-bolder">{{ value }}</h5>
              <p class="mb-0">
                <span class="text-success text-sm font-weight-bolder">&nbsp;</span>
                &nbsp;
              </p>
            </div>
          </div>
          <div class="col-4 text-end">
            <div :class="['icon icon-shape shadow-primary text-center rounded-circle', iconBgClass]">
              <i :class="['text-lg opacity-10', iconClass]" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  value: [String, Number],
  iconClass: String,
  iconBgClass: String
})
</script>