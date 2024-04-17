export function randomInt(min: number, max: number): number
export function randomInt(max: number): number

/**
 * generates a random integer between two values.
 * if only one argument is provided, generates a random integer between 0 and the specified value.
 * @param {number} minOrMax minimum value or maximum value if `max` is provided.
 * @param {number} [max] maximum value.
 * @returns {number} the random integer generated.
 * @category number
 */
export function randomInt(minOrMax: number, max?: number) {
  const random = (crypto.getRandomValues(new Uint8Array(1)) as unknown as number) / 255

  const [start, range] = max === undefined ? [0, minOrMax] : [minOrMax, max - minOrMax]
  return Math.floor(random * range) + start
}

/**
 * maps a value from one range to another.
 * @param {number} value the value to map.
 * @param {number} start1 start of the original range.
 * @param {number} stop1 end of the original range.
 * @param {number} start2 start of the target range.
 * @param {number} stop2 end of the target range.
 * @returns {number} the mapped value.
 * @see https://processing.org/reference/map_.html
 * @category number
 */
export function map(value: number, start1: number, stop1: number, start2: number, stop2: number): number {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
}
