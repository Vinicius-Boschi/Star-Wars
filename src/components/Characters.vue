<template>
  <div class="list">
    <Search
      :current-page="currentPage"
      :total-pages="totalPages"
      @change-page="changePage"
      @search-characters="searchCharacters"
    />
    <ul>
      <li v-for="(heroe, index) in heroes" :key="index">
        <img
          v-if="!loading && heroe"
          id="image"
          :src="getImageUrl(heroe.id)"
          :alt="heroe.name"
          :data-id="heroe.id"
        />
        <span>{{ heroe.name }}</span>
      </li>
    </ul>
    <div v-if="loading">Loading...</div>
  </div>
</template>

<script>
import Search from "./Search.vue"

export default {
  name: "Characters",
  props: ["apiUrl"],
  components: {
    Search,
  },
  data() {
    return {
      heroes: [],
      currentUrl: "",
      complementUrl: "people",
      loading: true,
      error404:
        "https://i.pinimg.com/originals/c0/6c/9d/c06c9d63bda3f0a823aee1b2f47b0457.png",
      currentPage: 1,
      totalPages: 9,
    }
  },
  computed: {
    imageBaseUrl() {
      return "https://starwars-visualguide.com/assets/img/characters/"
    },
  },
  methods: {
    // Requisição da api e das imagens.
    fetchRequision(pageNumber = this.currentPage) {
      this.loading = true
      this.heroes = []
      let req = new Request(
        `${this.currentUrl}${this.complementUrl}?page=${pageNumber}`
      )
      console.log("Request", req)
      fetch(req)
        .then((resp) => {
          return resp.json()
        })
        .then((characters) => {
          this.totalPages = Math.ceil(characters.count / 10)

          if (characters.results) {
            characters.results.forEach((heroe) => {
              heroe.id = this.extractIdFromUrl(heroe.url)
              this.heroes.push(heroe)
            })
          }
          this.loading = false
          console.log("Update Heroes", this.heroes)
        })
        .catch((error) => {
          console.log("Error fetching characters", error)
          this.loading = false
        })
    },
    getImageUrl(id) {
      if (!id) {
        console.error("Invalid id parameter", id)
        return this.error404 || "Not Found"
      } else {
        const imageUrl = `${this.imageBaseUrl}${id}.jpg`
        return imageUrl
      }
    },
    setHeroesUrl(url) {
      this.$emit("setHeroesUrl", url)
    },
    extractIdFromUrl(url) {
      const parts = url.split("/").filter((part) => !!part)
      return parts.pop()
    },

    // Paginação
    searchCharacters({ searchQuery, currentPage }) {
      // Lógica para buscar personagens com base na pesquisa e na página
      this.currentUrl = `https://swapi.dev/api/people/?search=${searchQuery}`
      this.currentPage = currentPage
      this.fetchRequision()
    },
    changePage(newPage) {
      this.fetchRequision(newPage)
    },
  },

  created() {
    this.currentUrl = this.apiUrl
    this.fetchRequision(this.currentPage)
  },
  watch: {
    currentPage(newPage) {
      this.fetchRequision(newPage)
    },
  },
}
</script>

<style lang="scss">
  @import "../assets/scss/variables.scss";
  @import "../assets/scss/styles/characters.scss";
</style>