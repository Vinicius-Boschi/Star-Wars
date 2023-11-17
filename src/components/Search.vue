<template>
  <div class="search">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Pesquise pelo nome do personagem"
    />
    <div class="pagination">
      <button
        class="pagination__button"
        @click="prevPage"
        :disabled="currentPage === 1"
      >
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
      <button
        v-for="page in totalPages"
        :key="page"
        :class="{ active: page === currentPage }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
      <button
        class="pagination__button"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
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
  </div>
</template>

<script>
export default {
  props: {
    currentPage: Number
  },
  data() {
    return {
      searchQuery: "",
      totalPages: 9,
    }
  },
  watch: {
    searchQuery: "searchCharacters",
  },
  methods: {
    searchCharacters() {
      this.$emit("search-characters", {
        searchQuery: this.searchQuery,
        currentPage: 1,
      })
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit("change-page", this.currentPage + 1)
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.$emit("change-page", this.currentPage - 1)
      }
    },
    goToPage(page) {
      this.$emit("change-page", page)
    },
  },
}
</script>

<style lang="scss">
  @import "../assets/scss/variables.scss";
  @import "../assets/scss/styles/search.scss";
</style>