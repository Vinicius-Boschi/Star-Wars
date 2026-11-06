<template>
  <main>
    <Banner />
    <CharactersSection
      ref="charactersSection"
      :characters="featuredCharacters"
      @open-character="openCharacter"
    />
    <Movies @open-movie="openMovie" :movies="featuredMovies" />
    <Planets @open-planet="openPlanet" :planets="featuredPlanets" />
    <Species @open-species="openSpecies" :species="featuredSpecies" />
    <Modal
      :is-open="!!selectedItem"
      :selected-item="selectedItem"
      @close="closeModal"
    />
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import {
  getSpecies,
  getPlanets,
  getMovies,
  getCharacters,
} from "../services/starWarsApi"

import Banner from "../components/home/HomeBanner.vue"
import CharactersSection from "../components/home/CharactersSection.vue"
import Movies from "../components/home/Movies.vue"
import Modal from "../components/Modal.vue"
import Planets from "../components/home/Planets.vue"
import Species from "../components/home/Species.vue"

const selectedItem = ref(null)
const species = ref([])
const planets = ref([])
const movies = ref([])
const characters = ref([])
const error = ref(null)
const loading = ref(false)

const featuredSpecies = computed(() => species.value.slice(0, 6))
const featuredPlanets = computed(() => planets.value.slice(0, 6))
const featuredMovies = computed(() => movies.value.slice(0, 6))
const featuredCharacters = computed(() => characters.value.slice(0, 6))

async function loadSpecies() {
  try {
    const data = await getSpecies()
    species.value = Array.isArray(data) ? data : data.results || []
  } catch (err) {
    console.error(err)
  }
}

async function loadPlanets() {
  error.value = null
  loading.value = true

  try {
    planets.value = await getPlanets()
  } catch (err) {
    console.error(err)
    error.value = "Error to load the planets. "
  } finally {
    loading.value = false
  }
}

async function loadMovies() {
  try {
    const data = await getMovies()
    movies.value = Array.isArray(data) ? data : data?.results || []
  } catch (err) {
    console.error(err)
  }
}

async function loadCharacters() {
  try {
    const data = await getCharacters()
    characters.value = Array.isArray(data) ? data : data.results || []
  } catch (err) {
    console.error(err)
  }
}

// Modal
function openItem(item, type) {
  selectedItem.value = {
    ...item,
    type,
  }
}

function openCharacter(character) {
  openItem(character, "character")
}

function openMovie(movie) {
  openItem(movie, "movie")
}

function openPlanet(planet) {
  openItem(planet, "planet")
}

function openSpecies(species) {
  openItem(species, "species")
}

function closeModal() {
  selectedItem.value = null
}

onMounted(() => {
  loadSpecies()
  loadPlanets()
  loadMovies()
  loadCharacters()
})
</script>