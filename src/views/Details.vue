<template>
  <div v-if="character" class="content">
    <div class="characterImage">
      <img :src="getCharacterImageUrl(character.id)" :alt="character.name" />
    </div>
    <div class="list">
      <h2>{{ character.name }}</h2>
      <div class="list-item">
        <p>Height: {{ character.height/100 }}m</p>
        <p>Mass: {{ character.mass }}kg</p>
        <p>Hair Color: {{ character.hair_color }}</p>
        <p>Skin Color: {{ character.skin_color}}</p>
        <p>Eye Color: {{ character.eye_color }}</p>
        <p>Birth Year: {{ character.birth_year }}</p>
        <p>Gender: {{ character.gender }}</p>
        <p>Homeworld: </p>
      </div>
    </div>
  </div>
  <div v-else>
    <p>No character selected</p>
  </div>
</template>

<script>
import { getImageUrl } from "../services/imageHelpers";

export default {
  computed: {
    character() {
      return this.$store.getters.selectedCharacter;
    },
    photo() {
      return this.$store.state.photo;
    },
  },
  methods: {
    getCharacterImageUrl(id) {
      if (id) {
        return getImageUrl(id);
      }
      return "https://i.pinimg.com/originals/c0/6c/9d/c06c9d63bda3f0a823aee1b2f47b0457.png";
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/details.scss";
</style>