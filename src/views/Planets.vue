<template>
  <div class="list">
    <ul>
      <li v-for="(planets, index) in displayHeroes" :key="index">
        <img
          v-if="!loading && planets"
          :src="planets.imageUrl"
          :alt="planets.title"
          :data-id="planets.id"
        />
        <router-link :to="{ name: 'Planets', params: { id: planets.id } }">
          <img
            class="icon"
            src="https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/06e5d0d6-d982-47a5-9b83-f278350fb794"
          />
          <span v-if="!loading">{{ planets.name }}</span>
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
import { getImagePlanetsUrl, extractIdFromUrl } from "../services/imageHelpers"

export default {
  name: "Planets",
  props: ["currentPage", "searchedCharacter", "imageBaseUrl"],
  data() {
    return {
      planets: [],
      complementUrl: "planets",
      loading: true,
      totalPages: 0,
    }
  },
  computed: {
    displayHeroes() {
      if (this.searchedCharacter) {
        return [this.searchedCharacter]
      }
      return this.planets
    },
  },
  methods: {
    selectCharacter(characterId) {
      this.$store.dispatch("selectCharacter", characterId)
    },
    async fetchRequisition(pageNumber = this.currentPage) {
      this.loading = true
      this.planets = []

      try {
        const planets = await fetchData(this.complementUrl, pageNumber)
        this.totalPages = Math.ceil(planets.count / 10)

        if (planets.results) {
          this.planets = await Promise.all(
            planets.results.map(async (planet) => {
              planet.id = extractIdFromUrl(planet.url)
              planet.imageUrl = getImagePlanetsUrl(planet.id)
              return planet
            })
          )
        }
      } catch (error) {
        console.error("Error fetching planets", error)
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
        this.planets = results.map((planet) => {
          planet.id = extractIdFromUrl(planet.url)
          planet.imageUrl = this.getImagePlanetsUrl(planet.url)
          return planet
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