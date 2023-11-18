<template>
  <div class="list">
    <Search
      :currentPage="currentPage"
      :totalPages="totalPages"
      @changePage="changePage"
      @searchedCharacter="handleSearchCharacter"
    />
    <ul>
      <li v-if="searchedCharacter">
        <img
          v-if="!loading"
          id="image"
          :src="getImageUrl(searchedCharacter.id)"
          :alt="searchedCharacter.name"
          :data-id="searchedCharacter.id"
        />
        <span>{{ searchedCharacter.name }}</span>
      </li>

      <li v-else v-for="(hero, index) in heroes" :key="index">
        <img
          v-if="!loading"
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
import Search from "./Search.vue";
import { searchedCharacters } from "../services/searchService";

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
      return "https://starwars-visualguide.com/assets/img/characters/";
    },
  },
  methods: {
    async fetchRequisition(pageNumber = this.currentPage) {
      this.loading = true;
      this.heroes = [];
      let req = new Request(
        `${this.currentUrl}${this.complementUrl}?page=${pageNumber}`
      );

      try {
        const resp = await fetch(req);
        const characters = await resp.json();

        this.totalPages = Math.ceil(characters.count / 10);

        if (characters.results) {
          characters.results.forEach((hero) => {
            hero.id = this.extractIdFromUrl(hero.url);
            this.heroes.push(hero);
          });
        }

        this.searchedCharacter = null;
        this.loading = false;
      } catch (error) {
        console.log("Error fetching characters", error);
        this.loading = false;
      }
    },

    getImageUrl(id) {
      if (id && !isNaN(id)) {
        const imageUrl = `${this.imageBaseUrl}${Number(id)}.jpg`;
        return imageUrl;
      } else {
        console.error("Invalid id parameter", id);
        return this.error404 || "Not Found";
      }
    },

    extractIdFromUrl(url) {
      const parts = url.split("/").filter((part) => !!part);
      return parts.pop();
    },

    async searchedCharacters(searchQuery, currentPage) {
      try {
        const response = await searchedCharacters(searchQuery, currentPage);
        this.heroes = response; // Atualiza a lista padrão com os resultados da busca
        return response;
      } catch (error) {
        console.error("Failed to search characters", error);
        return [];
      }
    },

    handleSearchCharacter(character) {
      this.searchedCharacter = character;
    },

    changePage(newPage) {
      this.$nextTick(() => {
        this.currentPage = newPage;
        this.fetchRequisition();
      });
    },
  },

  created() {
    this.currentUrl = this.apiUrl;
    this.fetchRequisition(this.currentPage);
  },
  watch: {
    currentPage(newPage) {
      this.fetchRequisition(newPage);
    },
  },
};
</script>

<style lang="scss">
  @import "../assets/scss/variables.scss";
  @import "../assets/scss/styles/characters.scss";
</style>