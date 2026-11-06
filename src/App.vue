<template>
  <Header />
  <RouterView  :key="$route.fullPath"/>
</template>

<script setup>
import Header from "./components/Header.vue"
</script>