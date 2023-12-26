<template>
  <div class="list">
    <ul>
      <li v-for="(films, index) in displayHeroes" :key="index">
        <img
          v-if="!loading && films"
          :src="films.imageUrl"
          :alt="films.title"
          :data-id="films.id"
        />
        <router-link :to="{ name: 'Movies', params: { id: films.id } }">
          <img
            class="icon"
            src="https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/06e5d0d6-d982-47a5-9b83-f278350fb794"
          />
          <span v-if="!loading">{{ films.title }}</span>
          <img
            class="icon"
            src="https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/e96245a6-5e2d-4ecb-a7bf-2a9b2e087745"
          />
        </router-link>
      </li>
    </ul>
    <div class="spinning">
      <div v-if="loading" class="loading">
        <img
          class="gif"
          src="https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/11ab6385-62f0-49b5-81b4-36cba666cdb1"
          alt="Loading spinner"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { fetchData } from "../services/api"
import { getImageFilmsUrl, extractIdFromUrl } from "../services/imageHelpers"

export default {
  name: "Movies",
  props: ["currentPage", "searchedCharacter", "imageBaseUrl"],
  data() {
    return {
      films: [],
      complementUrl: "films",
      loading: true,
      totalPages: 0,
    }
  },
  computed: {
    displayHeroes() {
      if (this.searchedCharacter) {
        return [this.searchedCharacter]
      }
      return this.films
    },
  },
  methods: {
    selectCharacter(characterId) {
      this.$store.dispatch("selectCharacter", characterId)
    },
    async fetchRequisition(pageNumber = this.currentPage) {
      this.loading = true
      this.films = []

      try {
        const films = await fetchData(this.complementUrl, pageNumber)
        this.totalPages = Math.ceil(films.count / 10)

        if (films.results) {
          this.films = await Promise.all(
            films.results.map(async (film) => {
              film.id = extractIdFromUrl(film.url)
              film.imageUrl = getImageFilmsUrl(film.id)
              return film
            })
          )
        }
      } catch (error) {
        console.error("Error fetching films", error)
      } finally {
        this.loading = false
      }
    },

    handleSearchedCharacters(results) {
      this.loading = false

      if (results === null) {
        this.searchedCharacter = null
        this.fetchRequisition(this.currentPage)
      } else {
        this.films = results.map((film) => {
          film.id = extractIdFromUrl(film.url)
          film.imageUrl = this.getCharacterImageUrl(film.url)
          return film
        })
      }
    },
  },

  created() {
    this.fetchRequisition(this.currentPage)
  },
  watch: {
    currentPage() {
      this.fetchRequisition(this.currentPage)
    },
    totalPages(newTotalPages) {
      this.totalPages = newTotalPages
    },
  },
}
</script>

<style lang="scss">
  @import "../assets/scss/variables.scss";
  @import "../assets/scss/styles/characters.scss";
</style>