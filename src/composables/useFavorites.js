import { ref } from "vue"

const favorites = ref([])

function isFavorite(id, type) {
  return favorites.value.some(
    (favorite) => favorite.id === Number(id) && favorite.type === type,
  )
}

function toggleFavorite(item, type) {
  const id = Number(item.id)

  if (isFavorite(id, type)) {
    favorites.value = favorites.value.filter(
      (favorite) => !(favorite.id === id && favorite.type === type),
    )
  } else {
    favorites.value.push({
      ...item,
      id,
      type,
    })
  }

  saveFavorites()
}

function saveFavorites() {
  try {
    localStorage.setItem(
      "star_wars_favorites",
      JSON.stringify(favorites.value),
    )
  } catch (err) {
    console.error("Erro ao salvar favoritos:", err)
  }
}

function loadFavorites() {
  try {
    const savedFavorites = localStorage.getItem("star_wars_favorites")

    if (!savedFavorites) {
      favorites.value = []
      return
    }

    const parsedFavorites = JSON.parse(savedFavorites)

    favorites.value = Array.isArray(parsedFavorites)
      ? parsedFavorites
          .filter(
            (item) =>
              item &&
              Number.isFinite(Number(item.id)) &&
              typeof item.type === "string",
          )
          .map((item) => ({
            ...item,
            id: Number(item.id),
          }))
      : []
  } catch (err) {
    console.error("Erro ao carregar favoritos:", err)
    favorites.value = []
  }
}

export function useFavorites() {
  return {
    favorites,
    loadFavorites,
    isFavorite,
    toggleFavorite,
  }
}