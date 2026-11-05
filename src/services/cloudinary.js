const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`

export function getCloudinaryImage(publicId, options = {}) {
  const { quality = "auto", format = "auto" } = options

  const transformations = []

  if (format === "auto") {
    transformations.push("f_auto")
  }

  if (quality === "auto") {
    transformations.push("q_auto")
  }

  const transformationPath = transformations.length
    ? `${transformations.join(",")}/`
    : ""
  return `${BASE_URL}/${transformationPath}${publicId}`
}