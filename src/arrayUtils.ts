import { randomInt } from './numberUtils'

export function getRandomElement<T>(values: T[]): T {
  const index = randomInt(values.length)
  return values[index]
}
