<template>
  <div class="container" id="home">
    <Characters
      :apiUrl="apiUrl"
      @searchedCharacter="handleSearchCharacter"
      :imageBaseUrl="imageBaseUrl"
    />
  </div>
</template>

<script>
import Characters from "../views/Characters.vue"

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
    }
  },
  methods: {
    handleSearchCharacter(character) {
      this.searchedCharacter = character
    },
  },
}
</script>