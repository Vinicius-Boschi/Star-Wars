export async function searchedCharacters(searchQuery, currentPage) {
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${searchQuery}&page=${currentPage}`
      )
      const data = await response.json()
      return data.results
    } catch (error) {
      console.error("Failed to search the characters", error)
      return []
    }
}