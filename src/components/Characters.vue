<template>
  <div class="list">
    <ul>
      <li v-for="(heroe, index) in heroes" :key="index">
        <img
          v-if="!loading && heroe"
          id="image"
          :src="getImageUrl(heroe.id)"
          :alt="heroe.name"
          :data-id="heroe.id"
        />
        <span>{{ heroe.name }}</span>
      </li>
    </ul>
    <div v-if="loading">Loading...</div>
  </div>
</template>

<script>
export default {
  name: "Characters",
  props: [
    "apiUrl"
  ],
  data() {
    return {
      heroes: [],
      currentUrl: "",
      complementUrl: "people",
      loading: true,
      error404: "https://i.pinimg.com/originals/c0/6c/9d/c06c9d63bda3f0a823aee1b2f47b0457.png"
    }
  },
  computed: {
    imageBaseUrl() {
      return "https://starwars-visualguide.com/assets/img/characters/"
    },
  },
  methods: {
    fetchRequision() {
      this.loading = true
      let req = new Request(this.currentUrl + this.complementUrl)
      fetch(req)
        .then((resp) => {
          return resp.json()
        })
        .then((characters) => {
          characters.results.forEach(heroe => {
            heroe.id = heroe.url.split('/')
            .filter((part) => {
              return !!part
            }).pop()
            this.heroes.push(heroe)
          })
          this.loading = false
        })
        .catch((error) => {
          console.log("Error fetching characters" ,error)
          this.loading = false
        });
    },
    getImageUrl(id) {
      if(!id) {
        console.error("Invalid id parameter", id)
        return this.error404 || "Not Found"
      } else {
        const imageUrl = `${this.imageBaseUrl}${id}.jpg`
        return imageUrl
      }
    },
    setHeroesUrl(url) {
      this.$emit("setHeroesUrl", url)
    },
  },
  created() {
    this.currentUrl = this.apiUrl
    this.fetchRequision()
  },
}
</script>

<style lang="scss">
    @import '../assets/scss/variables.scss';
    @import '../assets/scss/styles/characters.scss';
</style>