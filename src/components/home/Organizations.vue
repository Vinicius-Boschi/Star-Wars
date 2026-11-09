<template>
  <section ref="orgazinationsSection" class="cards__featured">
    <div class="cards__heading">
      <h2>Highlight Organizations</h2>
    </div>

    <div id="organizations" class="cards__grid">
      <article
        v-for="organization in props.organizations"
        :key="organization.id"
        class="cards__item"
      >
        <div class="cards__media">
          <img
            :src="organization.image || NotFound"
            :alt="organization.name"
            loading="lazy"
            class="cards__image"
            @error="$event.target.src = NotFound"
          />

          <button
            class="cards__favorite"
            :class="{
              'cards__favorite--active': isFavorite(
                organization.id,
                'organization',
              ),
            }"
            type="button"
            @click="
              toggleFavorite(
                {
                  ...organization,
                  image: organization.image || NotFound,
                },
                'organization',
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
          <h2>{{ organization.name }}</h2>

          <button
            type="button"
            class="cards__button"
            @click="openOrganization(organization)"
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

const emit = defineEmits(["open-organization"])

const props = defineProps({
  organizations: {
    type: Array,
    default: () => [],
  },
})

// Modal
function openOrganization(organization) {
  emit("open-organization", organization)
}

onMounted(() => {
  loadFavorites()
})
</script>