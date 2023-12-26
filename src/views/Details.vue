<template>
  <div v-if="character && homeworld" class="content">
    <div class="about">
      <div class="characterImage">
        <img :src="getCharacterImageUrl(character.id)" :alt="character.name" />
      </div>
      <div class="list">
        <h2>{{ character.name }}</h2>
        <div class="list-item">
          <p>Height: {{ character.height / 100 }}m</p>
          <p>Mass: {{ character.mass }}kg</p>
          <p>Hair Color: {{ character.hair_color }}</p>
          <p>Skin Color: {{ character.skin_color }}</p>
          <p>Eye Color: {{ character.eye_color }}</p>
          <p>Birth Year: {{ character.birth_year }}</p>
          <p>Gender: {{ character.gender }}</p>
          <p>Homeworld: {{ homeworld.name }}</p>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="films">
        <h3>Films</h3>
        <ul>
          <li v-for="(film, index) in films" :key="index">
            <div class="film-item">
              <img :src="film.imageUrl" :alt="film.title" />
              <p>{{ film.title }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="vehicles">
        <h3>Vehicles</h3>
        <ul>
          <li v-for="(vehicle, index) in vehicles" :key="index">
            <div class="film-item">
              <img :src="vehicle.imageUrl" :alt="vehicle.name" />
              <p>{{ vehicle.name }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="starships">
        <h3>Starships</h3>
        <ul>
          <li v-for="(starship, index) in starships" :key="index">
            <div class="film-item">
              <img :src="starship.imageUrl" :alt="starship.name" />
              <p>{{ starship.name }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div v-else>
    <p>No character selected</p>
  </div>
</template>

<script>
import { fetchData } from "../services/api"
import {
  getImageUrl,
  getImageFilmsUrl,
  getImageVehiclesUrl,
  getImageStarshipsUrl,
  extractIdFromUrl,
} from "../services/imageHelpers"

export default {
  name: "Details",
  data() {
    return {
      homeworld: null,
      films: [],
      vehicles: [],
      starships: [],
    }
  },
  computed: {
    character() {
      return this.$store.getters.selectedCharacter
    },
    photo() {
      return this.$store.state.photo
    },
  },
  methods: {
    getCharacterImageUrl(id) {
      if (id) {
        return getImageUrl(id)
      }
      return "https://i.pinimg.com/originals/c0/6c/9d/c06c9d63bda3f0a823aee1b2f47b0457.png"
    },
    getFilmsUrl(id) {
      if (id) {
        return getImageFilmsUrl(id)
      }
      return "https://i.pinimg.com/originals/c0/6c/9d/c06c9d63bda3f0a823aee1b2f47b0457.png"
    },
    getVehiclesUrl(id) {
      if (id) {
        return getImageVehiclesUrl(id)
      }
      return "https://i.pinimg.com/originals/c0/6c/9d/c06c9d63bda3f0a823aee1b2f47b0457.png"
    },
    getStarshipUrl(id) {
      if (id) {
        return getImageStarshipsUrl(id)
      }
      return "https://i.pinimg.com/originals/c0/6c/9d/c06c9d63bda3f0a823aee1b2f47b0457.png"
    },
  },
  async created() {
    try {
      const characterId = this.$route.params.id
      console.log(characterId)
      this.characterId = await fetchData(`people/${characterId}`)

      const homeworldId = extractIdFromUrl(this.characterId.homeworld)
      const homeworldData = await fetchData(`planets/${homeworldId}`)
      this.homeworld = homeworldData

      this.films = await Promise.all(
        this.characterId.films.map(async (filmUrl) => {
          const filmId = extractIdFromUrl(filmUrl)
          const filmData = await fetchData(`films/${filmId}`)
          const filmObject = {
            ...filmData,
            imageUrl: getImageFilmsUrl(filmId),
          }
          return filmObject
        })
      )

      this.vehicles = await Promise.all(
        this.characterId.vehicles.map(async (vehicleUrl) => {
          const vehicleId = extractIdFromUrl(vehicleUrl)
          const vehicleData = await fetchData(`vehicles/${vehicleId}`)
          const vehicleObject = {
            ...vehicleData,
            imageUrl: getImageVehiclesUrl(vehicleId),
          }
          return vehicleObject
        })
      )

      this.starships = await Promise.all(
        this.characterId.starships.map(async (starshipUrl) => {
          const starshipId = extractIdFromUrl(starshipUrl)
          const starshipData = await fetchData(`starships/${starshipId}`)
          const starshipObject = {
            ...starshipData,
            imageUrl: getImageStarshipsUrl(starshipId),
          }
          return starshipObject
        })
      )
    } catch (error) {
      console.error("Error fetching details", error)
    }
  }
}
</script>

<style lang="scss">
  @import "../assets/scss/variables.scss";
  @import "../assets/scss/styles/details.scss";
</style>