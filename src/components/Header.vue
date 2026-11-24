<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <div class="header__container">
      <nav class="header__navbar">
        <div class="header__action">
          <img
            src="../assets/images/star-wars-logo.png"
            alt="Logo Star Wars"
            class="header__logo"
          />
          <button class="header__button">
            <div class="header__burguer burguer-slip">
              <div class="header__burguer-lines"></div>
            </div>
          </button>
        </div>
        <div class="header__links-container">
          <ul class="header__list">
            <li class="header__links" v-for="item in items" :key="item.name">
              <RouterLink class="animation" :to="item.route">{{
                item.title
              }}</RouterLink>
            </li>
          </ul>
        </div>
        <div class="header__search">
          <input
            v-model="searchQuery"
            type="search"
            class="header__input"
            placeholder="Search..."
            autocomplete="off"
          />
          <div v-if="searchQuery.trim()" class="header__results">
            <button
              v-for="item in searchResults"
              :key="`${item.type} - ${item.id}`"
              type="button"
              class="header__result"
              @click="openSearchResults(item)"
            >
              <span>{{ item.name || item.title }}</span>
              <small>{{ item.category }}</small>
            </button>
            <p v-if="searchResults.length === 0">No results found.</p>
          </div>
        </div>
      </nav>
    </div>
  </header>
  <Modal
    :is-open="!!selectedItem"
    :selected-item="selectedItem"
    @close="selectedItem = null"
  />
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue"
import Modal from "../components/Modal.vue"

import {
  getCharacters,
  getCreatures,
  getDroids,
  getLocations,
  getMovies,
  getOrganizations,
  getPlanets,
  getSpecies,
  getStarships,
  getVehicles,
} from "../services/starWarsApi.js"

const isScrolled = ref(false)
const searchQuery = ref("")
const allItems = ref([])
const selectedItem = ref(null)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

function normalizeText(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
}

const searchResults = computed(() => {
  const query = normalizeText(searchQuery.value)

  if (!query) return []

  return allItems.value
    .filter((item) => {
      const name = normalizeText(item.name || item.title)
      return name.includes(query)
    })
    .slice(0, 8)
})

async function loadSearchItems() {
  const categories = [
    { type: "character", category: "Characters", fetch: getCharacters },
    { type: "creature", category: "Creatures", fetch: getCreatures },
    { type: "droids", category: "Droids", fetch: getDroids },
    { type: "location", category: "Locations", fetch: getLocations },
    { type: "movie", category: "Movies", fetch: getMovies },
    {
      type: "organization",
      category: "Organizations",
      fetch: getOrganizations,
    },
    { type: "planet", category: "Planets", fetch: getPlanets },
    { type: "starship", category: "Ships", fetch: getStarships },
    { type: "species", category: "Species", fetch: getSpecies },
    { type: "vehicle", category: "Vehicles", fetch: getVehicles },
  ]

  const results = await Promise.allSettled(
    categories.map(async ({ type, category, fetch }) => {
      const data = await fetch()

      return (Array.isArray(data) ? data : []).map((item) => ({
        ...item,
        type,
        category,
      }))
    }),
  )

  allItems.value = results
    .filter((result) => result.status === "fulfilled")
    .flatMap((result) => result.value)
}

function openSearchResults(item) {
  selectedItem.value = item
  searchQuery.value = ""
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true })
  handleScroll()
  loadSearchItems()
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})

const items = [
  { name: "Home", title: "Home", route: "/" },
  { name: "Characters", title: "Characters", route: "/characters" },
  { name: "Creatures", title: "Creatures", route: "/creatures" },
  { name: "Droids", title: "Droids", route: "/droids" },
  { name: "Favorites", title: "Favorites", route: "/favorites" },
  { name: "Locations", title: "Locations", route: "/locations" },
  { name: "Movies", title: "Movies", route: "/movies" },
  { name: "Organizations", title: "Organizations", route: "/organizations" },
  { name: "Planets", title: "Planets", route: "/planets" },
  { name: "Ships", title: "Ships", route: "/starships" },
  { name: "Specie", title: "Species", route: "/species" },
  { name: "Vehicle", title: "Vehicles", route: "/vehicles" },
]
</script>
