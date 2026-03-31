import { describe, it, expect } from 'vitest'
import { jsonToYaml, yamlToJson } from '../lib/json-yaml-engine'

describe('json-yaml-engine', () => {
  describe('jsonToYaml', () => {
    it('converts simple JSON object', () => {
      const result = jsonToYaml('{"name": "test", "count": 42}')
      expect(result.output).toContain('name: test')
      expect(result.output).toContain('count: 42')
      expect(result.error).toBeNull()
    })

    it('converts nested JSON', () => {
      const result = jsonToYaml('{"db": {"host": "localhost", "port": 5432}}')
      expect(result.output).toContain('db:')
      expect(result.output).toContain('  host: localhost')
      expect(result.error).toBeNull()
    })

    it('converts JSON array', () => {
      const result = jsonToYaml('[1, 2, 3]')
      expect(result.output).toContain('- 1')
      expect(result.error).toBeNull()
    })

    it('returns error for invalid JSON', () => {
      const result = jsonToYaml('{bad json}')
      expect(result.error).not.toBeNull()
      expect(result.output).toBe('')
    })

    it('handles empty input', () => {
      const result = jsonToYaml('')
      expect(result.output).toBe('')
      expect(result.error).toBeNull()
    })
  })

  describe('yamlToJson', () => {
    it('converts simple YAML', () => {
      const result = yamlToJson('name: test\ncount: 42')
      expect(result.error).toBeNull()
      const parsed = JSON.parse(result.output)
      expect(parsed.name).toBe('test')
      expect(parsed.count).toBe(42)
    })

    it('converts nested YAML', () => {
      const result = yamlToJson('db:\n  host: localhost\n  port: 5432')
      expect(result.error).toBeNull()
      const parsed = JSON.parse(result.output)
      expect(parsed.db.host).toBe('localhost')
    })

    it('returns error for invalid YAML', () => {
      const result = yamlToJson(':\n  bad\n:\n  yaml\n: broken')
      expect(result.error).not.toBeNull()
    })

    it('handles empty input', () => {
      const result = yamlToJson('')
      expect(result.output).toBe('')
      expect(result.error).toBeNull()
    })
  })
})
