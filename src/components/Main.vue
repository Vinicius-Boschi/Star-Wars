<template>
  <div class="container" id="home">
    <Characters
      :apiUrl="apiUrl"
      @searchedCharacter="handleSearchCharacter"
      :imageBaseUrl="imageBaseUrl"
    />
    <!-- <div v-if="searchedCharacter">
      <h2>{{ searchedCharacter.name }}</h2>
    </div> -->
  </div>
</template>

<script>
import Characters from "./Characters.vue";

export default {
  name: "Main",
  props: ["imageBaseUrl"],
  components: {
    Characters,
  },
  data() {
    return {
      apiUrl: "https://swapi.dev/api/",
      searchedCharacter: null,
    };
  },
  methods: {
    handleSearchCharacter(character) {
      this.searchedCharacter = character;
    },
  },
};
</script>