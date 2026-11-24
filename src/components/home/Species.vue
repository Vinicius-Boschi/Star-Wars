<template>
  <section ref="speciesSection" class="cards__featured">
    <div class="cards__heading">
      <h2>Highlight Species</h2>
      <p v-if="showCount">{{ species.length }} Species</p>
    </div>

    <div id="species" class="cards__grid">
      <article
        v-for="species in props.species"
        :key="species.id"
        class="cards__item"
      >
        <div class="cards__media">
          <img
            :src="species.image || NotFound"
            :alt="species.name"
            loading="lazy"
            class="cards__image"
            @error="$event.target.src = NotFound"
          />

          <button
            class="cards__favorite"
            :class="{
              'cards__favorite--active': isFavorite(species.id, 'species'),
            }"
            type="button"
            @click="
              toggleFavorite(
                {
                  ...species,
                  image: species.image || NotFound,
                },
                'species',
              )
            "
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 2.5l2.94 5.95 6.56.95-4.75 4.63 1.12 6.54L12 17.48l-5.87 3.09 1.12-6.54L2.5 9.4l6.56-.95L12 2.5z"
              />
            </svg>
          </button>
        </div>

        <div class="cards__content">
          <h2>{{ species.name }}</h2>
          <p class="cards__meta">
            <strong>Planet:</strong> {{ species.homeworld_name || " n/a" }}
          </p>

          <p class="cards__meta">
            <strong>Language:</strong> {{ species.language }}
          </p>
          <button
            type="button"
            class="cards__button"
            @click="openSpecies(species)"
          >
            See Details
          </button>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue"
import { useFavorites } from "../../composables/useFavorites"

import NotFound from "../../assets/images/not-found.jpg"

const { loadFavorites, isFavorite, toggleFavorite } = useFavorites()

const emit = defineEmits(["open-species"])

const props = defineProps({
  species: {
    type: Array,
    default: () => [],
  },
    showCount: {
    type: Boolean,
    default: true,
  }
})

// Modal
function openSpecies(species) {
  emit("open-species", species)
}

onMounted(() => {
  loadFavorites()
})
</script>