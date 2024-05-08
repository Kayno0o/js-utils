import { describe, expect, test as it } from 'bun:test'
import { normalizeAccents } from '../src/textUtils'

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
