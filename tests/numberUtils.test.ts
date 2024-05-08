import { describe, expect, test as it } from 'bun:test'
import { humanFileSize, map, randomInt } from '../src/numberUtils'

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

describe('humanFileSize function', () => {
  it('handle negative bytes', () => {
    expect(humanFileSize(-1024)).toEqual('-1.0 KiB')
  })

  it('handle 0', () => {
    expect(humanFileSize(0)).toEqual('0 B')
  })

  it('default parameters', () => {
    expect(humanFileSize(1024)).toEqual('1.0 KiB')
  })

  it('metric units', () => {
    expect(humanFileSize(1500000, true)).toEqual('1.5 MB')
  })

  it('custom decimal places', () => {
    expect(humanFileSize(5368709120, false, 2)).toEqual('5.00 GiB')
  })

  it('handle very large bytes', () => {
    expect(humanFileSize(1234567890345678, false, 2)).toEqual('1.10 PiB')
  })
})

describe('randomInt function', () => {
  it('within the specified range', () => {
    const max = 100
    const result = randomInt(0, max)
    expect(result).toBeGreaterThanOrEqual(0)
    expect(result).toBeLessThanOrEqual(max)
    expect(Number.isInteger(result)).toBe(true)
  })

  it('from 0 to the specified max', () => {
    const max = 100
    const result = randomInt(max)
    expect(result).toBeGreaterThanOrEqual(0)
    expect(result).toBeLessThanOrEqual(max)
    expect(Number.isInteger(result)).toBe(true)
  })

  it('negative min and max', () => {
    const min = -100
    const max = 100
    const result = randomInt(min, max)
    expect(result).toBeGreaterThanOrEqual(min)
    expect(result).toBeLessThanOrEqual(max)
    expect(Number.isInteger(result)).toBe(true)
  })

  it('max as 0', () => {
    const min = 0
    const max = 0
    const result = randomInt(min, max)
    expect(result).toBe(0)
    expect(Number.isInteger(result)).toBe(true)
  })

  it('max range', () => {
    const min = Number.MIN_SAFE_INTEGER
    const max = Number.MAX_SAFE_INTEGER
    const result = randomInt(min, max)
    expect(result).toBeGreaterThanOrEqual(min)
    expect(result).toBeLessThanOrEqual(max)
    expect(Number.isInteger(result)).toBe(true)
  })
})
