<template>
  <section ref="moviesSection" class="cards__featured">
    <div class="cards__heading">
      <h2>Filmes em Destaque</h2>
      <a href="#">Ver Todos</a>
    </div>

    <p v-if="loading" class="cards__status">Carregando filmes...</p>

    <p v-else-if="error" class="cards__status cards__status--error">
      {{ error }}
    </p>

    <div v-else id="movies" class="cards__grid">
      <article v-for="movie in cards" :key="movie.id" class="cards__item">
        <div class="cards__media">
          <img
            :src="movie.image || NotFound"
            :alt="movie.name || movie.title"
            loading="lazy"
            class="cards__image"
          />

          <button
            class="cards__favorite"
            :class="{
              'cards__favorite--active': isFavorite(movie.id, 'movie'),
            }"
            type="button"
            @click="toggleFavorite(movie, 'movie')"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 2.5l2.94 5.95 6.56.95-4.75 4.63 1.12 6.54L12 17.48l-5.87 3.09 1.12-6.54L2.5 9.4l6.56-.95L12 2.5z"
              />
            </svg>
          </button>
        </div>

        <div class="cards__content">
          <h2>{{ movie.name || movie.title }}</h2>

          <button type="button" class="cards__button" @click="openMovie(movie)">
            Ver detalhes
          </button>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import { getMovies } from "../../services/starWarsApi"
import { useFavorites } from "../../composables/useFavorites"

import NotFound from "../../assets/images/not-found.jpg"

const { loadFavorites, isFavorite, toggleFavorite } = useFavorites()

const emit = defineEmits(["open-movie"])

const loading = ref(true)
const error = ref(null)
const movies = ref([])
const moviesSection = ref(null)

const cards = computed(() => movies.value.slice(0, 6))

async function loadMovies() {
  loading.value = true
  error.value = null

  try {
    const data = await getMovies()

    movies.value = Array.isArray(data) ? data : data.results || []
  } catch (err) {
    console.error(err)
    error.value = "Erro ao carregar os filmes."
  } finally {
    loading.value = false
  }
}

// Navegação até os personagens
function scrollToMovies() {
  moviesSection.value?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

// Modal
function openMovie(movie) {
  emit("open-movie", movie)
}

onMounted(() => {
  loadFavorites()
  loadMovies()
})
</script>