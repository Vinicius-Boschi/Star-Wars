<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <div class="header__container">
      <nav class="header__navbar">
        <div class="header__action">
          <img
            src="../assets/images/star-wars-logo.jpg"
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
          <input type="search" class="header__input" placeholder="Search..." />
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true })
  handleScroll()
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