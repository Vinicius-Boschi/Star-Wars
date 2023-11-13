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
      error404: "https://i.pinimg.com/originals/c0/6c/9d/c06c9d63bda3f0a823aee1b2f47b0457.png",
      currentPage: 1,
      totalPages: 9
    }
  },
  computed: {
    imageBaseUrl() {
      return "https://starwars-visualguide.com/assets/img/characters/"
    },
  },
  methods: {
    fetchRequision(pageNumber) {
      this.loading = true
      this.heroes = []
      let req = new Request(`${this.currentUrl}${this.complementUrl}?page=${pageNumber}`)
      fetch(req)
        .then((resp) => {
          return resp.json()
        })
        .then((characters) => {
          this.totalPages = Math.ceil(characters.count / 10)
          // this.heroes = characters.results.map((heroe) => ({
          //   ...heroe,
          //   id: this.extractIdFromUrl(heroe.url),
          // }))
          if(characters.results) {
            characters.results.forEach((heroe) => {
              heroe.id = this.extractIdFromUrl(heroe.url)
              this.heroes.push(heroe)
            })
          }
          // characters.results.forEach(heroe => {
          //   heroe.id = heroe.url.split('/')
          //   .filter((part) => {
          //     return !!part
          //   }).pop()
          //   this.heroes.push(heroe)
          // })
          this.loading = false
        })
        .catch((error) => {
          console.log("Error fetching characters" ,error)
          this.loading = false
        })
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
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchRequision(this.currentPage)
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
        this.fetchRequision(this.currentPage)
      }
    },
    extractIdFromUrl(url) {
      const parts = url.split("/").filter((part) => !!part)
      return parts.pop()
    },
  },
  created() {
    this.currentUrl = this.apiUrl
    this.currentPage = 1
    this.fetchRequision(this.currentPage)
  },
}
</script>

<style lang="scss">
    @import '../assets/scss/variables.scss';
    @import '../assets/scss/styles/characters.scss';
</style>