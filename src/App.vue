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
      :searchedCharacter="searchedCharacter"
    />
    <Footer />
  </div>
</template>

<script>
<<<<<<< HEAD
import Preloader from "./components/Preloader.vue";
import Header from "./components/Header.vue";
import Search from "./components/Search.vue";
import Footer from "./components/Footer.vue";
import Characters from "./views/Characters.vue";
import { extractIdFromUrl } from "./services/imageHelpers";
=======
import Preloader from "./components/Preloader.vue"
import Header from "./components/Header.vue"
import Search from "./components/Search.vue"
import Footer from "./components/Footer.vue"
import Characters from "./views/Characters.vue"
import { extractIdFromUrl } from "./services/imageHelpers"
>>>>>>> 76e237d54cf98249cefd13e80c326b480c9e13e3

export default {
  name: "App",
  components: {
    Preloader,
    Header,
    Search,
    Footer,
    Characters,
  },

  data() {
    return {
      logo_src: "https://i.gifer.com/N7VV.gif",
      name: "Sabre de Luz",
      apiUrl: "https://swapi.dev/api/",
      currentPage: 1,
      totalPages: 9,
      searchedCharacter: null,
<<<<<<< HEAD
    };
=======
    }
>>>>>>> 76e237d54cf98249cefd13e80c326b480c9e13e3
  },

  methods: {
    loadPreloader() {
<<<<<<< HEAD
      const preloader = document.querySelector(".preloader");
      window.addEventListener("load", () => {
        preloader.classList.add("hide-preloader");
      });
    },

    updateTotalPages(newTotalPages) {
      this.totalPages = newTotalPages;
    },

    handleSearchCharacter(character) {
      this.searchedCharacter = character;
=======
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
>>>>>>> 76e237d54cf98249cefd13e80c326b480c9e13e3
    },

    async handleSearchedCharacters(searchResults) {
      if (searchResults && searchResults.length > 0) {
<<<<<<< HEAD
        const firstResult = searchResults[0];
        this.searchedCharacter = {
          ...firstResult,
          id: extractIdFromUrl(firstResult.url),
        };

        const charactersComponent = this.$refs.charactersComponent;
        if (charactersComponent) {
          charactersComponent.clearCharactersList();
        }
      } else {
        this.searchedCharacter = null;
=======
        const firstResult = searchResults[0]
        this.searchedCharacter = {
          ...firstResult,
          id: extractIdFromUrl(firstResult.url),
        }

        const charactersComponent = this.$refs.charactersComponent
        if (charactersComponent) {
          charactersComponent.clearCharactersList()
        }
      } else {
        this.searchedCharacter = null
>>>>>>> 76e237d54cf98249cefd13e80c326b480c9e13e3
      }
    },

    changePage(newPage) {
<<<<<<< HEAD
      this.$emit("updateTotalPages", newPage);
      this.$nextTick(() => {
        this.currentPage = newPage;
        this.$emit("requestCharacters", { pageNumber: newPage });
      });
=======
      this.$emit("updateTotalPages", newPage)
      this.$nextTick(() => {
        this.currentPage = newPage
        this.$emit("requestCharacters", { pageNumber: newPage })
      })
>>>>>>> 76e237d54cf98249cefd13e80c326b480c9e13e3
    },
  },

  mounted() {
<<<<<<< HEAD
    this.loadPreloader();
  },
  watch: { 
    currentPage() {
      const charactersComponent = this.$refs.charactersComponent;
      if (charactersComponent) {
        charactersComponent.fetchRequisition(this.currentPage);
      }
    },
  },
};
</script>

<style lang="scss">
@use "./assets/scss/app.scss" as *;
=======
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
>>>>>>> 76e237d54cf98249cefd13e80c326b480c9e13e3
</style>