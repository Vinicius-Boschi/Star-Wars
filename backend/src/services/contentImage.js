import content from "../data/content.json" with { type: "json" }

export function withContentImage(items, type, field = "name") {
  const list = content[type] || []

  return items.map((item) => ({
    ...item,
    image: list.find((entry) => entry[field] === item[field])?.image || null,
  }))
}