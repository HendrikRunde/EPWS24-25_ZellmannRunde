import Dropzone from 'dropzone';
import 'dropzone/dist/dropzone.css';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('dropzone', Dropzone);
});
