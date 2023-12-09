<template>
  <div>
    <Preloader :preloader="logo_src" :alt="name" />
    <Header />
    <Search
      :currentPage="currentPage"
      :totalPages="totalPages"
      @changePage="changePage"
      @searchedCharacters="handleSearchedCharacters"
    />
    <router-view
      :apiUrl="apiUrl"
      :currentPage="currentPage"
      :updateTotalPages="updateTotalPages"
    />
    <Footer />
  </div>
</template>

<script>
import Preloader from "./components/Preloader.vue";
import Header from "./components/Header.vue";
import Search from "./components/Search.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Preloader,
    Header,
    Search,
    Footer,
  },

  data() {
    return {
      logo_src: "https://i.gifer.com/N7VV.gif",
      name: "Sabre de Luz",
      apiUrl: "https://swapi.dev/api/",
      currentPage: 1,
      totalPages: 9,
      searchedCharacter: null,
    }
  },

  methods: {
    loadPreloader() {
      const preloader = document.querySelector(".preloader")
      window.addEventListener("load", () => {
        preloader.classList.add("hide-preloader")
      })
    },

    updateTotalPages(newTotalPages) {
      this.totalPages = newTotalPages
    },

    handleSearchCharacter(character) {
      this.searchedCharacter = character
    },

    async handleSearchedCharacters(searchResults) {
      if (searchResults && searchResults.length > 0) {
        const firstResult = searchResults[0]
        firstResult.id = this.extractIdFromUrl(firstResult.url)
        this.searchedCharacter = firstResult
      } else {
        this.searchedCharacter = null
      }
    },

    changePage(newPage) {
      this.$emit("updateTotalPages", newPage)
      this.$nextTick(() => {
        this.currentPage = newPage
        this.$emit("requestCharacters", { pageNumber: newPage })
      })
    },
  },

  mounted() {
    this.loadPreloader()
  },
  watch: {
    currentPage() {
      const charactersComponent = this.$refs.charactersComponent
      if (charactersComponent) {
        charactersComponent.fetchRequisition(this.currentPage)
      }
    },
  },
}
</script>

<style lang="scss">
  @import "./assets/scss/variables.scss";
  @import "./assets/scss/styles/app.scss";
</style>