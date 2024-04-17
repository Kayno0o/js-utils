export function hexToRgb(hex: string): [number, number, number] {
  const r = Number.parseInt(hex.slice(1, 3), 16)
  const g = Number.parseInt(hex.slice(3, 5), 16)
  const b = Number.parseInt(hex.slice(5, 7), 16)

  return [r, g, b]
}

export function rgbToHex(rgb: [number, number, number]): string {
  return `#${((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1)}`
}

export function contrastRGB(rgbFG: [number, number, number], rgbBG: [number, number, number]): string {
  // if rgbFG is too near to rgbBG, make it a bit lighter
  const diff = 75
  if (Math.abs(rgbFG[0] - rgbBG[0]) > diff || Math.abs(rgbFG[1] - rgbBG[1]) > diff || Math.abs(rgbFG[2] - rgbBG[2]) > diff) {
    return rgbToHex(rgbFG)
  }
  else {
    const decay = (rgbFG[0] > 128 || rgbFG[1] > 128 || rgbFG[2] > 128) ? -diff : diff
    return rgbToHex([Math.min(255, rgbFG[0] + decay), Math.min(255, rgbFG[1] + decay), Math.min(255, rgbFG[2] + decay)])
  }
}
