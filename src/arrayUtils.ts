import { randomInt } from './numberUtils'

/**
 * returns a random element from an array of values.
 * @template T the type of elements in the array.
 * @param {T[]} values the array of values to choose from.
 * @returns {T} a randomly selected element from the array.
 * @category array
 */
export function getRandomElement<T>(values: T[]): T {
  const index = randomInt(values.length)
  return values[index]
}
