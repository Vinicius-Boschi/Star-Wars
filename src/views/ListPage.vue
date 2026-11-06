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
} from "../services/starWarsApi"

import Species from "../components/home/Species.vue"
import Planets from "../components/home/Planets.vue"
import Movies from "../components/home/Movies.vue"
import CharactersSection from "../components/home/CharactersSection.vue"
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