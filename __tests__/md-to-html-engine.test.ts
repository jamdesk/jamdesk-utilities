import { describe, it, expect } from 'vitest'
import { convertMdToHtml } from '../lib/md-to-html-engine'

describe('md-to-html-engine', () => {
  it('converts a heading', async () => {
    const result = await convertMdToHtml('# Hello')
    expect(result).toContain('<h1>Hello</h1>')
  })

  it('converts a paragraph with bold', async () => {
    const result = await convertMdToHtml('This is **bold** text.')
    expect(result).toContain('<strong>bold</strong>')
  })

  it('converts a code block', async () => {
    const result = await convertMdToHtml('```js\nconst x = 1\n```')
    expect(result).toContain('<code')
    expect(result).toContain('const x = 1')
  })

  it('converts a link', async () => {
    const result = await convertMdToHtml('[Jamdesk](https://jamdesk.com)')
    expect(result).toContain('href="https://jamdesk.com"')
    expect(result).toContain('Jamdesk')
  })

  it('converts a list', async () => {
    const result = await convertMdToHtml('- item one\n- item two')
    expect(result).toContain('<ul>')
    expect(result).toContain('<li>item one</li>')
  })

  it('strips frontmatter when option set', async () => {
    const input = '---\ntitle: Test\n---\n# Hello'
    const result = await convertMdToHtml(input, { stripFrontmatter: true })
    expect(result).not.toContain('title: Test')
    expect(result).toContain('<h1>Hello</h1>')
  })

  it('preserves frontmatter as preformatted block by default', async () => {
    const input = '---\ntitle: Test\n---\n# Hello'
    const result = await convertMdToHtml(input)
    expect(result).toContain('title: Test')
  })

  it('returns empty string for empty input', async () => {
    const result = await convertMdToHtml('')
    expect(result.trim()).toBe('')
  })
})
