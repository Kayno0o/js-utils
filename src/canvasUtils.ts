/**
 * Converts an image to WebP format.
 * @param {string} imageUrl The URL of the image to convert.
 * @param {object} [options] Options for the conversion.
 * @param {number} [options.maxWidth] The maximum width of the converted image.
 * @param {number} [options.maxHeight] The maximum height of the converted image.
 * @param {number} [options.quality] The quality of the converted image (0 to 1).
 * @param {'image/webp' | 'image/png' | 'image/jpeg'} [options.format] The format of the converted image.
 * @returns {Promise<string>} A promise that resolves with the data URL of the converted image.
 */
export async function convertImage(imageUrl: string, options?: {
  maxWidth?: number
  maxHeight?: number
  quality?: number
  format?: 'image/webp' | 'image/png' | 'image/jpeg'
}): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx)
      return reject(new Error('Context not found'))

    const img = new Image()
    img.crossOrigin = 'anonymous' // enable CORS if needed
    img.src = imageUrl

    img.onload = () => {
      let width = img.width
      let height = img.height

      if (options?.maxWidth && width > options.maxWidth) {
        height *= options.maxWidth / width
        width = options.maxWidth
      }
      if (options?.maxHeight && height > options.maxHeight) {
        width *= options.maxHeight / height
        height = options.maxHeight
      }

      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0, width, height)

      resolve(canvas.toDataURL(options?.format ?? 'image/webp', options?.quality ?? 0.8))
    }

    img.onerror = reject
  })
}
