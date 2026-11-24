<template>
  <main>
    <section class="cards__featured cards__featured--page">
      <div class="cards__heading">
        <h2>My Favorites</h2>
        <p>{{ favorites.length }} Favorites</p>
      </div>

      <p v-if="favorites.length === 0">You don't have any favorites yet.</p>
      <p v-else-if="!isLoading && favoriteItems.length === 0">
        Unable to load your favorites.
      </p>

      <div v-else id="favorites" class="cards__grid">
        <article
          v-for="favorite in favoriteItems"
          :key="`${favorite.type}-${favorite.id}`"
          class="cards__item"
        >
          <div class="cards__media">
            <img
              :src="
                favorite.type === 'movie' || favorite.type === 'planet'
                  ? favorite.image
                    ? getCloudinaryImage(favorite.image)
                    : NotFound
                  : favorite.image || NotFound
              "
              :alt="favorite.name || favorite.title"
              loading="lazy"
              class="cards__image"
              @error="$event.target.src = NotFound"
            />

            <button
              class="cards__favorite"
              :class="{
                'cards__favorite--active': isFavorite(
                  favorite.id,
                  favorite.type,
                ),
              }"
              type="button"
              aria-label="Remove from favorites"
              @click="toggleFavorite(favorite, favorite.type)"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 2.5l2.94 5.95 6.56.95-4.75 4.63 1.12 6.54L12 17.48l-5.87 3.09 1.12-6.54L2.5 9.4l6.56-.95L12 2.5z"
                />
              </svg>
            </button>
          </div>

          <div class="cards__content">
            <h2>{{ favorite.name || favorite.title }}</h2>
            <button
              type="button"
              class="cards__button"
              @click="openFavorite(favorite)"
            >
              View Details
            </button>
          </div>
        </article>
      </div>
      <Modal
        :is-open="!!selectedFavorite"
        :selected-item="selectedFavorite"
        @close="closeFavorite"
      />
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import { useFavorites } from "../composables/useFavorites"
import { getCloudinaryImage } from "../services/cloudinary.js"
import {
  getCharacters,
  getCreatures,
  getDroids,
  getLocations,
  getMovies,
  getOrganizations,
  getPlanets,
  getSpecies,
  getStarships,
  getVehicles,
} from "../services/starWarsApi.js"

import NotFound from "../assets/images/not-found.jpg"
import Modal from "../components/Modal.vue"

const { favorites, loadFavorites, isFavorite, toggleFavorite } = useFavorites()

const selectedFavorite = ref(null)
const isLoading = ref(false)

const dataByType = ref({
  character: [],
  creature: [],
  droid: [],
  location: [],
  movie: [],
  organization: [],
  planet: [],
  species: [],
  starship: [],
  vehicle: [],
})

const apiByType = {
  character: getCharacters,
  creature: getCreatures,
  droid: getDroids,
  location: getLocations,
  movie: getMovies,
  organization: getOrganizations,
  planet: getPlanets,
  species: getSpecies,
  starship: getStarships,
  vehicle: getVehicles,
}

const favoriteItems = computed(() =>
  [...favorites.value]
    .reverse()
    .map((favorite) => {
      const items = dataByType.value[favorite.type] || []

      const item = items.find(
        (item) => String(item.id) === String(favorite.id),
      )

      return item ? { ...item, type: favorite.type } : null
    })
    .filter(Boolean),
)

async function loadFavoriteData() {
  isLoading.value = true

  const favoriteTypes = [
    ...new Set(favorites.value.map((favorite) => favorite.type)),
  ]

  const results = await Promise.allSettled(
    favoriteTypes.map(async (type) => {
      const fetchData = apiByType[type]

      if (!fetchData) return

      const data = await fetchData()

      dataByType.value[type] = data
    }),
  )

  results.forEach((result) => {
    if (result.status === "rejected") {
      console.error("Error loading favorite data:", result.reason)
    }
  })

  isLoading.value = false
}

function openFavorite(favorite) {
  selectedFavorite.value = favorite
}

function closeFavorite() {
  selectedFavorite.value = null
}

onMounted(async () => {
  loadFavorites()
  await loadFavoriteData()
})
</script>