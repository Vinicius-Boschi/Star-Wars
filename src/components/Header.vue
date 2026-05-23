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
<<<<<<< HEAD

=======
  @import "../assets/scss/variables.scss";
  @import "../assets/scss/styles/header.scss";
>>>>>>> 76e237d54cf98249cefd13e80c326b480c9e13e3
</style>