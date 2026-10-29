<template>
  <main>
    <Header />
    <section class="characters">
      <div class="characters__container">
        <header class="characters__header">
          <img
            class="characters__background"
            src="../assets/images/Background.png"
            alt="background"
          />

          <div class="characters__content">
            <h1 class="characters__title">
              Explore o <span>universo star wars</span>
            </h1>

            <p>
              Descubra personagens, planetas, naves, veículos e tudo sobre a
              saga que conquistou gerações.
            </p>
          </div>
        </header>
      </div>
    </section>

    <p v-if="loading" class="characters__status">Carregando personagens...</p>

    <p v-else-if="error" class="characters__status characters__status--error">
      {{ error }}
    </p>

    <div v-else class="characters__grid">
      <article
        v-for="character in characters"
        :key="character.id"
        class="character-card"
      >
        <div class="character-card__media">
          <img
            v-if="character.image"
            :src="character.image"
            :alt="character.name"
            loading="lazy"
            class="character-card__image"
          />
        </div>

        <button
          class="character-card__favorite"
          :class="{
            'character-card__favorite--active': isFavorite(character.id),
          }"
          type="button"
          :aria-label="
            isFavorite(character.id)
              ? 'Remover dos favoritos'
              : 'Adicionar aos favoritos'
          "
          @click="toggleFavorite(character)"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 2.5l2.94 5.95 6.56.95-4.75 4.63 1.12 6.54L12 17.48l-5.87 3.09 1.12-6.54L2.5 9.4l6.56-.95L12 2.5z"
            />
          </svg>
        </button>

        <div class="character-card__content">
          <h2>{{ character.name }}</h2>

          <button
            type="button"
            class="character-card__button"
            @click="openCharacter(character)"
          >
            Ver detalhes
          </button>
        </div>
      </article>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getCharacters } from "../services/starWarsApi";
import Header from "../components/Header.vue";

const loading = ref(true);
const error = ref(null);
const characters = ref([]);

const favorites = ref([]);
const selectedCharacter = ref(null);

async function loadCharacters() {
  loading.value = true;
  error.value = null;

  try {
    const data = await getCharacters();

    characters.value = Array.isArray(data) ? data : data.results || [];
  } catch (err) {
    console.error(err);
    error.value = "Erro ao carregar personagens.";
  } finally {
    loading.value = false;
  }
}

function openCharacter(character) {
  selectedCharacter.value = character;
}

function isFavorite(id) {
  return favorites.value.some(
    (favoriteId) => Number(favoriteId) === Number(id),
  );
}

function toggleFavorite(character) {
  const index = favorites.value.indexOf(character.id);

  if (index === -1) {
    favorites.value.push(character.id);
  } else {
    favorites.value.splice(index, 1);
  }

  localStorage.setItem("star_wars_favorites", JSON.stringify(favorites.value));
}

function loadFavorites() {
  const savedFavorites = localStorage.getItem("star_wars_favorites");

  if (!savedFavorites) return;

  try {
    const parsedFavorites = JSON.parse(savedFavorites);

    favorites.value = Array.isArray(parsedFavorites)
      ? parsedFavorites.map(Number)
      : [];
  } catch (error) {
    console.error("Erro ao carregar favoritos: ", error);
    favorites.value = [];
  }
}

onMounted(() => {
  loadFavorites();
  loadCharacters();
});
</script>