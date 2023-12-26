const BASE_URL = "https://swapi.dev/api/"

export const fetchData = async (endpoint, page = "") => {
  const url = `${BASE_URL}${encodeURIComponent(endpoint)}${
    page ? `/?page=${page}` : ""
  }`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Error fetching data. Status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}