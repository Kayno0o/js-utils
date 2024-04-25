export function randomString(length: number, charset?: string): string {
  if (!charset)
    charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  const charsetLength = charset.length
  let result = ''
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)

  for (let i = 0; i < length; i++) {
    const randomIndex = array[i] % charsetLength
    result += charset.charAt(randomIndex)
  }

  return result
}

/** remove accents and diacritics */
export function normalizeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036F]/g, '')
}

/**
 * converts a string into a slug
 * @param {string} str
 * @param {object} [options]
 * @param {string} [options.replace] the string to replace non-alphanumeric characters with (default='-').
 * @param {boolean} [options.lower] convert the string to lowercase (default=true).
 * @param {boolean} [options.trim] trim leading/trailing whitespace (default=true).
 * @param {boolean} [options.deduplicate] deduplicate successives `replace` char (default=true)
 */
export function slugify(str: string, options?: {
  replace?: string
  lower?: boolean
  trim?: boolean
  deduplicate?: boolean
}): string {
  const replace = options?.replace ?? '-'

  let result = normalizeAccents(str)
    .replace(/[^A-Za-z0-9-]/g, replace)

  if (options?.deduplicate ?? true)
    result = result.replace(new RegExp(`/${replace}+/g`), replace)

  if (options?.lower ?? true)
    result = result.toLowerCase()

  if (options?.trim ?? true)
    result = result.trim()

  return result
}
