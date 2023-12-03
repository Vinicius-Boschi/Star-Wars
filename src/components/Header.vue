<template>
  <header class="header">
    <nav>
      <img src="../assets/logo.png" alt="Star Wars" />
      <ul>
        <li>
          <router-link to="/">Home</router-link>
          <router-link
            v-for="(view, index) in getViews()"
            :key="`route-link-${index}`"
            :to="`/${view.toLowerCase()}`"
          >
            {{ view }}
            <span v-if="index !== getViews().length - 1"></span>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
const context = import.meta.glob("../views/*.vue")

export default {
  name: "Header",

  methods: {
    getViews() {
      const views = Object.keys(context)
        .map((item) => item.match(/\.\/views\/(.+)\.vue$/)[1])
        .filter((item) => item !== "Home")

      return views
    },
  },
}
</script>

<style lang="scss">
  @import "../assets/scss/variables.scss";
  @import "../assets/scss/styles/header.scss";
</style>