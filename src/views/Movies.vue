<template>
  <div>
    <h1>Movies</h1>
    <div v-for="movie in movies" :key="movie.id">
      <h2>{{ movie.title }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "Movies",
  data() {
    return {
      movies: [],
    }
  },
  methods: {
    
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
</style>