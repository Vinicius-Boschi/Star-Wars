<template>
  <section ref="planetsSection" class="cards__featured">
    <div class="cards__heading">
      <h2>Highlight Planets</h2>
      <a href="#">See all</a>
    </div>

    <p v-if="loading" class="cards__status">Loading Planets...</p>

    <p v-else-if="error" class="cards__status cards__status--error">
      {{ error }}
    </p>

    <div v-else id="planets" class="cards__grid">
      <article v-for="planet in cards" :key="planet.id" class="cards__item">
        <div class="cards__media">
          <img
            :src="planet.image || NotFound"
            :alt="planet.name"
            loading="lazy"
            class="cards__image"
            @error="$event.target.src = NotFound"
          />

          <button
            class="cards__favorite"
            :class="{
              'cards__favorite--active': isFavorite(planet.id, 'planet'),
            }"
            type="button"
            @click="toggleFavorite(planet, 'planet')"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 2.5l2.94 5.95 6.56.95-4.75 4.63 1.12 6.54L12 17.48l-5.87 3.09 1.12-6.54L2.5 9.4l6.56-.95L12 2.5z"
              />
            </svg>
          </button>
        </div>

        <div class="cards__content">
          <h2>{{ planet.name }}</h2>

          <button type="button" class="cards__button" @click="openPlanet(planet)">
            See Details
          </button>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import { getPlanets } from "../../services/starWarsApi"
import { useFavorites } from "../../composables/useFavorites"

import NotFound from "../../assets/images/not-found.jpg"

const { loadFavorites, isFavorite, toggleFavorite } = useFavorites()

const emit = defineEmits(["open-planet"])

const loading = ref(true)
const error = ref(null)
const planets = ref([])
const planetsSection = ref(null)

const cards = computed(() => planets.value.slice(0, 6))

async function loadPlanets() {
  loading.value = true
  error.value = null

  try {
    const data = await getPlanets()

    planets.value = Array.isArray(data) ? data : data.results || []
  } catch (err) {
    console.error(err)
    error.value = "Erro ao carregar os planetas."
  } finally {
    loading.value = false
  }
}

// Navegation to the planets 
function scrollToPlanets() {
  planetsSection.value?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

// Modal
function openPlanet(planet) {
  emit("open-planet", planet)
}

onMounted(() => {
  loadFavorites()
  loadPlanets()
})
</script>