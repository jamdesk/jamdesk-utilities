import { describe, it, expect } from 'vitest'
import { validateYaml } from '../lib/yaml-engine'

describe('yaml-engine', () => {
  it('validates correct YAML', () => {
    const result = validateYaml('name: test\nversion: 1')
    expect(result.valid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('catches invalid indentation', () => {
    const result = validateYaml('name: test\n  bad: indentation\n nope: wrong')
    expect(result.valid).toBe(false)
    expect(result.errors.length).toBeGreaterThan(0)
  })

  it('catches duplicate keys', () => {
    const result = validateYaml('name: first\nname: second')
    expect(result.valid).toBe(false)
    expect(result.errors.length).toBeGreaterThan(0)
    expect(result.errors[0].message).toMatch(/duplicate/i)
  })

  it('validates nested YAML', () => {
    const input = 'database:\n  host: localhost\n  port: 5432\n  name: mydb'
    const result = validateYaml(input)
    expect(result.valid).toBe(true)
  })

  it('allows same key under different parents', () => {
    const input = 'a:\n  name: foo\nb:\n  name: bar'
    const result = validateYaml(input)
    expect(result.valid).toBe(true)
  })

  it('catches tabs in indentation', () => {
    const result = validateYaml('name: test\n\tbad: tabs')
    expect(result.valid).toBe(false)
  })

  it('returns parsed output as JSON string', () => {
    const result = validateYaml('name: test\ncount: 42')
    expect(result.valid).toBe(true)
    expect(result.parsed).toContain('"name": "test"')
    expect(result.parsed).toContain('"count": 42')
  })

  it('handles empty input', () => {
    const result = validateYaml('')
    expect(result.valid).toBe(true)
  })
})
