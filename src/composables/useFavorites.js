import { ref } from "vue"

const favorites = ref([])

function isFavorite(id, type) {
  return favorites.value.some(
    (favorite) => String(favorite.id) === String(id) && favorite.type === type,
  )
}

function toggleFavorite(item, type) {
  const id = item.id

  if (isFavorite(id, type)) {
    favorites.value = favorites.value.filter(
      (favorite) =>
        !(String(favorite.id) === String(id) && favorite.type === type),
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
    console.error("Error to save favorites:", err)
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
      ? parsedFavorites.filter(
          (item) =>
            item &&
            item.id !== null &&
            item.id !== undefined &&
            item.id !== "" &&
            typeof item.type === "string",
        )
      : []
  } catch (err) {
    console.error("Error to load favorites:", err)
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