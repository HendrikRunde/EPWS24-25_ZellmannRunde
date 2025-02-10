import { NuxtPage } from '../.nuxt/components';
<template>

  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="apple-touch-icon" sizes="76x76" href="/assets/img/apple-icon.png">
    <link rel="icon" type="image/png" href="/assets/img/favicon.png">
    <title>
      shrinkIT
    </title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
    <!-- Nucleo Icons -->
    <link href="https://demos.creative-tim.com/argon-dashboard-pro/assets/css/nucleo-icons.css" rel="stylesheet" />
    <link href="https://demos.creative-tim.com/argon-dashboard-pro/assets/css/nucleo-svg.css" rel="stylesheet" />
    <link id="pagestyle" href="/assets/css/argon-dashboard.css?v=2.1.0" rel="stylesheet" />
  </head>

  <main>
    <div class="g-sidenav-show   bg-gray-100">
      <div class="min-height-300 bg-dark position-absolute w-100"></div>
      <div class="main-content position-relative border-radius-lg ">
        <slot />
      </div>
    </div>
  </main>

</template>
