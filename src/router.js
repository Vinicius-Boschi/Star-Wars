import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue"

function loadRoutes() {
  const context = import.meta.glob("./views/*.vue");
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
    ...loadRoutes(),
  ],
})

export default router