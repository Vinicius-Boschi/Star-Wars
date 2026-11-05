import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Favorites from "../views/Favorites.vue"
import ListPages from "../views/ListPage.vue"

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
      component: ListPages,
      props: { type: "movies" },
    },
    {
      path: "/planets",
      name: "Planets",
      component: ListPages,
      props: { type: "planets" },
    },
    {
      path: "/species",
      name: "Species",
      component: ListPages,
      props: { type: "species" },
    },
    {
      path: "/characters",
      name: "Characters",
      component: ListPages,
      props: { type: "characters" },
    },
  ],
})

export default router