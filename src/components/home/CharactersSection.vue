<template>
  <section ref="charactersSection" class="cards__featured">
    <div class="cards__heading">
      <h2>Highlight Characters</h2>
      <p v-if="showCount">{{ characters.length }} Characters</p>
    </div>

    <div id="characters" class="cards__grid">
      <article
        v-for="character in props.characters"
        :key="character.id"
        class="cards__item"
      >
        <div class="cards__media">
          <img
            :src="character.image || NotFound"
            :alt="character.name"
            loading="lazy"
            class="cards__image"
            @error="$event.target.src = NotFound"
          />

          <button
            class="cards__favorite"
            :class="{
              'cards__favorite--active': isFavorite(character.id, 'character'),
            }"
            type="button"
            @click="
              toggleFavorite(
                {
                  ...character,
                  image: character.image || NotFound,
                },
                'character',
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
          <h3>{{ character.name }}</h3>
          <p
            v-if="
              character.species_name ||
              character.gender ||
              character.homeworld_name
            "
            class="cards__meta"
          >
            {{
              [
                character.species_name,
                character.gender,
                character.homeworld_name,
              ]
                .filter(Boolean)
                .join(" · ")
            }}
          </p>
          <button
            type="button"
            class="cards__button"
            @click="openCharacter(character)"
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

const emit = defineEmits(["open-character"])

const props = defineProps({
  characters: {
    type: Array,
    default: () => [],
  },
    showCount: {
    type: Boolean,
    default: true,
  }
})

// Modal
function openCharacter(character) {
  emit("open-character", character)
}

onMounted(() => {
  loadFavorites()
})
</script>