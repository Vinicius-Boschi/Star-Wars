<template>
  <div class="list">
    <ul>
      <li v-for="(heroe, index) in displayHeroes" :key="index">
          <img
            v-if="!loading && heroe"
            id="image"
            :src="getCharacterImageUrl(heroe.url)"
            :alt="heroe.name"
            :data-id="heroe.id"
          />
          <router-link @click="selectCharacter(heroe)" :to="{ name: 'Details', params: { name: heroe.name } }">
            <span v-if="!loading">{{ heroe.name }}</span>
          </router-link>
      </li>
    </ul>
    <div class="spinning">
      <div v-if="loading" class="loading">
        <img class="gif" src="https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/11ab6385-62f0-49b5-81b4-36cba666cdb1" alt="Loading spinner">
      </div>
    </div>
  </div>
</template>

<script>
import { getImageUrl, extractIdFromUrl } from '../services/imageHelpers'

export default {
  name: "Characters",
  props: ["apiUrl", "currentPage", "searchedCharacter","imageBaseUrl"],
  data() {
    return {
      heroes: [],
      currentUrl: "",
      complementUrl: "people",
      loading: true,
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
    selectCharacter(character) {
      this.$store.dispatch('selectCharacter', character)
    },
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
          this.updateTotalPages(Math.ceil(characters.count / 10))

          if (characters.results) {
            this.heroes = characters.results.map((heroe) => {
              heroe.id = extractIdFromUrl(heroe.url)
              heroe.imageUrl = this.getCharacterImageUrl(heroe.url)
              return heroe
            })
          }
        } else {
          console.error(
            `Invalid content type. Expected JSON. Actual: ${contentType}`
          )
        }

        this.loading = false
      } catch (error) {
        console.error("Error fetching characters", error)
        if (resp) {
          console.log("Response:", await resp.text())
        }
        this.loading = false
      }
    },

    updateTotalPages(newTotalPages) {
      this.totalPages = newTotalPages
    },

    getCharacterImageUrl(url) {
      const characterId = extractIdFromUrl(url);
      return getImageUrl(characterId, this.imageBaseUrl);
    }
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