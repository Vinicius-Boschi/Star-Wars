<template>
  <main>
    <Banner @explore="scrollToCharacters" />
    <CharactersSection
      ref="charactersSection"
      @open-character="openCharacter"
    />
    <Movies @open-movie="openMovie" />
    <Modal
      :is-open="!!selectedItem"
      :selected-item="selectedItem"
      @close="closeModal"
    />
  </main>
</template>

<script setup>
import { ref } from "vue"

import Banner from "../components/home/HomeBanner.vue"
import CharactersSection from "../components/home/CharactersSection.vue"
import Movies from "../components/home/Movies.vue"
import Modal from "../components/Modal.vue"

const selectedItem = ref(null)
const charactersSection = ref(null)

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

function closeModal() {
  selectedItem.value = null
}
</script>