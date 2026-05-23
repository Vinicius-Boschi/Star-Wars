import { createRouter, createWebHistory } from "vue-router"
import Home from "./views/Home.vue"
import Details from "./views/Details.vue"

function loadRoutes() {
  const context = import.meta.glob("./views/*.vue")
  return Object.keys(context)
    .map((fileName) => fileName.match(/\.\/views\/(.+)\.vue$/)[1])
    .filter((componentName) => componentName !== "Home")
    .map((componentName) => ({
      path: `/${componentName.toLowerCase()}`,
      name: componentName.toLowerCase(),
      component: () => import(`./views/${componentName}.vue`),
    }))
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/details/:id",
      name: "Details",
      component: Details,
      props: true,
    },
    // {
    //   path: '/details/movies/:id',
    //   name: 'Movies',
    //   component: Movies,
    // },
    // {
    //   path: '/details/vehicles/:id',
    //   name: 'Vehicles',
    //   component: Vehicles,
    // },
    // {
    //   path: '/details/starships/:id',
    //   name: 'Starships',
    //   component: Starships,
    // },
    // {
    //   path: '/details/species/:id',
    //   name: 'Species',
    //   component: Species,
    // },
    // {
    //   path: '/details/planets/:id',
    //   name: 'Planets',
    //   component: Planets,
    // },
    ...loadRoutes(),
  ],
})

export default router