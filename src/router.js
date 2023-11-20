import { defineAsyncComponent } from 'vue'

export const views = import.meta.glob('./views/*.vue')

export const routes = Object.keys(views).map((path) => {
  const name = path.match(/\.\/views\/(.*)\.vue$/)[1]
  return {
    path: `/${name.toLowerCase()}`,
    name: name,
    component: defineAsyncComponent(() => import(path)),
  }
})