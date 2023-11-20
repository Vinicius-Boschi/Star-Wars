<!-- Header.vue -->
<template>
  <header class="header">
    <nav>
      <img src="../assets/logo.png" alt="Star Wars" />
      <ul>
        <li>
          <router-link :to="page.path" v-for="page in pages" :key="page.name">
          {{ page.name }}
        </router-link>
        </li>
        
      </ul>
    </nav>
    <!-- <router-view /> -->
  </header>
</template>

<script setup>
// O Vite Pages adicionará automaticamente a variável $page à instância do Vue
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { routes } from '../router'; // Importa as rotas criadas dinamicamente

const pages = ref([]);

onMounted(() => {
  const route = useRoute();
  pages.value = routes;
});
</script>

<style lang="scss">
  @import "../assets/scss/variables.scss";
  @import "../assets/scss/styles/header.scss";
</style>