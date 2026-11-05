<template>
  <header class="header">
    <div class="header__container">
      <nav class="header__navbar">
        <div class="header__action">
          <img src="../assets/images/star-wars-logo.jpg" alt="Logo Star Wars" class="header__logo" />
          <button class="header__button">
            <div class="header__burguer burguer-slip">
              <div class="header__burguer-lines"></div>
            </div>
          </button>
        </div>
        <div class="header__links-container">
          <ul class="header__list">
            <li class="header__links" v-for="item in items" :key="item.name">
              <RouterLink :to="item.route">{{ item.title }}</RouterLink>
            </li>
          </ul>
        </div>
        <div class="header__search">
          <input
            type="search"
            class="header__input"
            placeholder="Pesquise..."
          />
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
const items = [
  { name: "Home", title: "Home", route: "/" },
  { name: "Characters", title: "Characters", route: "/" },
  { name: "Movies", title: "Movies", route: "/movies" },
  { name: "Planets", title: "Planets", route: "/" },
  { name: "Ships", title: "Ships", route: "/" },
  { name: "Vehicle", title: "Vehicles", route: "/" },
  { name: "Specie", title: "Species", route: "/" },
  { name: "Favorites", title: "Favorites", route: "/favorites" },
]
</script>