/**
 * converts a hexadecimal color string to an rgb tuple.
 * @param {string} hex the hexadecimal color string (e.g., "#rrggbb" or "#rgb").
 * @returns {[number, number, number]} the rgb tuple [red, green, blue].
 * @category color
 * @example
 * hexToRgb('#f08923') // [240, 137, 35]
 * hexToRgb('#093') // [0, 153, 51]
 * hexToRgb('0aa0f9') // [10, 160, 249]
 */
export function hexToRgb(hex: string): [number, number, number] {
  if (hex.startsWith('#'))
    hex.substring(1)

  if (hex.length === 3 || hex.length === 4)
    hex.split('').map(char => char.repeat(2)).join('')

  const r = Number.parseInt(hex.slice(0, 2), 16)
  const g = Number.parseInt(hex.slice(2, 4), 16)
  const b = Number.parseInt(hex.slice(4, 6), 16)

  return [r, g, b]
}

/**
 * converts an rgb tuple to a hexadecimal color string.
 * @param {[number, number, number]} rgb the rgb tuple [red, green, blue].
 * @returns {string} the hexadecimal color string ("#rrggbb").
 * @category color
 * @example rgbToHex([200, 100, 0]) // '#c86400'
 */
export function rgbToHex(rgb: [number, number, number]): string {
  return `#${((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1)}`
}
