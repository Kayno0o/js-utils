/**
 * generates a random string of the specified length using cryptographic random values.
 * @param {number} length the length of the random string to generate.
 * @param {boolean} [hex] if true, generates a random hexadecimal string; otherwise, generates a random byte string.
 * @returns {string} the random string generated.
 * @category text
 */
export function randomString(length: number, hex?: boolean) {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)

  if (hex)
    return Array.from(array, byte => (`0${(byte & 0xFF).toString(16)}`).slice(-2)).join('')
  return Array.from(array, byte => byte).join('')
}

/**
 * normalizes a string by removing accents and diacritics.
 * @param {string} str the input string to normalize.
 * @returns {string} the normalized string.
 * @category text
 */
export function normalizeAccents(str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036F]/g, '')
}

/**
 * converts a string into a slug suitable for urls.
 * @param {string} str the input string to slugify.
 * @param {object} [options] optional configuration options.
 * @param {string} [options.replace] the string to replace non-alphanumeric characters with (default is '-').
 * @param {boolean} [options.lower] whether to convert the string to lowercase (default is true).
 * @param {boolean} [options.trim] whether to trim leading and trailing whitespace (default is true).
 * @param {boolean} [options.deduplicate] whether to deduplicate successives `replace` char (default is true)
 * @returns {string} the slugified string.
 * @category text
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
