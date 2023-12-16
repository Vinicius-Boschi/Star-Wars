<template>
  <div v-if="character">
    <img :src="getCharacterImageUrl(character.id)" :alt="character.name" />
    <h2>{{ character.name }}</h2>
    <p>Height: {{ character.height }}</p>
    <p>Mass: {{ character.mass }}</p>
  </div>
  <div v-else>
    <p>No character selected</p>
  </div>
</template>

<script>
import { getImageUrl } from "../services/imageHelpers"

export default {
  computed: {
    character() {
      return this.$store.getters.selectedCharacter
    },
    photo() {
      return this.$store.state.photo
    },
  },
  methods: {
    getCharacterImageUrl(id) {
      if (id) {
        return getImageUrl(id)
      }
      return "https://i.pinimg.com/originals/c0/6c/9d/c06c9d63bda3f0a823aee1b2f47b0457.png"
    },
  },
};
</script>

<style>
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/details.scss";
</style>