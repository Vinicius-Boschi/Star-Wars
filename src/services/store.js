import Vuex from "vuex"

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
    async selectCharacter({ commit }, character) {
      commit("setSelectedCharacter", character)
      const photo = await fetchRequision(character)
      commit("setSelectedCharacterPhoto", photo)
    },
  },
  getters: {
    selectedCharacter: (state) => state.selectedCharacter,
  },
})