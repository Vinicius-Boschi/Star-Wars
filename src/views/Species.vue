<template>
  <div class="list">
    <ul>
      <li v-for="(species, index) in displayHeroes" :key="index">
        <img
          v-if="!loading && species"
          :src="species.imageUrl"
          :alt="species.title"
          :data-id="species.id"
        />
        <router-link :to="{ name: 'Species', params: { id: species.id } }">
          <img
            class="icon"
            src="https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/06e5d0d6-d982-47a5-9b83-f278350fb794"
          />
          <span v-if="!loading">{{ species.name }}</span>
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
import { getImageSpeciesUrl, extractIdFromUrl } from "../services/imageHelpers"

export default {
  name: "Species",
  props: ["currentPage", "searchedCharacter", "imageBaseUrl"],
  data() {
    return {
      species: [],
      complementUrl: "species",
      loading: true,
      totalPages: 0,
    }
  },
  computed: {
    displayHeroes() {
      if (this.searchedCharacter) {
        return [this.searchedCharacter]
      }
      return this.species
    },
  },
  methods: {
    selectCharacter(characterId) {
      this.$store.dispatch("selectCharacter", characterId)
    },
    async fetchRequisition(pageNumber = this.currentPage) {
      this.loading = true
      this.species = []

      try {
        const species = await fetchData(this.complementUrl, pageNumber)
        this.totalPages = Math.ceil(species.count / 10)

        if (species.results) {
          this.species = await Promise.all(
            species.results.map(async (species) => {
              species.id = extractIdFromUrl(species.url)
              species.imageUrl = getImageSpeciesUrl(species.id)
              return species
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
        this.species = results.map((species) => {
          species.id = extractIdFromUrl(species.url)
          species.imageUrl = this.getImageSpeciesUrl(species.url)
          return species
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