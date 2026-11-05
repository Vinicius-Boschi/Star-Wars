<template>
  <main>
    <Banner @explore="scrollToCharacters" />
    <CharactersSection
      ref="charactersSection"
      @open-character="openCharacter"
    />
    <Movies @open-movie="openMovie" />
    <Planets @open-planet="openPlanet" />
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
import { getSpecies } from "../services/starWarsApi"

import Banner from "../components/home/HomeBanner.vue"
import CharactersSection from "../components/home/CharactersSection.vue"
import Movies from "../components/home/Movies.vue"
import Modal from "../components/Modal.vue"
import Planets from "../components/home/Planets.vue"  
import Species from "../components/home/Species.vue"

const selectedItem = ref(null)
const charactersSection = ref(null)
const species = ref([])

const featuredSpecies = computed(() => species.value.slice(0, 6))

async function loadSpecies() {
  try {
    const data = await getSpecies()
    species.value = Array.isArray(data) ? data : data.results || []
  } catch (err) {
    console.error(err)
  }
}

function scrollToCharacters() {
  charactersSection.value?.$el?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
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
})
</script>