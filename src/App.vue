<template>
  <div>
    <Preloader :preloader="logo_src" :alt="name" />
    <Header />
    <router-view :apiUrl="apiUrl" />
    <Footer />
  </div>
</template>

<script>
import Preloader from "./components/Preloader.vue"
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"

export default {
  name: "App",
  components: {
    Preloader,
    Header,
    Footer,
  },

  data() {
    return {
      logo_src: "https://i.gifer.com/N7VV.gif",
      name: "Sabre de Luz",
      apiUrl: "https://swapi.dev/api/",
      searchedCharacter: null,
    };
  },

  methods: {
    loadPreloader() {
      const preloader = document.querySelector(".preloader")
      window.addEventListener("load", () => {
        preloader.classList.add("hide-preloader")
      })
    },
    handleSearchCharacter(character) {
      this.searchedCharacter = character
    },
  },

  mounted() {
    this.loadPreloader()
  },
};
</script>

<style lang="scss">
  @import "./assets/scss/variables.scss";
  @import "./assets/scss/styles/app.scss";
</style>