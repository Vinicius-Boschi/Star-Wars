import { createRouter, createWebHistory } from "vue-router"

import Home from "../views/Home.vue"
import Movies from "../components/home/Movies.vue"
import Favorites from "../views/Favorites.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/favorites",
      name: "Favoritos",
      component: Favorites,
    },
    {
      path: "/movies",
      name: "Filmes",
      component: Movies,
    },
  ],
})

export default router