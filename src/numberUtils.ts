export function randomInt(minOrMax: number, max?: number) {
  const random = (crypto.getRandomValues(new Uint8Array(1)) as unknown as number) / 255

  const [start, range] = max === undefined ? [0, minOrMax] : [minOrMax, max - minOrMax]
  return Math.floor(random * range) + start
}

export default function map(value: number, start1: number, stop1: number, start2: number, stop2: number): number {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
}
