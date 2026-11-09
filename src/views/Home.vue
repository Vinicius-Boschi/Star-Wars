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
    <Vehicles @open-vehicle="openVehicle" :vehicles="featuredVehicles" />
    <Starships @open-starship="openStarship" :starships="featuredStarships" />
    <Creatures @open-creature="openCreature" :creatures="featuredCreatures" />
    <Droids @open-droid="openDroid" :droids="featuredDroids" />
    <Locations @open-location="openLocation" :locations="featuredLocations" />
    <Organizations
      @open-organization="openOrganization"
      :organizations="featuredOrganizations"
    />
    <Infos />
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
  getVehicles,
  getStarships,
  getCreatures,
  getDroids,
  getLocations,
  getOrganizations,
} from "../services/starWarsApi"

import Banner from "../components/home/HomeBanner.vue"
import CharactersSection from "../components/home/CharactersSection.vue"
import Movies from "../components/home/Movies.vue"
import Modal from "../components/Modal.vue"
import Planets from "../components/home/Planets.vue"
import Species from "../components/home/Species.vue"
import Vehicles from "../components/home/Vehicles.vue"
import Starships from "../components/home/Starships.vue"
import Creatures from "../components/home/Creatures.vue"
import Droids from "../components/home/Droids.vue"
import Locations from "../components/home/Locations.vue"
import Organizations from "../components/home/Organizations.vue"
import Infos from "../views/Infos.vue"

const selectedItem = ref(null)
const species = ref([])
const planets = ref([])
const movies = ref([])
const characters = ref([])
const vehicles = ref([])
const starships = ref([])
const creatures = ref([])
const droids = ref([])
const locations = ref([])
const organizations = ref([])
const error = ref(null)
const loading = ref(false)

const featuredSpecies = computed(() => species.value.slice(0, 6))
const featuredPlanets = computed(() => planets.value.slice(0, 6))
const featuredMovies = computed(() => movies.value.slice(0, 6))
const featuredCharacters = computed(() => characters.value.slice(0, 6))
const featuredVehicles = computed(() => vehicles.value.slice(0, 6))
const featuredStarships = computed(() => starships.value.slice(0, 6))
const featuredCreatures = computed(() => creatures.value.slice(0, 6))
const featuredDroids = computed(() => droids.value.slice(0, 6))
const featuredLocations = computed(() => locations.value.slice(0, 6))
const featuredOrganizations = computed(() => organizations.value.slice(0, 6))

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

async function loadVehicles() {
  try {
    const data = await getVehicles()
    vehicles.value = Array.isArray(data) ? data : data.results || []
  } catch (err) {
    console.error(err)
  }
}

async function loadStarships() {
  try {
    const data = await getStarships()
    starships.value = Array.isArray(data) ? data : data.results || []
  } catch (err) {
    console.error(err)
  }
}

async function loadCreatures() {
  try {
    const data = await getCreatures()
    creatures.value = Array.isArray(data) ? data : data.results || []
  } catch (err) {
    console.error(err)
  }
}

async function loadDroids() {
  try {
    const data = await getDroids()
    droids.value = Array.isArray(data) ? data : data.results || []
  } catch (err) {
    console.error(err)
  }
}

async function loadLocations() {
  try {
    const data = await getLocations()
    locations.value = Array.isArray(data) ? data : data.results || []
  } catch (err) {
    console.error(err)
  }
}

async function loadOrganizations() {
  try {
    const data = await getOrganizations()
    organizations.value = Array.isArray(data) ? data : data.results || []
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

function openVehicle(vehicle) {
  openItem(vehicle, "vehicle")
}

function openStarship(starship) {
  openItem(starship, "starship")
}

function openCreature(creature) {
  openItem(creature, "creature")
}

function openDroid(droid) {
  openItem(droid, "droid")
}

function openLocation(location) {
  openItem(location, "location")
}

function openOrganization(organization) {
  openItem(organization, "organization")
}

function closeModal() {
  selectedItem.value = null
}

onMounted(() => {
  loadSpecies()
  loadPlanets()
  loadMovies()
  loadCharacters()
  loadVehicles()
  loadStarships()
  loadCreatures()
  loadDroids()
  loadLocations()
  loadOrganizations()
})
</script>