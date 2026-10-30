<template>
  <div v-for="favorite in favorites" :key="`${favorite.type}-${favorite.id}`">
    <h1>{{ favorite.name }}</h1>
    <img :src="favorite.image" :alt="favorite.name" />
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import { useFavorites } from "../composables/useFavorites"

const { favorites, loadFavorites, toggleFavorite } = useFavorites()

onMounted(() => {
  loadFavorites()
})
</script>