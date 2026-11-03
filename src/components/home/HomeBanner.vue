<template>
  <section class="banner">
    <div class="banner__container">
      <header class="banner__header">
        <img
          class="banner__background"
          src="../../assets/images/Background.png"
          alt="Universo Star Wars"
        />

        <div class="banner__content">
          <h1 class="banner__title">
            Explore the
            <span>universe star wars</span>
          </h1>

          <p>
            Discover characters, planets, ships, vehicles and everything about the saga
            that conquered generations.
          </p>

          <button
            class="banner__explore"
            type="button"
            @click="emit('explore')"
          >
            Explore now
          </button>
        </div>
      </header>
    </div>
  </section>
</template>

<script setup>
const emit = defineEmits(["explore"])
</script>