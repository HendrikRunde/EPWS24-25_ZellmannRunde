<template>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="apple-touch-icon" sizes="76x76" href="/assets/img/apple-icon.png">
    <link rel="icon" type="image/png" href="/assets/img/favicon.png">
    <title>
      shrinkIT
    </title>
  </head>

  <main>
    <div class="g-sidenav-show bg-gray-100">
      <div class="min-height-300 bg-dark position-absolute w-100"></div>
      <div class="main-content position-relative border-radius-lg">
        <slot />
      </div>
    </div>
  </main>
</template>