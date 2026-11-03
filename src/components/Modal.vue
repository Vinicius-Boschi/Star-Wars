<template>
  <div v-if="isOpen && selectedItem" class="modal">
    <div class="modal__container" @click.self="$emit('close')">
      <div
        class="modal__content"
        role="dialog"
        aria-modal="true"
        :aria-label="`Detalhes de ${selectedItem.title || selectedItem.name}`"
      >
        <button
          class="modal__close"
          type="button"
          aria-label="Fechar modal"
          @click="$emit('close')"
        >
          &times
        </button>

        <img
          :src="
            selectedItem.type === 'movie'
              ? movieImages[selectedItem.episode_id] || NotFound
              : selectedItem.image || NotFound
          "
          :alt="selectedItem.title || selectedItem.name"
          class="modal__image"
          @error="$event.target.src = NotFound"
        />

        <h2>{{ selectedItem.title || selectedItem.name }}</h2>

        <span class="modal__type">
          {{ selectedItem.type }}
        </span>

        <ul class="modal__info">
          <!-- Personagens -->
          <template v-if="selectedItem.type === 'character'">
            <li v-if="selectedItem.height">
              <strong>Height:</strong> {{ selectedItem.height }}
            </li>

            <li v-if="selectedItem.mass">
              <strong>Mass:</strong> {{ selectedItem.mass }}
            </li>

            <li v-if="selectedItem.gender">
              <strong>Gender:</strong> {{ selectedItem.gender }}
            </li>

            <li v-if="selectedItem.birth_year">
              <strong>Birth Year:</strong> {{ selectedItem.birth_year }}
            </li>
          </template>

          <!-- Filmes -->
          <template v-else-if="selectedItem.type === 'movie'">
            <li v-if="selectedItem.release_date">
              <strong>Release Date:</strong> {{ selectedItem.release_date }}
            </li>

            <li v-if="selectedItem.director">
              <strong>Director:</strong> {{ selectedItem.director }}
            </li>

            <li v-if="selectedItem.producer">
              <strong>Producer:</strong> {{ selectedItem.producer }}
            </li>
          </template>

          <!-- Planetas -->
          <template v-else-if="selectedItem.type === 'planet'">
            <li v-if="selectedItem.climate">
              <strong>Weather:</strong> {{ selectedItem.climate }}
            </li>

            <li v-if="selectedItem.terrain">
              <strong>Terrain:</strong> {{ selectedItem.terrain }}
            </li>

            <li v-if="selectedItem.population">
              <strong>Population:</strong> {{ selectedItem.population }}
            </li>
          </template>

          <!-- Espécies -->
          <template v-else-if="selectedItem.type === 'species'">
            <li v-if="selectedItem.classification">
              <strong>Classification:</strong>
              {{ selectedItem.classification }}
            </li>

            <li v-if="selectedItem.language">
              <strong>Language:</strong> {{ selectedItem.language }}
            </li>

            <li v-if="selectedItem.average_lifespan">
              <strong>Average Lifespan:</strong>
              {{ selectedItem.average_lifespan }}
            </li>
          </template>

          <!-- Naves -->
          <template v-else-if="selectedItem.type === 'starship'">
            <li v-if="selectedItem.model">
              <strong>Model:</strong> {{ selectedItem.model }}
            </li>

            <li v-if="selectedItem.manufacturer">
              <strong>Manufacturer:</strong> {{ selectedItem.manufacturer }}
            </li>

            <li v-if="selectedItem.starship_class">
              <strong>Class:</strong> {{ selectedItem.starship_class }}
            </li>

            <li v-if="selectedItem.max_atmosphering_speed">
              <strong>Max Atmosphering Speed:</strong>
              {{ selectedItem.max_atmosphering_speed }}
            </li>
          </template>

          <!-- Veículos -->
          <template v-else-if="selectedItem.type === 'vehicle'">
            <li v-if="selectedItem.model">
              <strong>Model:</strong> {{ selectedItem.model }}
            </li>

            <li v-if="selectedItem.manufacturer">
              <strong>Manufacturer:</strong> {{ selectedItem.manufacturer }}
            </li>

            <li v-if="selectedItem.vehicle_class">
              <strong>Class:</strong> {{ selectedItem.vehicle_class }}
            </li>

            <li v-if="selectedItem.max_atmosphering_speed">
              <strong>Max Atmosphering Speed:</strong>
              {{ selectedItem.max_atmosphering_speed }}
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { movieImages } from "../untils/movieImages"
import NotFound from "../assets/images/not-found.jpg"

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  selectedItem: {
    type: Object,
    default: null,
  },
})

defineEmits(["close"])
</script>