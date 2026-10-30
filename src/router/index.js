import { createRouter, createWebHistory } from "vue-router"

import Home from "../views/Home.vue"
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
  ],
})

export default router