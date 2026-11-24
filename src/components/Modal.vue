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
        &times
      </button>

      <!-- Header -->
      <div class="modal__header">
        <img
          :src="
            (selectedItem.type === 'movie' || selectedItem.type === 'planet'
              ? getCloudinaryImage(selectedItem.image)
              : selectedItem.image) || NotFound
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

              <li v-if="selectedItem.cybernetics?.length">
                <strong>Cybernetics:</strong>
                {{ selectedItem.cybernetics.join(", ") }}
              </li>
            </template>

            <!-- Movies -->
            <template v-else-if="selectedItem.type === 'movie'">
              <li v-if="selectedItem.episode_id">
                <strong>Episode:</strong> {{ selectedItem.episode_id }}
              </li>

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
                <strong>Population:</strong>
                {{ formatNumber(selectedItem.population) }}
              </li>

              <li v-if="selectedItem.rotation_period">
                <strong>Rotation Period:</strong>
                {{ selectedItem.rotation_period }}
              </li>

              <li v-if="selectedItem.orbital_period">
                <strong>Orbital Period:</strong>
                {{ selectedItem.orbital_period }}
              </li>

              <li v-if="selectedItem.diameter">
                <strong>Diameter:</strong>
                {{ formatNumber(selectedItem.diameter) }}
              </li>

              <li v-if="selectedItem.gravity">
                <strong>Gravity:</strong> {{ selectedItem.gravity }}
              </li>

              <li v-if="selectedItem.surface_water">
                <strong>Surface Water:</strong> {{ selectedItem.surface_water }}
              </li>
            </template>

            <!-- Species -->
            <template v-else-if="selectedItem.type === 'species'">
              <li v-if="selectedItem.classification">
                <strong>Classification:</strong>
                {{ selectedItem.classification }}
              </li>

              <li v-if="selectedItem.designation">
                <strong>Designation:</strong>
                {{ selectedItem.designation }}
              </li>

              <li v-if="selectedItem.average_height">
                <strong>Average Height:</strong>
                {{ selectedItem.average_height }}
              </li>

              <li v-if="selectedItem.average_lifespan">
                <strong>Average Lifespan:</strong>
                {{ selectedItem.average_lifespan }}
              </li>

              <li v-if="selectedItem.language">
                <strong>Language:</strong>
                {{ selectedItem.language }}
              </li>

              <li v-if="selectedItem.homeworld_name">
                <strong>Homeworld Name:</strong>
                {{ selectedItem.homeworld_name }}
              </li>

              <li v-if="selectedItem.hair_colors">
                <strong>Hair Colors:</strong>
                {{ selectedItem.hair_colors }}
              </li>

              <li v-if="selectedItem.skin_colors">
                <strong>Skin Colors:</strong>
                {{ selectedItem.skin_colors }}
              </li>

              <li v-if="selectedItem.eye_colors">
                <strong>Eye Colors:</strong>
                {{ selectedItem.eye_colors }}
              </li>
            </template>

            <!-- Starships -->
            <template v-else-if="selectedItem.type === 'starship'">
              <li v-if="selectedItem.model">
                <strong>Model:</strong> {{ selectedItem.model }}
              </li>

              <li v-if="selectedItem.cost_in_credits">
                <strong>Cost in credits:</strong>
                {{ formatNumber(selectedItem.cost_in_credits) }}
              </li>

              <li v-if="selectedItem.length">
                <strong>Length:</strong> {{ selectedItem.length }}
              </li>

              <li v-if="selectedItem.max_atmosphering_speed">
                <strong>Max Speed:</strong>
                {{ selectedItem.max_atmosphering_speed }}
              </li>

              <li v-if="selectedItem.crew">
                <strong>Crew:</strong> {{ selectedItem.crew }}
              </li>

              <li v-if="selectedItem.passengers">
                <strong>Passengers:</strong> {{ selectedItem.passengers }}
              </li>

              <li v-if="selectedItem.cargo_capacity">
                <strong>Cargo capacity:</strong>
                {{ formatNumber(selectedItem.cargo_capacity) }}
              </li>

              <li v-if="selectedItem.consumables">
                <strong>Consumables:</strong> {{ selectedItem.consumables }}
              </li>

              <li v-if="selectedItem.hyperdrive_rating">
                <strong>Hyperdriving rating:</strong>
                {{ selectedItem.hyperdrive_rating }}
              </li>

              <li v-if="selectedItem.mglt">
                <strong>MGLT:</strong> {{ selectedItem.mglt }}
              </li>

              <li v-if="selectedItem.starship_class">
                <strong>Class:</strong> {{ selectedItem.starship_class }}
              </li>

              <li v-if="selectedItem.manufacturer">
                <strong>Manufacturer:</strong> {{ selectedItem.manufacturer }}
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

              <li v-if="selectedItem.cost_in_credits">
                <strong>Cost in credits:</strong>
                {{ formatNumber(selectedItem.cost_in_credits) }}
              </li>

              <li v-if="selectedItem.length">
                <strong>Length:</strong> {{ selectedItem.length }}
              </li>

              <li v-if="selectedItem.max_atmosphering_speed">
                <strong>Max Speed:</strong>
                {{ selectedItem.max_atmosphering_speed }}
              </li>

              <li v-if="selectedItem.crew">
                <strong>Crew:</strong> {{ selectedItem.crew }}
              </li>

              <li v-if="selectedItem.passengers">
                <strong>Passengers:</strong> {{ selectedItem.passengers }}
              </li>

              <li v-if="selectedItem.cargo_capacity">
                <strong>Cargo Capacity:</strong>
                {{ selectedItem.cargo_capacity }}
              </li>

              <li v-if="selectedItem.consumables">
                <strong>Consumables:</strong> {{ selectedItem.consumables }}
              </li>

              <li v-if="selectedItem.vehicle_class">
                <strong>Vehicle Class:</strong> {{ selectedItem.vehicle_class }}
              </li>
            </template>
          </ul>
        </div>
      </div>

      <!-- About -->
      <section v-if="selectedItem.description" class="modal__section">
        <h3>About</h3>
        <p>{{ selectedItem.description }}</p>
      </section>

      <!-- Character: Appearances -->
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

      <!-- Character: Movies -->
      <section
        v-if="selectedItem.type === 'character' && selectedItem.films?.length"
        class="modal__section"
      >
        <h3>Movies</h3>

        <div class="modal__films">
          <article
            v-for="film in selectedItem.films"
            :key="film.id || film.title"
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

      <!-- Character: Affiliations -->
      <section
        v-if="
          selectedItem.type === 'character' &&
          (selectedItem.affiliations?.length ||
            selectedItem.formerAffiliations?.length)
        "
        class="modal__section"
      >
        <h3>Affiliations</h3>

        <p>
          {{
            [
              ...(selectedItem.affiliations || []),
              ...(selectedItem.formerAffiliations || []),
            ].join(", ")
          }}
        </p>
      </section>

      <!-- Character: Masters -->
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

      <!-- Character: Apprentices -->
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

      <!-- Movie: Opening Crawl -->
      <section
        v-if="selectedItem.type === 'movie' && selectedItem.opening_crawl"
        class="modal__section"
      >
        <h3>Opening Crawl</h3>
        <p class="modal__crawl">{{ selectedItem.opening_crawl }}</p>
      </section>

      <!-- Movie: Characters -->
      <section
        v-if="selectedItem.type === 'movie' && selectedItem.characters?.length"
        class="modal__section"
      >
        <div class="modal__section-header">
          <h3>Characters</h3>

          <div class="modal__navigation">
            <button
              class="modal__prev"
              type="button"
              aria-label="Prev"
              :disabled="!swiperStates.movieCharacters.canPrev"
              @click="slideSwiper('movieCharacters', 'prev')"
            >
              &lt
            </button>

            <button
              class="modal__next"
              type="button"
              aria-label="Next"
              :disabled="!swiperStates.movieCharacters.canNext"
              @click="slideSwiper('movieCharacters', 'next')"
            >
              &gt
            </button>
          </div>
        </div>

        <Swiper
          :slides-per-view="5"
          :space-between="12"
          :breakpoints="breakpoints"
          @swiper="(swiper) => setSwiper('movieCharacters', swiper)"
          @slide-change="
            (swiper) => updateSwiperState('movieCharacters', swiper)
          "
        >
          <SwiperSlide
            v-for="character in selectedItem.characters"
            :key="character.id"
          >
            <article class="modal__related-card">
              <img
                :src="character.image || NotFound"
                :alt="character.name"
                @error="$event.target.src = NotFound"
              />
              <span>{{ character.name }}</span>
            </article>
          </SwiperSlide>
        </Swiper>
      </section>

      <!-- Movie: Planets -->
      <section
        v-if="selectedItem.type === 'movie' && selectedItem.planets?.length"
        class="modal__section"
      >
        <div class="modal__section-header">
          <h3>Planets</h3>

          <div class="modal__navigation">
            <button
              class="modal__prev"
              type="button"
              aria-label="Prev"
              :disabled="!swiperStates.moviePlanets.canPrev"
              @click="slideSwiper('moviePlanets', 'prev')"
            >
              &lt
            </button>

            <button
              class="modal__next"
              type="button"
              aria-label="Next"
              :disabled="!swiperStates.moviePlanets.canNext"
              @click="slideSwiper('moviePlanets', 'next')"
            >
              &gt
            </button>
          </div>
        </div>

        <Swiper
          :slides-per-view="5"
          :space-between="12"
          :breakpoints="breakpoints"
          @swiper="(swiper) => setSwiper('moviePlanets', swiper)"
          @slide-change="(swiper) => updateSwiperState('moviePlanets', swiper)"
        >
          <SwiperSlide v-for="planet in selectedItem.planets" :key="planet.id">
            <article class="modal__related-card">
              <img
                :src="getRelationImage(planet, 'planet')"
                :alt="planet.name"
                @error="$event.target.src = NotFound"
              />
              <span>{{ planet.name }}</span>
            </article>
          </SwiperSlide>
        </Swiper>
      </section>

      <!-- Movie: Starships -->
      <section
        v-if="selectedItem.type === 'movie' && selectedItem.starships?.length"
        class="modal__section"
      >
        <div class="modal__section-header">
          <h3>Starships</h3>

          <div class="modal__navigation">
            <button
              class="modal__prev"
              type="button"
              aria-label="Prev"
              :disabled="!swiperStates.movieStarships.canPrev"
              @click="slideSwiper('movieStarships', 'prev')"
            >
              &lt
            </button>

            <button
              class="modal__next"
              type="button"
              aria-label="Next"
              :disabled="!swiperStates.movieStarships.canNext"
              @click="slideSwiper('movieStarships', 'next')"
            >
              &gt
            </button>
          </div>
        </div>

        <Swiper
          :slides-per-view="5"
          :space-between="12"
          :breakpoints="breakpoints"
          @swiper="(swiper) => setSwiper('movieStarships', swiper)"
          @slide-change="
            (swiper) => updateSwiperState('movieStarships', swiper)
          "
        >
          <SwiperSlide
            v-for="starship in selectedItem.starships"
            :key="starship.id"
          >
            <article class="modal__related-card">
              <img
                :src="starship.image || NotFound"
                :alt="starship.name"
                @error="$event.target.src = NotFound"
              />
              <span>{{ starship.name }}</span>
            </article>
          </SwiperSlide>
        </Swiper>
      </section>

      <!-- Movie: Vehicles -->
      <section
        v-if="selectedItem.type === 'movie' && selectedItem.vehicles?.length"
        class="modal__section"
      >
        <div class="modal__section-header">
          <h3>Vehicles</h3>

          <div class="modal__navigation">
            <button
              class="modal__prev"
              type="button"
              aria-label="Prev"
              :disabled="!swiperStates.movieVehicles.canPrev"
              @click="slideSwiper('movieVehicles', 'prev')"
            >
              &lt
            </button>

            <button
              class="modal__next"
              type="button"
              aria-label="Next"
              :disabled="!swiperStates.movieVehicles.canNext"
              @click="slideSwiper('movieVehicles', 'next')"
            >
              &gt
            </button>
          </div>
        </div>

        <Swiper
          :slides-per-view="5"
          :space-between="12"
          :breakpoints="breakpoints"
          @swiper="(swiper) => setSwiper('movieVehicles', swiper)"
          @slide-change="(swiper) => updateSwiperState('movieVehicles', swiper)"
        >
          <SwiperSlide
            v-for="vehicle in selectedItem.vehicles"
            :key="vehicle.id"
          >
            <article class="modal__related-card">
              <img
                :src="vehicle.image || NotFound"
                :alt="vehicle.name"
                @error="$event.target.src = NotFound"
              />
              <span>{{ vehicle.name }}</span>
            </article>
          </SwiperSlide>
        </Swiper>
      </section>

      <!-- Movie: Species -->
      <section
        v-if="selectedItem.type === 'movie' && selectedItem.species?.length"
        class="modal__section"
      >
        <div class="modal__section-header">
          <h3>Species</h3>

          <div class="modal__navigation">
            <button
              class="modal__prev"
              type="button"
              aria-label="Prev"
              :disabled="!swiperStates.movieSpecies.canPrev"
              @click="slideSwiper('movieSpecies', 'prev')"
            >
              &lt
            </button>

            <button
              class="modal__next"
              type="button"
              aria-label="Next"
              :disabled="!swiperStates.movieSpecies.canNext"
              @click="slideSwiper('movieSpecies', 'next')"
            >
              &gt
            </button>
          </div>
        </div>

        <Swiper
          :slides-per-view="5"
          :space-between="12"
          :breakpoints="breakpoints"
          @swiper="(swiper) => setSwiper('movieSpecies', swiper)"
          @slide-change="(swiper) => updateSwiperState('movieSpecies', swiper)"
        >
          <SwiperSlide v-for="specie in selectedItem.species" :key="specie.id">
            <article class="modal__related-card">
              <img
                :src="specie.image || NotFound"
                :alt="specie.name"
                @error="$event.target.src = NotFound"
              />
              <span>{{ specie.name }}</span>
            </article>
          </SwiperSlide>
        </Swiper>
      </section>

      <!-- Planet: Characters -->
      <section
        v-if="selectedItem.type === 'planet' && selectedItem.characters?.length"
        class="modal__section"
      >
        <div class="modal__section-header">
          <h3>Characters</h3>

          <div class="modal__navigation">
            <button
              class="modal__prev"
              type="button"
              aria-label="Prev"
              :disabled="!swiperStates.planetCharacters.canPrev"
              @click="slideSwiper('planetCharacters', 'prev')"
            >
              &lt
            </button>

            <button
              class="modal__next"
              type="button"
              aria-label="Next"
              :disabled="!swiperStates.planetCharacters.canNext"
              @click="slideSwiper('planetCharacters', 'next')"
            >
              &gt
            </button>
          </div>
        </div>

        <Swiper
          :slides-per-view="5"
          :space-between="12"
          :breakpoints="breakpoints"
          @swiper="(swiper) => setSwiper('planetCharacters', swiper)"
          @slide-change="
            (swiper) => updateSwiperState('planetCharacters', swiper)
          "
        >
          <SwiperSlide
            v-for="character in selectedItem.characters"
            :key="character.id"
          >
            <article class="modal__related-card">
              <img
                :src="character.image || NotFound"
                :alt="character.name"
                @error="$event.target.src = NotFound"
              />
              <span>{{ character.name }}</span>
            </article>
          </SwiperSlide>
        </Swiper>
      </section>

      <!-- Planet: Movies -->
      <section
        v-if="selectedItem.type === 'planet' && selectedItem.films?.length"
        class="modal__section"
      >
        <div class="modal__section-header">
          <h3>Movies</h3>

          <div class="modal__navigation">
            <button
              class="modal__prev"
              type="button"
              aria-label="Prev"
              :disabled="!swiperStates.planetMovies.canPrev"
              @click="slideSwiper('planetMovies', 'prev')"
            >
              &lt
            </button>

            <button
              class="modal__next"
              type="button"
              aria-label="Next"
              :disabled="!swiperStates.planetMovies.canNext"
              @click="slideSwiper('planetMovies', 'next')"
            >
              &gt
            </button>
          </div>
        </div>

        <Swiper
          :slides-per-view="5"
          :space-between="12"
          :breakpoints="breakpoints"
          @swiper="(swiper) => setSwiper('planetMovies', swiper)"
          @slide-change="(swiper) => updateSwiperState('planetMovies', swiper)"
        >
          <SwiperSlide v-for="film in selectedItem.films" :key="film.id">
            <article class="modal__related-card">
              <img
                :src="getCloudinaryImage(film.image) || NotFound"
                :alt="film.title"
                @error="$event.target.src = NotFound"
              />
              <span>{{ film.title }}</span>
            </article>
          </SwiperSlide>
        </Swiper>
      </section>

      <!-- Starships: Movies -->
      <section
        v-if="selectedItem.type === 'starship' && selectedItem.films?.length"
        class="modal__section"
      >
        <div class="modal__section-header">
          <h3>Movies</h3>

          <div class="modal__navigation">
            <button
              class="modal__prev"
              type="button"
              aria-label="Prev"
              :disabled="!swiperStates.starshipMovies.canPrev"
              @click="slideSwiper('starshipMovies', 'prev')"
            >
              &lt
            </button>

            <button
              class="modal__next"
              type="button"
              aria-label="Next"
              :disabled="!swiperStates.starshipMovies.canNext"
              @click="slideSwiper('starshipMovies', 'next')"
            >
              &gt
            </button>
          </div>
        </div>

        <Swiper
          :slides-per-view="5"
          :space-between="12"
          :breakpoints="breakpoints"
          @swiper="(swiper) => setSwiper('starshipMovies', swiper)"
          @slide-change="
            (swiper) => updateSwiperState('starshipMovies', swiper)
          "
        >
          <SwiperSlide v-for="film in selectedItem.films" :key="film.id">
            <article class="modal__related-card">
              <img
                :src="getCloudinaryImage(film.image) || NotFound"
                :alt="film.title"
                @error="$event.target.src = NotFound"
              />
              <span>{{ film.title }}</span>
            </article>
          </SwiperSlide>
        </Swiper>
      </section>

      <!-- Starships: Pilots -->
      <section
        v-if="selectedItem.type === 'starship' && selectedItem.pilots?.length"
        class="modal__section"
      >
        <div class="modal__section-header">
          <h3>Pilots</h3>

          <div class="modal__navigation">
            <button
              class="modal__prev"
              type="button"
              aria-label="Prev"
              :disabled="!swiperStates.starshipPilots.canPrev"
              @click="slideSwiper('starshipPilots', 'prev')"
            >
              &lt
            </button>

            <button
              class="modal__next"
              type="button"
              aria-label="Next"
              :disabled="!swiperStates.starshipPilots.canNext"
              @click="slideSwiper('starshipPilots', 'next')"
            >
              &gt
            </button>
          </div>
        </div>

        <Swiper
          :slides-per-view="5"
          :space-between="12"
          :breakpoints="breakpoints"
          @swiper="(swiper) => setSwiper('starshipPilots', swiper)"
          @slide-change="
            (swiper) => updateSwiperState('starshipPilots', swiper)
          "
        >
          <SwiperSlide v-for="pilot in selectedItem.pilots" :key="pilot.id">
            <article class="modal__related-card">
              <img
                :src="pilot.image || NotFound"
                :alt="pilot.name"
                @error="$event.target.src = NotFound"
              />
              <span>{{ pilot.name }}</span>
            </article>
          </SwiperSlide>
        </Swiper>
      </section>

      <!-- Species: People -->
      <section
        v-if="selectedItem.type === 'species' && selectedItem.people?.length"
        class="modal__section"
      >
        <div class="modal__section-header">
          <h3>Peoples</h3>

          <div class="modal__navigation">
            <button
              class="modal__prev"
              type="button"
              aria-label="Prev"
              :disabled="!swiperStates.speciesPeoples.canPrev"
              @click="slideSwiper('speciesPilots', 'prev')"
            >
              &lt
            </button>

            <button
              class="modal__next"
              type="button"
              aria-label="Next"
              :disabled="!swiperStates.speciesPeoples.canNext"
              @click="slideSwiper('speciesPilots', 'next')"
            >
              &gt
            </button>
          </div>
        </div>

        <Swiper
          :slides-per-view="5"
          :space-between="12"
          :breakpoints="breakpoints"
          @swiper="(swiper) => setSwiper('speciesPeoples', swiper)"
          @slide-change="
            (swiper) => updateSwiperState('speciesPeoples', swiper)
          "
        >
          <SwiperSlide v-for="peoples in selectedItem.people" :key="peoples.id">
            <article class="modal__related-card">
              <img
                :src="peoples.image || NotFound"
                :alt="peoples.name"
                @error="$event.target.src = NotFound"
              />
              <span>{{ peoples.name }}</span>
            </article>
          </SwiperSlide>
        </Swiper>
      </section>

      <!-- Species: Movies -->
      <section
        v-if="selectedItem.type === 'species' && selectedItem.films?.length"
        class="modal__section"
      >
        <div class="modal__section-header">
          <h3>Movies</h3>

          <div class="modal__navigation">
            <button
              class="modal__prev"
              type="button"
              aria-label="Prev"
              :disabled="!swiperStates.specieMovies.canPrev"
              @click="slideSwiper('specieMovies', 'prev')"
            >
              &lt
            </button>

            <button
              class="modal__next"
              type="button"
              aria-label="Next"
              :disabled="!swiperStates.specieMovies.canNext"
              @click="slideSwiper('specieMovies', 'next')"
            >
              &gt
            </button>
          </div>
        </div>

        <Swiper
          :slides-per-view="5"
          :space-between="12"
          :breakpoints="breakpoints"
          @swiper="(swiper) => setSwiper('specieMovies', swiper)"
          @slide-change="(swiper) => updateSwiperState('specieMovies', swiper)"
        >
          <SwiperSlide v-for="film in selectedItem.films" :key="film.id">
            <article class="modal__related-card">
              <img
                :src="getCloudinaryImage(film.image) || NotFound"
                :alt="film.title"
                @error="$event.target.src = NotFound"
              />
              <span>{{ film.title }}</span>
            </article>
          </SwiperSlide>
        </Swiper>
      </section>

      <!-- Vehicles: Movies -->
      <section
        v-if="selectedItem.type === 'vehicle' && selectedItem.films?.length"
        class="modal__section"
      >
        <div class="modal__section-header">
          <h3>Movies</h3>

          <div class="modal__navigation">
            <button
              class="modal__prev"
              type="button"
              aria-label="Prev"
              :disabled="!swiperStates.vehiclesMovies.canPrev"
              @click="slideSwiper('vehiclesMovies', 'prev')"
            >
              &lt
            </button>

            <button
              class="modal__next"
              type="button"
              aria-label="Next"
              :disabled="!swiperStates.vehiclesMovies.canNext"
              @click="slideSwiper('vehiclesMovies', 'next')"
            >
              &gt
            </button>
          </div>
        </div>

        <Swiper
          :slides-per-view="5"
          :space-between="12"
          :breakpoints="breakpoints"
          @swiper="(swiper) => setSwiper('vehiclesMovies', swiper)"
          @slide-change="
            (swiper) => updateSwiperState('vehiclesMovies', swiper)
          "
        >
          <SwiperSlide v-for="film in selectedItem.films" :key="film.id">
            <article class="modal__related-card">
              <img
                :src="getCloudinaryImage(film.image) || NotFound"
                :alt="film.title"
                @error="$event.target.src = NotFound"
              />
              <span>{{ film.title }}</span>
            </article>
          </SwiperSlide>
        </Swiper>
      </section>

      <!-- Vehicles: Pilots -->
      <section
        v-if="selectedItem.type === 'vehicle' && selectedItem.pilots?.length"
        class="modal__section"
      >
        <div class="modal__section-header">
          <h3>Pilots</h3>

          <div class="modal__navigation">
            <button
              class="modal__prev"
              type="button"
              aria-label="Prev"
              :disabled="!swiperStates.vehiclesPilots.canPrev"
              @click="slideSwiper('vehiclesPilots', 'prev')"
            >
              &lt
            </button>

            <button
              class="modal__next"
              type="button"
              aria-label="Next"
              :disabled="!swiperStates.vehiclesPilots.canNext"
              @click="slideSwiper('vehiclesPilots', 'next')"
            >
              &gt
            </button>
          </div>
        </div>

        <Swiper
          :slides-per-view="5"
          :space-between="12"
          :breakpoints="breakpoints"
          @swiper="(swiper) => setSwiper('vehiclesPilots', swiper)"
          @slide-change="
            (swiper) => updateSwiperState('vehiclesPilots', swiper)
          "
        >
          <SwiperSlide v-for="pilot in selectedItem.pilots" :key="pilot.id">
            <article class="modal__related-card">
              <img
                :src="pilot.image || NotFound"
                :alt="pilot.name"
                @error="$event.target.src = NotFound"
              />
              <span>{{ pilot.name }}</span>
            </article>
          </SwiperSlide>
        </Swiper>
      </section>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue"

