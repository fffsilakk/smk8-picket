<script setup >
import { RouterView } from 'vue-router'
import './axioInterceptors'
import ToasProvider from './components/ToasProvider.vue';
import DialogProvider from './components/DialogProvider.vue';

</script>

<template>
  <DialogProvider/>
  <ToasProvider/>
  <RouterView />
</template>