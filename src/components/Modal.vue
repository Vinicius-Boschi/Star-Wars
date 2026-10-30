<template>
  <div class="modal" v-if="isOpen && selectedCharacter">
    <div v-if="selectedCharacter" class="modal__container">
      <div
        class="modal__content"
        role="dialog"
        aria-modal="true"
        :aria-label="`Detalhes de ${selectedCharacter.name}`"
      >
        <button
          class="modal__close"
          type="button"
          aria-label="Fechar modal"
          @click="$emit('close')"
        >
          &times
        </button>

        <img
          v-if="selectedCharacter.image"
          :src="selectedCharacter.image"
          :alt="selectedCharacter.name"
          class="modal__image"
        />

        <h2>{{ selectedCharacter.name }}</h2>

        <ul class="modal__info">
          <li v-if="selectedCharacter.height">
            <strong>Altura:</strong>
            {{ selectedCharacter.height }}
          </li>

          <li v-if="selectedCharacter.mass">
            <strong>Peso:</strong>
            {{ selectedCharacter.mass }}
          </li>

          <li v-if="selectedCharacter.gender">
            <strong>Gênero:</strong>
            {{ selectedCharacter.gender }}
          </li>

          <li v-if="selectedCharacter.birth_year">
            <strong>Nascimento:</strong>
            {{ selectedCharacter.birth_year }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  selectedCharacter: {
    type: Object,
    default: null,
  },
})

defineEmits(["close"])
</script>