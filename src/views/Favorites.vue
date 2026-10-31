<template>
  <section class="cards__featured">
    <div class="cards__heading">
      <h2>Meus Favoritos</h2>
    </div>

    <p v-if="favorites.length === 0">Você ainda não possui favoritos.</p>

    <div v-else id="favorites" class="cards__grid">
      <article
        v-for="favorite in favorites"
        :key="`${favorite.type}-${favorite.id}`"
        class="cards__item"
      >
        <div class="cards__media">
          <img
            :src="favorite.image"
            :alt="favorite.name"
            loading="lazy"
            class="cards__image"
          />

          <button
            class="cards__favorite"
            :class="{
              'cards__favorite--active': isFavorite(favorite.id, favorite.type),
            }"
            type="button"
            aria-label="Remover dos favoritos"
            @click="toggleFavorite(favorite, favorite.type)"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 2.5l2.94 5.95 6.56.95-4.75 4.63 1.12 6.54L12 17.48l-5.87 3.09 1.12-6.54L2.5 9.4l6.56-.95L12 2.5z"
              />
            </svg>
          </button>
        </div>

        <div class="cards__content">
          <h2>{{ favorite.name }}</h2>
          <button
            type="button"
            class="cards__button"
            @click="openFavorite(favorite)"
          >
            Ver detalhes
          </button>
        </div>
      </article>
    </div>
    <Modal
      :is-open="!!selectedFavorite"
      :selected-character="selectedFavorite"
      @close="closeFavorite"
    />
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useFavorites } from "../composables/useFavorites";

import Modal from "../components/Modal.vue";

const { favorites, loadFavorites, isFavorite, toggleFavorite } = useFavorites();

const selectedFavorite = ref(null);

function openFavorite(favorite) {
  selectedFavorite.value = favorite;
}

function closeFavorite() {
  selectedFavorite.value = null;
}

onMounted(() => {
  loadFavorites();
});
</script>