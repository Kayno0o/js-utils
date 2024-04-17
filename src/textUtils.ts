export function randomString(length: number, hex?: boolean) {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)

  if (hex)
    return Array.from(array, byte => (`0${(byte & 0xFF).toString(16)}`).slice(-2)).join('')
  return Array.from(array, byte => byte).join('')
}

export function normalizeAccents(str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036F]/g, '')
}

export function slugify(str: string, options?: {
  replace?: string
  lower?: boolean
  trim?: boolean
}): string {
  const replace = options?.replace ?? '-'

  let result = normalizeAccents(str)
    .replace(/[^A-Za-z0-9-]/g, replace)
    .replace(new RegExp(`/${replace}+/g`), replace)

  if (options?.lower ?? true)
    result = result.toLowerCase()

  if (options?.trim ?? true)
    result = result.trim()

  return result
}
