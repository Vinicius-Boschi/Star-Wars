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
      :selected-character="selectedItem"
      @close="closeModal"
    />
  </main>
</template>

<script setup>
import { computed, ref } from "vue"

import Banner from "../components/home/HomeBanner.vue"
import CharactersSection from "../components/home/CharactersSection.vue"
import Movies from "../components/home/Movies.vue"
import Modal from "../components/Modal.vue"

const selectedCharacter = ref(null)
const selectedMovie = ref(null)
const charactersSection = ref(null)

const selectedItem = computed(() => {
  return selectedMovie.value || selectedCharacter.value
})

function scrollToCharacters() {
  charactersSection.value?.$el?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

// Modal
function openCharacter(character) {
  selectedMovie.value = null
  selectedCharacter.value = {
    ...character,
    type: "character",
  }
}

function openMovie(movie) {
  ((selectedCharacter.value = null),
    (selectedMovie.value = {
      ...movie,
      type: "movie",
    }))
}

function closeModal() {
  selectedCharacter.value = null
  selectedMovie.value = null
}
</script>