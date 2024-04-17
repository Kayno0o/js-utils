import { randomInt } from './numberUtils'

export function getRandom<T>(values: T[]): T {
  const index = randomInt(values.length)
  return values[index]
}
