import { randomInt } from './numberUtils'

export function getRandomElement<T>(values: T[], isCrypto = false): T {
  const index = randomInt(0, values.length, isCrypto)
  return values[index]
}

export function uniqueArray<T extends string | number | symbol | boolean | null | undefined>(arr: T[]): T[] {
  return [...new Set(arr)]
}
