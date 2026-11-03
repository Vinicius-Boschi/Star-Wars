const AKABAB_URL = "https://akabab.github.io/starwars-api/api"

export async function getAkababCharacters() {
  const response = await fetch(`${AKABAB_URL}/all.json`)

  if (!response.ok) {
    throw new Error(`Akabab: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return data
}