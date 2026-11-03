<template>
  <div v-if="isOpen && selectedItem" class="modal">
    <div class="modal__container" @click.self="$emit('close')">
      <div
        class="modal__content"
        role="dialog"
        aria-modal="true"
        :aria-label="`Detalhes de ${selectedItem.name}`"
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
          v-if="selectedItem.image || NotFound"
          :src="selectedItem.image || NotFound"
          :alt="selectedItem.name"
          class="modal__image"
        />

        <h2>{{ selectedItem.name }}</h2>

        <span class="modal__type">
          {{ selectedItem.type }}
        </span>

        <ul class="modal__info">
          <!-- Personagens -->
          <template v-if="selectedItem.type === 'character'">
            <li v-if="selectedItem.height">
              <strong>Altura:</strong> {{ selectedItem.height }}
            </li>

            <li v-if="selectedItem.mass">
              <strong>Peso:</strong> {{ selectedItem.mass }}
            </li>

            <li v-if="selectedItem.gender">
              <strong>Gênero:</strong> {{ selectedItem.gender }}
            </li>

            <li v-if="selectedItem.birth_year">
              <strong>Nascimento:</strong> {{ selectedItem.birth_year }}
            </li>
          </template>

          <!-- Filmes -->
          <template v-else-if="selectedItem.type === 'movie'">
            <li v-if="selectedItem.release_date">
              <strong>Lançamento:</strong> {{ selectedItem.release_date }}
            </li>

            <li v-if="selectedItem.director">
              <strong>Diretor:</strong> {{ selectedItem.director }}
            </li>

            <li v-if="selectedItem.producer">
              <strong>Produtor:</strong> {{ selectedItem.producer }}
            </li>
          </template>

          <!-- Planetas -->
          <template v-else-if="selectedItem.type === 'planet'">
            <li v-if="selectedItem.climate">
              <strong>Clima:</strong> {{ selectedItem.climate }}
            </li>

            <li v-if="selectedItem.terrain">
              <strong>Terreno:</strong> {{ selectedItem.terrain }}
            </li>

            <li v-if="selectedItem.population">
              <strong>População:</strong> {{ selectedItem.population }}
            </li>
          </template>

          <!-- Espécies -->
          <template v-else-if="selectedItem.type === 'species'">
            <li v-if="selectedItem.classification">
              <strong>Classificação:</strong>
              {{ selectedItem.classification }}
            </li>

            <li v-if="selectedItem.language">
              <strong>Idioma:</strong> {{ selectedItem.language }}
            </li>

            <li v-if="selectedItem.average_lifespan">
              <strong>Expectativa de vida:</strong>
              {{ selectedItem.average_lifespan }}
            </li>
          </template>

          <!-- Naves -->
          <template v-else-if="selectedItem.type === 'starship'">
            <li v-if="selectedItem.model">
              <strong>Modelo:</strong> {{ selectedItem.model }}
            </li>

            <li v-if="selectedItem.manufacturer">
              <strong>Fabricante:</strong> {{ selectedItem.manufacturer }}
            </li>

            <li v-if="selectedItem.starship_class">
              <strong>Classe:</strong> {{ selectedItem.starship_class }}
            </li>

            <li v-if="selectedItem.max_atmosphering_speed">
              <strong>Velocidade:</strong>
              {{ selectedItem.max_atmosphering_speed }}
            </li>
          </template>

          <!-- Veículos -->
          <template v-else-if="selectedItem.type === 'vehicle'">
            <li v-if="selectedItem.model">
              <strong>Modelo:</strong> {{ selectedItem.model }}
            </li>

            <li v-if="selectedItem.manufacturer">
              <strong>Fabricante:</strong> {{ selectedItem.manufacturer }}
            </li>

            <li v-if="selectedItem.vehicle_class">
              <strong>Classe:</strong> {{ selectedItem.vehicle_class }}
            </li>

            <li v-if="selectedItem.max_atmosphering_speed">
              <strong>Velocidade:</strong>
              {{ selectedItem.max_atmosphering_speed }}
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
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