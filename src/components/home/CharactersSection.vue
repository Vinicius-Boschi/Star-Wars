<template>
  <section ref="charactersSection" class="cards__featured">
    <div class="cards__heading">
      <h2>Personagens em Destaque</h2>
      <a href="#">Ver Todos</a>
    </div>

    <p v-if="loading" class="cards__status">Carregando personagens...</p>

    <p v-else-if="error" class="cards__status cards__status--error">
      {{ error }}
    </p>

    <div v-else id="characters" class="cards__grid">
      <article
        v-for="character in cards"
        :key="character.id"
        class="cards__item"
      >
        <div class="cards__media">
          <img
            v-if="character.image"
            :src="character.image"
            :alt="character.name"
            loading="lazy"
            class="cards__image"
          />

          <button
            class="cards__favorite"
            :class="{
              'cards__favorite--active': isFavorite(character.id, 'character'),
            }"
            type="button"
            @click="toggleFavorite(character, 'character')"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 2.5l2.94 5.95 6.56.95-4.75 4.63 1.12 6.54L12 17.48l-5.87 3.09 1.12-6.54L2.5 9.4l6.56-.95L12 2.5z"
              />
            </svg>
          </button>
        </div>

        <div class="cards__content">
          <h2>{{ character.name }}</h2>

          <button
            type="button"
            class="cards__button"
            @click="openCharacter(character)"
          >
            Ver detalhes
          </button>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import { getCharacters } from "../../services/starWarsApi"
import { useFavorites } from "../../composables/useFavorites"

const { loadFavorites, isFavorite, toggleFavorite } = useFavorites()

const emit = defineEmits(["open-character"])

const loading = ref(true)
const error = ref(null)
const characters = ref([])
const charactersSection = ref(null)

const cards = computed(() => characters.value.slice(0, 6))

async function loadCharacters() {
  loading.value = true
  error.value = null

  try {
    const data = await getCharacters()

    characters.value = Array.isArray(data) ? data : data.results || []
  } catch (err) {
    console.error(err)
    error.value = "Erro ao carregar personagens."
  } finally {
    loading.value = false
  }
}

// Navegação até os personagens
function scrollToCharacters() {
  charactersSection.value?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

// Modal
function openCharacter(character) {
  emit("open-character", character)
}

onMounted(() => {
  loadFavorites()
  loadCharacters()
})
</script>