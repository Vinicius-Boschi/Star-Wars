<template>
  <div v-if="isOpen && selectedCharacter" class="modal">
    <div class="modal__container" @click.self="$emit('close')">
      <div
        class="modal__content"
        role="dialog"
        aria-modal="true"
        :aria-label="`Detalhes de ${selectedCharacter.name}`"
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
          v-if="selectedCharacter.image || NotFound"
          :src="selectedCharacter.image || NotFound"
          :alt="selectedCharacter.name"
          class="modal__image"
        />

        <h2>{{ selectedCharacter.name }}</h2>

        <span class="modal__type">
          {{ selectedCharacter.type }}
        </span>

        <ul class="modal__info">
          <!-- Personagens -->
          <template v-if="selectedCharacter.type === 'character'">
            <li v-if="selectedCharacter.height">
              <strong>Altura:</strong> {{ selectedCharacter.height }}
            </li>

            <li v-if="selectedCharacter.mass">
              <strong>Peso:</strong> {{ selectedCharacter.mass }}
            </li>

            <li v-if="selectedCharacter.gender">
              <strong>Gênero:</strong> {{ selectedCharacter.gender }}
            </li>

            <li v-if="selectedCharacter.birth_year">
              <strong>Nascimento:</strong> {{ selectedCharacter.birth_year }}
            </li>
          </template>

          <!-- Filmes -->
          <template v-else-if="selectedCharacter.type === 'movie'">
            <li v-if="selectedCharacter.release_date">
              <strong>Lançamento:</strong> {{ selectedCharacter.release_date }}
            </li>

            <li v-if="selectedCharacter.director">
              <strong>Diretor:</strong> {{ selectedCharacter.director }}
            </li>

            <li v-if="selectedCharacter.producer">
              <strong>Produtor:</strong> {{ selectedCharacter.producer }}
            </li>
          </template>

          <!-- Planetas -->
          <template v-else-if="selectedCharacter.type === 'planet'">
            <li v-if="selectedCharacter.climate">
              <strong>Clima:</strong> {{ selectedCharacter.climate }}
            </li>

            <li v-if="selectedCharacter.terrain">
              <strong>Terreno:</strong> {{ selectedCharacter.terrain }}
            </li>

            <li v-if="selectedCharacter.population">
              <strong>População:</strong> {{ selectedCharacter.population }}
            </li>
          </template>

          <!-- Espécies -->
          <template v-else-if="selectedCharacter.type === 'species'">
            <li v-if="selectedCharacter.classification">
              <strong>Classificação:</strong>
              {{ selectedCharacter.classification }}
            </li>

            <li v-if="selectedCharacter.language">
              <strong>Idioma:</strong> {{ selectedCharacter.language }}
            </li>

            <li v-if="selectedCharacter.average_lifespan">
              <strong>Expectativa de vida:</strong>
              {{ selectedCharacter.average_lifespan }}
            </li>
          </template>

          <!-- Naves -->
          <template v-else-if="selectedCharacter.type === 'starship'">
            <li v-if="selectedCharacter.model">
              <strong>Modelo:</strong> {{ selectedCharacter.model }}
            </li>

            <li v-if="selectedCharacter.manufacturer">
              <strong>Fabricante:</strong> {{ selectedCharacter.manufacturer }}
            </li>

            <li v-if="selectedCharacter.starship_class">
              <strong>Classe:</strong> {{ selectedCharacter.starship_class }}
            </li>

            <li v-if="selectedCharacter.max_atmosphering_speed">
              <strong>Velocidade:</strong>
              {{ selectedCharacter.max_atmosphering_speed }}
            </li>
          </template>

          <!-- Veículos -->
          <template v-else-if="selectedCharacter.type === 'vehicle'">
            <li v-if="selectedCharacter.model">
              <strong>Modelo:</strong> {{ selectedCharacter.model }}
            </li>

            <li v-if="selectedCharacter.manufacturer">
              <strong>Fabricante:</strong> {{ selectedCharacter.manufacturer }}
            </li>

            <li v-if="selectedCharacter.vehicle_class">
              <strong>Classe:</strong> {{ selectedCharacter.vehicle_class }}
            </li>

            <li v-if="selectedCharacter.max_atmosphering_speed">
              <strong>Velocidade:</strong>
              {{ selectedCharacter.max_atmosphering_speed }}
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
  selectedCharacter: {
    type: Object,
    default: null,
  },
})

defineEmits(["close"])
</script>