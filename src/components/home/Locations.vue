<template>
  <section ref="locationsSection" class="cards__featured">
    <div class="cards__heading">
      <h2>Highlight Locations</h2>
    </div>

    <div id="locations" class="cards__grid">
      <article
        v-for="location in props.locations"
        :key="location.id"
        class="cards__item"
      >
        <div class="cards__media">
          <img
            :src="location.image || NotFound"
            :alt="location.name"
            loading="lazy"
            class="cards__image"
            @error="$event.target.src = NotFound"
          />

          <button
            class="cards__favorite"
            :class="{
              'cards__favorite--active': isFavorite(location.id, 'location'),
            }"
            type="button"
            @click="
              toggleFavorite(
                {
                  ...location,
                  image: location.image || NotFound,
                },
                'location',
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
          <h2>{{ location.name }}</h2>

          <button
            type="button"
            class="cards__button"
            @click="openLocation(location)"
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

const emit = defineEmits(["open-location"])

const props = defineProps({
  locations: {
    type: Array,
    default: () => [],
  },
})

// Modal
function openLocation(location) {
  emit("open-location", location)
}

onMounted(() => {
  loadFavorites()
})
</script>