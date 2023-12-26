<template>
  <div class="list">
    <ul>
      <li v-for="(starships, index) in displayHeroes" :key="index">
        <img
          v-if="!loading && starships"
          :src="starships.imageUrl"
          :alt="starships.name"
          :data-id="starships.id"
        />
        <router-link :to="{ name: 'Starships', params: { id: starships.id } }">
          <img
            class="icon"
            src="https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/06e5d0d6-d982-47a5-9b83-f278350fb794"
          />
          <span v-if="!loading">{{ starships.name }}</span>
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
import {
  getImageStarshipsUrl,
  extractIdFromUrl,
} from "../services/imageHelpers"

export default {
  name: "Movies",
  props: ["currentPage", "searchedCharacter", "imageBaseUrl"],
  data() {
    return {
      starships: [],
      complementUrl: "starships",
      loading: true,
      totalPages: 0,
    }
  },
  computed: {
    displayHeroes() {
      if (this.searchedCharacter) {
        return [this.searchedCharacter]
      }
      return this.starships
    },
  },
  methods: {
    selectCharacter(characterId) {
      this.$store.dispatch("selectCharacter", characterId)
    },
    async fetchRequisition(pageNumber = this.currentPage) {
      this.loading = true
      this.starships = []

      try {
        const starships = await fetchData(this.complementUrl, pageNumber)
        this.totalPages = Math.ceil(starships.count / 10)

        if (starships.results) {
          this.starships = await Promise.all(
            starships.results.map(async (starships) => {
              starships.id = extractIdFromUrl(starships.url)
              starships.imageUrl = getImageStarshipsUrl(starships.id)
              return starships
            })
          )
        }
      } catch (error) {
        console.error("Error fetching starships", error)
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
        this.starships = results.map((starships) => {
          starships.id = extractIdFromUrl(starships.url)
          starships.imageUrl = this.getStarshipsImageUrl(starships.url)
          return starships
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