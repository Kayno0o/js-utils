import { describe, expect, test as it } from 'bun:test'
import { map } from '../src/numberUtils'

describe('map function', () => {
  it('map with int value', () => {
    expect(map(50, 0, 100, 0, 10)).toBe(5)
  })

  it('map with float value', () => {
    expect(map(2.5, 0, 4, 0, 1)).toBe(0.625)
  })

  it('map with start different from 0', () => {
    expect(map(2.5, 1, 4, 0, 2)).toBe(1)
  })
})
