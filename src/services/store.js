import Vuex from "vuex"

import { fetchData } from "./api"

export default new Vuex.Store({
  state: {
    selectedCharacter: null,
    photo: null,
  },
  mutations: {
    setSelectedCharacter(state, character) {
      state.selectedCharacter = character
    },
    setPhoto(state, photo) {
      state.photo = photo
    },
  },
  actions: {
    async selectCharacter({ commit }, characterId) {
      commit("setSelectedCharacter", characterId)
      const photo = await fetchData(characterId)
      commit("setPhoto", photo)
    },
  },
  getters: {
    selectedCharacter: (state) => state.selectedCharacter,
  },
})