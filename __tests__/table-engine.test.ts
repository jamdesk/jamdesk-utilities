import { describe, it, expect } from 'vitest'
import { csvToMarkdownTable, tsvToMarkdownTable } from '../lib/table-engine'

describe('table-engine', () => {
  describe('csvToMarkdownTable', () => {
    it('converts simple CSV', () => {
      const result = csvToMarkdownTable('Name,Age\nAlice,30\nBob,25')
      expect(result).toContain('| Name | Age |')
      expect(result).toContain('| --- | --- |')
      expect(result).toContain('| Alice | 30 |')
      expect(result).toContain('| Bob | 25 |')
    })

    it('handles quoted fields with commas', () => {
      const result = csvToMarkdownTable('Name,Description\nAlice,"Has, commas"')
      expect(result).toContain('| Alice | Has, commas |')
    })

    it('escapes pipe characters in content', () => {
      const result = csvToMarkdownTable('Name,Value\nTest,a|b')
      expect(result).toContain('a\\|b')
    })

    it('trims whitespace from cells', () => {
      const result = csvToMarkdownTable('Name , Age \n Alice , 30 ')
      expect(result).toContain('| Name | Age |')
      expect(result).toContain('| Alice | 30 |')
    })

    it('returns empty string for empty input', () => {
      expect(csvToMarkdownTable('')).toBe('')
    })

    it('handles single column', () => {
      const result = csvToMarkdownTable('Name\nAlice\nBob')
      expect(result).toContain('| Name |')
      expect(result).toContain('| --- |')
    })
  })

  describe('tsvToMarkdownTable', () => {
    it('converts TSV input', () => {
      const result = tsvToMarkdownTable('Name\tAge\nAlice\t30')
      expect(result).toContain('| Name | Age |')
      expect(result).toContain('| Alice | 30 |')
    })
  })
})
