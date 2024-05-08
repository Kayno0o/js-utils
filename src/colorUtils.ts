export function hexToRgb(hex: string): [number, number, number] {
  if (/[^#a-fA-F0-9]/.test(hex))
    return [0, 0, 0]

  if (hex.startsWith('#'))
    hex = hex.substring(1)

  if (hex.length === 3 || hex.length === 4)
    hex = hex.split('').map(char => char.repeat(2)).join('')

  if (hex.length !== 6 && hex.length !== 8)
    return [0, 0, 0]

  const r = Number.parseInt(hex.slice(0, 2), 16)
  const g = Number.parseInt(hex.slice(2, 4), 16)
  const b = Number.parseInt(hex.slice(4, 6), 16)

  return [r, g, b]
}

export function rgbToHex(rgb: [number, number, number]): string
export function rgbToHex(r: number, g: number, b: number): string

export function rgbToHex(rgb: [number, number, number] | number, g?: number, b?: number): string {
  if (Array.isArray(rgb))
    return `#${((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1)}`.toUpperCase()
  return `#${((1 << 24) + (rgb << 16) + (g! << 8) + b!).toString(16).slice(1)}`.toUpperCase()
}
