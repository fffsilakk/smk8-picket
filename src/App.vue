<script setup >
import { RouterView } from 'vue-router'
import './axioInterceptors'
import ToasProvider from './components/ToasProvider.vue';

</script>

<template>
  <ToasProvider></ToasProvider>
  <RouterView />
</template>