import NotFound from "../assets/images/not-found.jpg"
import { Swiper, SwiperSlide } from "swiper/vue"
import { getCloudinaryImage } from "../services/cloudinary"

import { Clapperboard, Car, Helicopter } from "lucide-vue-next"

import "swiper/css"

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

// Pictures
const getRelationImage = (item, type) => {
  const image = type === "planet" ? getCloudinaryImage(item.image) : item.image

  return image || NotFound
}

// Breakpoints
const breakpoints = {
  480: {
    slidesPerView: 3,
  },
  768: {
    slidesPerView: 5,
  },
}

const swipers = {}

const createSwiperState = () => ({
  canPrev: false,
  canNext: false,
})

const swiperStates = reactive({
  movieCharacters: createSwiperState(),
  moviePlanets: createSwiperState(),
  movieStarships: createSwiperState(),
  movieVehicles: createSwiperState(),
  movieSpecies: createSwiperState(),
  planetCharacters: createSwiperState(),
  planetMovies: createSwiperState(),
  starshipMovies: createSwiperState(),
  starshipPilots: createSwiperState(),
  specieMovies: createSwiperState(),
  speciesPeoples: createSwiperState(),
  vehiclesMovies: createSwiperState(),
  vehiclesPilots: createSwiperState(),
})

const setSwiper = (key, swiper) => {
  swipers[key] = swiper

  updateSwiperState(key, swiper)
}

const updateSwiperState = (key, swiper) => {
  if (!swiper || swiper.destroyed) return

  swiperStates[key].canPrev = !swiper.isBeginning
  swiperStates[key].canNext = !swiper.isEnd
}

const slideSwiper = (key, direction) => {
  const swiper = swipers[key]

  if (!swiper || swiper.destroyed) return

  if (direction === "prev") {
    swiper.slidePrev()
  } else {
    swiper.slideNext()
  }

  updateSwiperState(key, swiper)
}

function formatNumber(value) {
  const number = Number(value)

  return Number.isFinite(number) ? number.toLocaleString("en-US") : value
}
</script>
