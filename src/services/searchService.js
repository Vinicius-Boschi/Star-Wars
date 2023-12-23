import { fetchData } from "./api"

export const searchedCharacters = async (query) => {
  let results = []

  try {
    const characters = await fetchData(`people/?search=${query}`)
    results = characters.results
  } catch (error) {
    console.error("Error fetching characters", error)
  }

  return results
}