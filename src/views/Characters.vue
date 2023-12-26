<template>
  <div class="list">
    <ul>
      <li v-for="(heroe, index) in displayHeroes" :key="index">
        <img
          v-if="!loading && heroe"
          :src="getCharacterImageUrl(heroe.url)"
          :alt="heroe.name"
          :data-id="heroe.id"
        />
        <router-link
          @click="selectCharacter(heroe)"
          :to="{ name: 'Details', params: { id: heroe.id } }"
        >
          <img
            class="icon"
            src="https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/06e5d0d6-d982-47a5-9b83-f278350fb794"
          />
          <span v-if="!loading">{{ heroe.name }}</span>
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
import { getImageUrl, extractIdFromUrl } from "../services/imageHelpers"

export default {
  name: "Characters",
  props: ["currentPage", "searchedCharacter", "imageBaseUrl"],
  data() {
    return {
      heroes: [],
      complementUrl: "people",
      loading: true,
      totalPages: 0,
    }
  },
  computed: {
    displayHeroes() {
      if (this.searchedCharacter) {
        return [this.searchedCharacter]
      }
      return this.heroes
    },
  },
  methods: {
    selectCharacter(characterId) {
      this.$store.dispatch("selectCharacter", characterId)
    },
    async fetchRequisition(pageNumber = this.currentPage) {
      this.loading = true
      this.heroes = []

      try {
        const characters = await fetchData(this.complementUrl, pageNumber)
        this.totalPages = Math.ceil(characters.count / 10)

        if (characters.results) {
          this.heroes = characters.results.map((heroe) => {
            heroe.id = extractIdFromUrl(heroe.url)
            heroe.imageUrl = this.getCharacterImageUrl(heroe.url)
            return heroe
          })
        }
      } catch (error) {
        console.error("Error fetching characters", error)
      } finally {
        this.loading = false
      }
    },

    getCharacterImageUrl(url) {
      const characterId = extractIdFromUrl(url)
      return getImageUrl(characterId, this.imageBaseUrl)
    },

    handleSearchedCharacters(results) {
      this.loading = false

      if (results === null) {
        this.searchedCharacter = null
        this.fetchRequisition(this.currentPage)
      } else {
        this.heroes = results.map((heroe) => {
          heroe.id = extractIdFromUrl(heroe.url)
          heroe.imageUrl = this.getCharacterImageUrl(heroe.url)
          return heroe
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