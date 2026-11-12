
<template>
  <section class="banner">
    <div class="banner__container">
      <header class="banner__header">
        <img
          class="banner__background"
          src="../../assets/images/hero-galaxy.jpg"
          alt="Universo Star Wars"
        />

        <div class="banner__content">
          <div class="banner__infos">
            <p class="banner__text">
              A long time ago in a galaxy far, far away...
            </p>

            <h1 class="banner__title">
              Explore the
              <span>star wars</span>
              universe
            </h1>

            <p>
              Discover characters, planets, ships, vehicles and everything
              about the saga that conquered generations.
            </p>
          </div>

          <button
            class="banner__explore"
            type="button"
            @click="emit('explore')"
          >
            Explore the galaxy
          </button>
        </div>
      </header>
    </div>
  </section>
</template>

<script setup>
const emit = defineEmits(["explore"])
</script>