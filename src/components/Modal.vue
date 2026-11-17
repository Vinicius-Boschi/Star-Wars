<template>
  <div v-if="isOpen && selectedItem" class="modal">
    <div
      class="modal__content"
      role="dialog"
      aria-modal="true"
      :aria-label="`Details of ${selectedItem.title || selectedItem.name}`"
    >
      <button
        class="modal__close"
        type="button"
        aria-label="Fechar modal"
        @click="$emit('close')"
      >
        &times;
      </button>

      <div class="modal__header">
        <img
          :src="
            selectedItem.type === 'movie' || selectedItem.type === 'planet'
              ? getCloudinaryImage(selectedItem.image)
              : selectedItem.image || NotFound
          "
          :alt="selectedItem.title || selectedItem.name"
          class="modal__image"
          @error="$event.target.src = NotFound"
        />

        <div class="modal__details">
          <h2>{{ selectedItem.title || selectedItem.name }}</h2>

          <span class="modal__type">
            {{ selectedItem.species_name || selectedItem.type }}
          </span>

          <ul class="modal__info">
            <!-- Characters -->
            <template v-if="selectedItem.type === 'character'">
              <li
                v-if="selectedItem.height && selectedItem.height !== 'unknown'"
              >
                <strong>Height:</strong>
                {{ Number(selectedItem.height / 100) }} m
              </li>
              <li v-if="selectedItem.mass && selectedItem.mass !== 'unknown'">
                <strong>Mass:</strong> {{ selectedItem.mass }} kg
              </li>
              <li v-if="selectedItem.gender">
                <strong>Gender:</strong> {{ selectedItem.gender }}
              </li>
              <li v-if="selectedItem.birth_year">
                <strong>Birth Year:</strong> {{ selectedItem.birth_year }}
              </li>
              <li v-if="selectedItem.homeworld_name">
                <strong>Homeworld:</strong> {{ selectedItem.homeworld_name }}
              </li>
              <li v-if="selectedItem.eye_color">
                <strong>Eye Color:</strong> {{ selectedItem.eye_color }}
              </li>
              <li v-if="selectedItem.hair_color">
                <strong>Hair Color:</strong> {{ selectedItem.hair_color }}
              </li>
              <li v-if="selectedItem.skin_color">
                <strong>Skin color:</strong> {{ selectedItem.skin_color }}
              </li>
              <li v-if="selectedItem.born">
                <strong>Born:</strong> {{ selectedItem.born }}
              </li>
              <li v-if="selectedItem.died">
                <strong>Died:</strong> {{ selectedItem.died }}
              </li>
              <li v-if="selectedItem.bornLocation">
                <strong>Born Location:</strong> {{ selectedItem.bornLocation }}
              </li>
              <li v-if="selectedItem.diedLocation">
                <strong>Died Location:</strong> {{ selectedItem.diedLocation }}
              </li>
              <li v-if="selectedItem.cybernetics">
                <strong>Cybernetics:</strong>
                {{ selectedItem.cybernetics.join(", ") || "n/a" }}
              </li>
            </template>

            <!-- Movies -->
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

            <!-- Planets -->
            <template v-else-if="selectedItem.type === 'planet'">
              <li v-if="selectedItem.climate">
                <strong>Climate:</strong> {{ selectedItem.climate }}
              </li>
              <li v-if="selectedItem.terrain">
                <strong>Terrain:</strong> {{ selectedItem.terrain }}
              </li>
              <li v-if="selectedItem.population">
                <strong>Population:</strong> {{ selectedItem.population }}
              </li>
            </template>

            <!-- Species -->
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

            <!-- Starships -->
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
                <strong>Max Speed:</strong>
                {{ selectedItem.max_atmosphering_speed }}
              </li>
            </template>

            <!-- Vehicles -->
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
                <strong>Max Speed:</strong>
                {{ selectedItem.max_atmosphering_speed }}
              </li>
            </template>
          </ul>
        </div>
      </div>

      <section v-if="selectedItem.description" class="modal__section">
        <h3>About</h3>
        <p>{{ selectedItem.description }}</p>
      </section>

      <section v-if="selectedItem.type === 'character'" class="modal__section">
        <h3>Appears in</h3>
        <ul class="modal__appearances">
          <li>
            <span class="modal__icons">
              <Clapperboard />
            </span>
            <div>
              <strong>{{ selectedItem.films?.length ?? 0 }}</strong>
              <span>Movies</span>
            </div>
          </li>
          <li>
            <span class="modal__icons">
              <Car />
            </span>
            <div>
              <strong>{{ selectedItem.vehicles?.length ?? 0 }}</strong>
              <span>Vehicles</span>
            </div>
          </li>
          <li>
            <span class="modal__icons">
              <Helicopter />
            </span>
            <div>
              <strong>{{ selectedItem.starships?.length ?? 0 }}</strong>
              <span>Starships</span>
            </div>
          </li>
        </ul>
      </section>

      <section
        v-if="selectedItem.type === 'character' && selectedItem.films?.length"
        class="modal__section"
      >
        <h3>Movies</h3>

        <div class="modal__films">
          <article
            v-for="film in selectedItem.films"
            :key="film.title"
            class="modal__films-card"
          >
            <img
              :src="getCloudinaryImage(film.image) || NotFound"
              :alt="film.title"
              @error="$event.target.src = NotFound"
            />
            <span>{{ film.title }}</span>
          </article>
        </div>
      </section>

      <section
        v-if="
          selectedItem.type === 'character' &&
          (selectedItem.affiliations?.length ||
            selectedItem.formerAffiliations?.length ||
            selectedItem.masters?.length ||
            selectedItem.apprentices?.length)
        "
        class="modal__section"
      >
        <h3>Affiliations</h3>

        <p>{{ selectedItem.affiliations.join(", ") }}</p>
      </section>

      <section
        v-if="selectedItem.type === 'character' && selectedItem.masters?.length"
        class="modal__section"
      >
        <h3>Masters</h3>

        <div class="modal__related">
          <article
            v-for="master in selectedItem.masters"
            :key="master.name"
            class="modal__related-card"
          >
            <img
              :src="master.image || NotFound"
              :alt="master.name"
              @error="$event.target.src = NotFound"
            />
            <span>{{ master.name }}</span>
          </article>
        </div>
      </section>

      <section
        v-if="
          selectedItem.type === 'character' && selectedItem.apprentices?.length
        "
        class="modal__section"
      >
        <h3>Apprentices</h3>

        <div class="modal__related">
          <article
            v-for="apprentice in selectedItem.apprentices"
            :key="apprentice.name"
            class="modal__related-card"
          >
            <img
              :src="apprentice.image || NotFound"
              :alt="apprentice.name"
              @error="$event.target.src = NotFound"
            />
            <span>{{ apprentice.name }}</span>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import NotFound from "../assets/images/not-found.jpg"
import { getCloudinaryImage } from "../services/cloudinary"
import { Clapperboard, Car, Helicopter } from "lucide-vue-next"

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