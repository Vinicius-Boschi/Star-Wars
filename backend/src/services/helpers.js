export const ONE_HOUR = 60 * 60 * 1000

export const toList = (data) =>
  Array.isArray(data) ? data : data?.data || data?.results || []

export function extractIdFromUrl(url) {
  const match = url?.match(/\/(\d+)\/?$/)
  return match ? Number(match[1]) : null
}

export function normalizeName(name) {
  return (name || "")
    .toLowerCase()
    .replace(/\([^)]*\)/g, "")
    .replace(/["']/g, "")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export const fromDatabank = (item) => ({
  id: item._id,
  name: item.name,
  image: item.image || null,
  description: item.description || "",
})

export function indexByName(items) {
  const map = new Map()

  for (const item of items) {
    const key = normalizeName(item.name)
    if (!map.has(key)) map.set(key, item)
  }

  return map
}

export async function fetchAllPages(fetchPage, limit = 100) {
  const items = []
  let page = 1

  while (true) {
    const response = await fetchPage(page, limit)
    const data = toList(response)

    items.push(...data)

    const total = response.info?.total

    if (!total || items.length >= total || !data.length) break

    page++
  }

  return items
}

export function cached(fn, ttl = ONE_HOUR) {
  let promise = null
  let startedAt = 0

  return () => {
    if (promise && Date.now() - startedAt < ttl) return promise

    startedAt = Date.now()

    const current = fn().catch((error) => {
      if (promise === current) promise = null
      throw error
    })

    promise = current
    return promise
  }
}

export const databankList = (fetchPage) =>
  cached(() => fetchAllPages(fetchPage))