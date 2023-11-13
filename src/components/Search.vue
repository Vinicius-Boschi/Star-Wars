<template>
  <div class="search">
    <input v-model="searchQuery" type="text" placeholder="Pesquise pelo nome do personagem" />
    <div class="pagination">
      <button class="pagination__button" @click="prevPage" :disabled="currentPage === 1">
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M17.77 3.77L16 2 6 12l10 10 1.77-1.77L9.54 12z"></path>
        </svg>
      </button>
      <button v-for="page in totalPages" :key="page" :class="{ active: page === currentPage}" @click="goToPage(page)">{{ page }}</button>
      <button class="pagination__button" @click="nextPage" :disabled="currentPage === totalPages">
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0V0z"></path>
          <path d="M6.23 20.23L8 22l10-10L8 2 6.23 3.77 14.46 12z"></path>
        </svg>
      </button>
    </div>
    <!-- <div class="list">
    <ul>
      <li v-for="character in characters" :key="character.name">
        <span>{{ character.name }}</span>
      </li>
    </ul>
  </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
        searchQuery: '',
        currentPage: 1,
        totalPages: 9,
        characters: []
    }
  },
  watch: {
    searchQuery: 'searchCharacters',
    currentPage: 'searchCharacters',
  },
  methods: {
    async searchCharacters() {
        try {
            const response = await fetch(
            `https://swapi.dev/api/people/?search=${this.searchQuery}&page=${this.currentPage}`
            )
            const data = await response.json()

            this.characters = []

            this.characters = data.results
            this.totalPages = Math.ceil(data.count / 10)
        } catch (error) {
            console.error('Failed to search the characters', error)
        }
    },
    async prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--
            await this.searchCharacters()
        }
    },
    async nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++
            await this.searchCharacters()
        }
    },
    async goToPage(page) {
        this.currentPage = page
        await this.searchCharacters()
    },
  },
}
</script>

<style lang="scss">
    @import "../assets/scss/variables.scss";
    @import "../assets/scss/styles/search.scss";
</style>
