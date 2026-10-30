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
            Explore o
            <span>universo star wars</span>
          </h1>

          <p>
            Descubra personagens, planetas, naves, veículos e tudo sobre a saga
            que conquistou gerações.
          </p>

          <button
            class="banner__explore"
            type="button"
            @click="emit('explore')"
          >
            Explorar agora
          </button>
        </div>
      </header>
    </div>
  </section>
</template>

<script setup>
const emit = defineEmits(["explore"])
</script>