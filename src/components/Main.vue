<template>
  <div class="container" id="home">
    <Characters
      :apiUrl="apiUrl"
      @setHeroesUrl="setHeroesUrl"
      :imageBaseUrl="imageBaseUrl"
    />
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
      heroesUrl: "",
    }
  },
  methods: {
    setHeroesUrl(url) {
      this.heroesUrl = url
    },
  },
}
</script>