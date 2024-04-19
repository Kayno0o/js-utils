import { randomInt } from './numberUtils'

/** @category array */
export function getRandomElement<T>(values: T[]): T {
  const index = randomInt(values.length)
  return values[index]
}
