<template>
  <main class="">
    <Header />

    <p v-if="loading">Carregando...</p>

    <p v-else-if="error">
      {{ error }}
    </p>

    <div v-else class="">
      <article v-for="character in characters" :key="character.id" class="">
        <img
          v-if="character.image"
          :src="character.image"
          :alt="character.name"
        />

        <div class="">
          <h2>{{ character.name }}</h2>

          <p v-if="character.description">
            {{ character.description }}
          </p>

          <ul>
            <li><strong>Altura:</strong> {{ character.height }}</li>
            <li><strong>Peso:</strong> {{ character.mass }}</li>
            <li><strong>Nascimento:</strong> {{ character.birth_year }}</li>
            <li><strong>Gênero:</strong> {{ character.gender }}</li>
          </ul>

          <button>Ver detalhes</button>
        </div>
      </article>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { getCharacters } from "../services/starWarsApi"
import Header from "../components/Header.vue"

const loading = ref(true)
const error = ref(null)
const characters = ref([])

async function loadCharacters() {
  loading.value = true
  error.value = null

  try {
    const data = await getCharacters()

    characters.value = Array.isArray(data) ? data : data.results
  } catch (err) {
    console.error(err)
    error.value = "Erro ao carregar personagens."
  } finally {
    loading.value = false
  }
}

onMounted(loadCharacters)
</script>