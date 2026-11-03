import { createRouter, createWebHistory } from "vue-router"

import Home from "../views/Home.vue"
import Movies from "../components/home/Movies.vue"
import Planets from "../components/home/Planets.vue"
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
      name: "Favorites",
      component: Favorites,
    },
    {
      path: "/movies",
      name: "Movies",
      component: Movies,
    },
        {
      path: "/planets",
      name: "Planets",
      component: Planets,
    },
  ],
})

export default router