import { getRandomElement } from './arrayUtils'
import { randomInt } from './numberUtils'

export function randomString(length: number, charset?: string, isCrypto = false): string {
  if (!charset)
    charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  let result = ''
  for (let i = 0; i < length; i++)
    result += charset[randomInt(0, charset.length, isCrypto)]

  return result
}

/** remove accents and diacritics */
export function normalizeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036F]/g, '')
}

export function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
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
  const regexReplace = escapeRegExp(replace)

  let result = normalizeAccents(str)
    .replace(/[^A-Za-z0-9-]/g, replace)

  if (options?.deduplicate ?? true)
    result = result.replace(new RegExp(`${regexReplace}+`, 'g'), replace)

  if (options?.lower ?? true)
    result = result.toLowerCase()

  if (options?.trim ?? true)
    result = result.replace(new RegExp(`^${regexReplace}*|${regexReplace}*$`, 'g'), '')

  return result
}

/** Get the initials of the given words, max 3 characters */
export function getInitials(...words: string[]): string {
  return words.join(' ').split(' ').map(name => name[0]).join('').slice(0, 3).toLocaleUpperCase()
}

export function firstUpper(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const LOREM_WORDS = ['cat', 'kitten', 'whiskers', 'purr', 'meow', 'feline', 'paw', 'tail', 'fur', 'scratch', 'hiss', 'claws', 'kitty', 'tabby', 'siamese', 'persian', 'bengal', 'calico', 'tomcat', 'mouser']

export interface LoremOptionType {
  length?: number
  type?: 'word' | 'sentence' | 'paragraph'
  isCrypto?: boolean
}

export function randomText(options?: LoremOptionType, words = LOREM_WORDS): string {
  let { length = 5, type = 'paragraph', isCrypto = false } = options || {}
  length = Math.max(0, length)

  const rWord = () => getRandomElement(words, isCrypto)
  const rSentence = () => {
    const count = randomInt(5, 15, isCrypto)
    let sentence = rWord()
    for (let i = 1; i < count; i++)
      sentence += (i < count - 1 && Math.random() < 0.1) ? ` ${rWord()},` : ` ${rWord()}`

    sentence += '.'
    return firstUpper(sentence)
  }
  const rParagraph = () => {
    const count = randomInt(3, 7, isCrypto)
    let paragraph = rSentence()
    for (let i = 1; i < count; i++)
      paragraph += ` ${rSentence()}`
    return paragraph
  }

  return Array.from({ length }, () => {
    switch (type) {
      case 'word': return rWord()
      case 'sentence': return rSentence()
      case 'paragraph': default: return rParagraph()
    }
  }).join(type === 'word' ? ' ' : '\n')
}

export function searchOne(query: string, ...values: string[]): boolean {
  query = normalizeAccents(query).toLowerCase()
  return values.some(value => normalizeAccents(value).toLowerCase().includes(query))
}

export function searchAll(query: string, ...values: string[]): boolean {
  query = normalizeAccents(query).toLowerCase()
  return values.every(value => normalizeAccents(value).toLowerCase().includes(query))
}

export function getPlaceholderUrl(props: {
  width?: number
  height?: number
  format?: 'png' | 'svg' | 'jpg' | 'webp' | 'jpeg' | 'mp4'
  color?: string
  backgroundColor?: string
  text?: string
  font?: 'lato' | 'lora' | 'montserrat' | 'open sans' | 'oswald' | 'playfair display' | 'pt sans' | 'raleway' | 'roboto' | 'source sans pro'
}): string {
  const query: any = {}
  if (props.text)
    query.text = encodeURI(props.text.replaceAll(' ', '+').replaceAll('\n', '\\n'))
  if (props.font)
    query.font = encodeURI(props.font)
  const queryString = query ? `?${Object.entries(query).map(e => `${e[0]}=${e[1]}`).join('&')}` : ''

  const path = [props.backgroundColor, props.color, props.format].filter(v => !!v).join('/')

  return `https://placehold.co/${props.width ?? 100}x${props.height ?? 100}${path ? `/${path}` : ''}${queryString}`
}
