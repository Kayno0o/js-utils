import { describe, expect, test as it } from 'bun:test'
import { escapeRegExp, getInitials, normalizeAccents, randomString, slugify } from '../src/textUtils'

describe('normalizeAccents function', () => {
  it('handle lowercase accent', () => {
    expect(normalizeAccents('Café au Lait')).toBe('Cafe au Lait')
  })

  it('handle uppercase accent', () => {
    expect(normalizeAccents('Mötley CRÜE')).toBe('Motley CRUE')
  })

  it('handle empty string', () => {
    expect(normalizeAccents('')).toBe('')
  })

  it('handle no accent', () => {
    expect(normalizeAccents('Hello World')).toBe('Hello World')
  })
})

describe('getInitials function', () => {
  it('initials of the given words', () => {
    const result = getInitials('John', 'Doe')
    expect(result).toEqual('JD')
  })

  it('multiple words with spaces', () => {
    const result = getInitials('John Doe Smith')
    expect(result).toEqual('JDS')
  })

  it('one-word input', () => {
    const result = getInitials('Alice')
    expect(result).toEqual('A')
  })

  it('empty input', () => {
    const result = getInitials()
    expect(result).toEqual('')
  })

  it('longer words and trim to 3 characters', () => {
    const result = getInitials('International Business Machines Etc')
    expect(result).toEqual('IBM')
  })

  it('non-alphabetic characters', () => {
    const result = getInitials('123', 'ABC', '$%^')
    expect(result).toEqual('1A$')
  })
})

describe('slugify function', () => {
  it('default options', () => {
    const result = slugify('Hello World')
    expect(result).toEqual('hello-world')
  })

  it('custom replacement', () => {
    const result = slugify('Hello World!', { replace: '_' })
    expect(result).toEqual('hello_world')
  })

  it('lower option is true', () => {
    const result = slugify('Hello World', { lower: true })
    expect(result).toEqual('hello-world')
  })

  it('lower option is false', () => {
    const result = slugify('Hello World', { lower: false })
    expect(result).toEqual('Hello-World')
  })

  it('trim option is true', () => {
    const result = slugify('   Hello World   ', { trim: true })
    expect(result).toEqual('hello-world')
  })

  it('trim option is false', () => {
    const result = slugify('   Hello World   ', { trim: false })
    expect(result).toEqual('-hello-world-')
  })

  it('deduplicate option is true', () => {
    const result = slugify('Hello  World!', { deduplicate: true })
    expect(result).toEqual('hello-world')
  })

  it('deduplicate option is false', () => {
    const result = slugify('Hello  World!', { deduplicate: false })
    expect(result).toEqual('hello--world')
  })

  it('empty string input', () => {
    const result = slugify('', { replace: '_' })
    expect(result).toEqual('')
  })

  it('special characters', () => {
    const result = slugify('Hello $ World!', { lower: false, replace: '_' })
    expect(result).toEqual('Hello_World')
  })

  it('accents and diacritics', () => {
    const result = slugify('Café au Lait', { lower: false, replace: '_' })
    expect(result).toEqual('Cafe_au_Lait')
  })
})

describe('escapeRegExp function', () => {
  it('special characters in a regular expression', () => {
    const input = 'Hello. World? [test]'
    const expectedOutput = 'Hello\\. World\\? \\[test\\]'
    const result = escapeRegExp(input)
    expect(result).toEqual(expectedOutput)
  })

  it('empty string', () => {
    const input = ''
    const expectedOutput = ''
    const result = escapeRegExp(input)
    expect(result).toEqual(expectedOutput)
  })

  it('all special characters', () => {
    const input = '.*+?^${}()|[]\\'
    const expectedOutput = '\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\'
    const result = escapeRegExp(input)
    expect(result).toEqual(expectedOutput)
  })

  it('strings with no special characters', () => {
    const input = 'Hello World'
    const expectedOutput = 'Hello World'
    const result = escapeRegExp(input)
    expect(result).toEqual(expectedOutput)
  })

  it('special characters in a regex pattern', () => {
    const input = '^Hello$'
    const expectedOutput = '\\^Hello\\$'
    const result = escapeRegExp(input)
    expect(result).toEqual(expectedOutput)
  })
})

describe('randomString function', () => {
  const defaultCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  it('should generate a random string of specified length', () => {
    const length = 10
    expect((randomString(length)).length).toEqual(length)
  })

  it('should generate a random string from default charset', () => {
    const length = 10
    expect(randomString(length)).toMatch(new RegExp(`^[${defaultCharset}]{${length}}$`))
  })

  it('should generate a random string from custom charset', () => {
    const length = 10
    const charset = 'abc123'
    expect(randomString(length, charset)).toMatch(new RegExp(`^[${charset}]{${length}}$`))
  })

  it('should handle empty charset', () => {
    const length = 10
    const charset = ''
    expect(randomString(length, charset)).toMatch(new RegExp(`^[${defaultCharset}]{${length}}$`))
  })

  it('should handle length 0', () => {
    const length = 0
    const charset = 'abc123'
    expect(randomString(length, charset)).toEqual('')
  })

  it('should handle large length with default charset', () => {
    const length = 1000
    const result = randomString(length)
    expect(result.length).toEqual(length)
    expect(result).toMatch(new RegExp(`^[${defaultCharset}]{${length}}$`))
  })
})
