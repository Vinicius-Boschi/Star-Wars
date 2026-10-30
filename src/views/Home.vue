<template>
  <main>
    <Banner @explore="scrollToCharacters" />
    <CharactersSection
      ref="charactersSection"
      @open-character="openCharacter"
    />
    <Modal
      :is-open="!!selectedCharacter"
      :selected-character="selectedCharacter"
      @close="closeCharacter"
    />
  </main>
</template>

<script setup>
import { ref } from "vue"

import Banner from "../components/home/HomeBanner.vue"
import CharactersSection from "../components/home/CharactersSection.vue"
import Modal from "../components/Modal.vue"

const selectedCharacter = ref(null)
const charactersSection = ref(null)

function scrollToCharacters() {
  charactersSection.value?.$el?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

// Modal
function openCharacter(character) {
  selectedCharacter.value = character
}

function closeCharacter() {
  selectedCharacter.value = null
}
</script>