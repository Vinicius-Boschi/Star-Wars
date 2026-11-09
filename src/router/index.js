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
    {
      path: "/vehicles",
      name: "Vehicles",
      component: ListPages,
      props: { type: "vehicles" },
    },
    {
      path: "/starships",
      name: "Starships",
      component: ListPages,
      props: { type: "starships" },
    },
    {
      path: "/creatures",
      name: "Creatures",
      component: ListPages,
      props: { type: "creatures" },
    },
    {
      path: "/droids",
      name: "Droids",
      component: ListPages,
      props: { type: "droids" },
    },
    {
      path: "/locations",
      name: "Locations",
      component: ListPages,
      props: { type: "locations" },
    },
    {
      path: "/organizations",
      name: "Organizations",
      component: ListPages,
      props: { type: "organizations" },
    },
  ],
})

export default router