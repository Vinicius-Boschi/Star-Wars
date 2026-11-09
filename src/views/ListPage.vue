<template>
  <main v-if="config">
    <component
      :is="config.component"
      :[config.prop]="items"
      @[config.event]="open"
    />
    <Modal
      :is-open="!!selectedItem"
      :selected-item="selectedItem"
      @close="selectedItem = null"
    />
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
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

import Species from "../components/home/Species.vue"
import Planets from "../components/home/Planets.vue"
import Movies from "../components/home/Movies.vue"
import CharactersSection from "../components/home/CharactersSection.vue"
import Vehicles from "../components/home/Vehicles.vue"
import Starships from "../components/home/Starships.vue"
import Creatures from "../components/home/Creatures.vue"
import Droids from "../components/home/Droids.vue"
import Locations from "../components/home/Locations.vue"
import Organizations from "../components/home/Organizations.vue"
import Modal from "../components/Modal.vue"

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
})

const configs = {
  species: {
    component: Species,
    prop: "species",
    event: "open-species",
    modalType: "species",
    fetchData: getSpecies,
  },
  planets: {
    component: Planets,
    prop: "planets",
    event: "open-planet",
    modalType: "planet",
    fetchData: getPlanets,
  },
  movies: {
    component: Movies,
    prop: "movies",
    event: "open-movie",
    modalType: "movie",
    fetchData: getMovies,
  },
  characters: {
    component: CharactersSection,
    prop: "characters",
    event: "open-character",
    modalType: "character",
    fetchData: getCharacters,
  },
  vehicles: {
    component: Vehicles,
    prop: "vehicles",
    event: "open-vehicle",
    modalType: "vehicle",
    fetchData: getVehicles,
  },
  starships: {
    component: Starships,
    prop: "starships",
    event: "open-starship",
    modalType: "starship",
    fetchData: getStarships,
  },
  creatures: {
    component: Creatures,
    prop: "creatures",
    event: "open-creature",
    modalType: "creature",
    fetchData: getCreatures,
  },
  droids: {
    component: Droids,
    prop: "droids",
    event: "open-droid",
    modalType: "droid",
    fetchData: getDroids,
  },
  locations: {
    component: Locations,
    prop: "locations",
    event: "open-location",
    modalType: "location",
    fetchData: getLocations,
  },
  organizations: {
    component: Organizations,
    prop: "organizations",
    event: "open-organization",
    modalType: "organization",
    fetchData: getOrganizations,
  },
}

const config = computed(() => configs[props.type])

const items = ref([])
const selectedItem = ref(null)

function open(item) {
  selectedItem.value = { ...item, type: config.value.modalType }
}

onMounted(async () => {
  try {
    const data = await config.value.fetchData()
    items.value = Array.isArray(data) ? data : data.results || []
  } catch (err) {
    console.error(`Error loading ${props.type}:`, err)
  }
})
</script>