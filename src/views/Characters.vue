<template>
  <div class="list">
    <Search
      :currentPage="currentPage"
      :totalPages="totalPages"
      @changePage="changePage"
      @searchedCharacters="handleSearchedCharacters"
    />
    <ul>
      <li v-if="searchedCharacter">
        <img
          v-if="!loading && searchedCharacter"
          id="image"
          :src="getImageUrl(searchedCharacter.id)"
          :alt="searchedCharacter.name"
          :data-id="searchedCharacter.id"
        />
        <span>{{ searchedCharacter.name }}</span>
      </li>

      <li v-else v-for="(hero, index) in heroes" :key="index">
        <img
          v-if="!loading && hero"
          id="image"
          :src="getImageUrl(hero.id)"
          :alt="hero.name"
          :data-id="hero.id"
        />
        <span>{{ hero.name }}</span>
      </li>
    </ul>
    <div v-if="loading">Loading...</div>
  </div>
</template>

<script>
import Search from "../components/Search.vue";

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
      searchedCharacter: null,
    };
  },
  computed: {
    imageBaseUrl() {
      return "https://starwars-visualguide.com/assets/img/characters/"
    },
  },
  methods: {
    async fetchRequisition(pageNumber = this.currentPage) {
      this.loading = true
      this.heroes = []

      if (!this.apiUrl) {
        console.error("API URL is not defined.")
        this.loading = false
        return
      }
      let req = new Request(
        `${this.currentUrl}${this.complementUrl}?page=${pageNumber}`
      )

      let resp

      try {
        resp = await fetch(req)

        if (!resp.ok) {
          throw new Error(`HTTP error! Status: ${resp.status}`)
        }

        const contentType = resp.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          const characters = await resp.json()
          this.totalPages = Math.ceil(characters.count / 10)

          if (characters.results) {
            this.heroes = characters.results.map((hero) => {
              hero.id = this.extractIdFromUrl(hero.url)
              return hero
            })
          }
        } else {
          console.error(
            `Invalid content type. Expected JSON. Actual: ${contentType}`
          )
        }

        this.searchedCharacter = null
        this.loading = false
      } catch (error) {
        console.error("Error fetching characters", error)
        if (resp) {
          console.log("Response:", await resp.text())
        }
        this.loading = false
      }
    },

    getImageUrl(id) {
      if (id && !isNaN(id)) {
        const imageUrl = `${this.imageBaseUrl}${Number(id)}.jpg`
        return imageUrl
      } else {
        console.error("Invalid id parameter", id)
        return this.error404 || "Not Found"
      }
    },

    extractIdFromUrl(url) {
      const parts = url.split("/").filter((part) => !!part)
      return parts.pop()
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
      this.$nextTick(() => {
        this.currentPage = newPage
        this.fetchRequisition()
      })
    },
  },

  created() {
    if (this.$props.apiUrl && typeof this.$props.apiUrl === "string") {
      this.currentUrl = this.$props.apiUrl
      this.fetchRequisition(this.currentPage)
    } else {
      console.error(
        "this.$props.apiUrl não é uma string válida ou está indefinida."
      )
    }
  },
  watch: {
    currentPage(newPage) {
      this.fetchRequisition(newPage)
    },
  },
}
</script>

<style lang="scss">
  @import "../assets/scss/variables.scss";
  @import "../assets/scss/styles/characters.scss";
</style>