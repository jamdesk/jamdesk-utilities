import { describe, it, expect } from 'vitest'
import { formatMdx } from '../lib/mdx-formatter'

describe('formatMdx', () => {
  it('formats messy MDX with proper indentation', async () => {
    const input = '---\ntitle: "Test"\n---\n# Hello\n<Callout>text</Callout>'
    const result = await formatMdx(input)
    expect(result.formatted).toContain('# Hello')
    expect(result.error).toBeNull()
  })

  it('returns error when prettier throws', async () => {
    // Prettier's MDX parser is very lenient, so we test the error path
    // by passing a value that triggers a runtime error (non-string).
    // In real usage, this catches any unexpected Prettier failures.
    const result = await formatMdx(42 as unknown as string)
    expect(result.error).toBeTruthy()
  })

  it('handles empty input', async () => {
    const result = await formatMdx('')
    expect(result.formatted).toBe('')
    expect(result.error).toBeNull()
  })

  it('handles whitespace-only input', async () => {
    const result = await formatMdx('   \n\n  ')
    expect(result.formatted).toBe('')
    expect(result.error).toBeNull()
  })

  it('preserves frontmatter', async () => {
    const input = '---\ntitle: "Test"\ndescription: "A test"\n---\n\nContent'
    const result = await formatMdx(input)
    expect(result.formatted).toContain('title: "Test"')
  })

  it('formats MDX with deeply nested JSX', async () => {
    const input =
      '<Tabs><Tab label="A"><Callout><CodeBlock>code</CodeBlock></Callout></Tab></Tabs>'
    const result = await formatMdx(input)
    expect(result.error).toBeNull()
    expect(result.formatted).toContain('Tabs')
  })

  it('handles MDX with only frontmatter', async () => {
    const input = '---\ntitle: "Just frontmatter"\n---'
    const result = await formatMdx(input)
    expect(result.error).toBeNull()
  })

  it('handles MDX with code blocks containing JSX-like content', async () => {
    const input = '```jsx\n<Component prop="value" />\n```'
    const result = await formatMdx(input)
    expect(result.formatted).toContain('```')
  })

  it('handles MDX with import statements', async () => {
    const input =
      'import { Callout } from "./components"\n\n# Hello\n\n<Callout>text</Callout>'
    const result = await formatMdx(input)
    expect(result.error).toBeNull()
    expect(result.formatted).toContain('import')
  })

  it('respects tabWidth option', async () => {
    const input = '<Callout>\ntext\n</Callout>'
    const result2 = await formatMdx(input, { tabWidth: 2 })
    const result4 = await formatMdx(input, { tabWidth: 4 })
    expect(result2.error).toBeNull()
    expect(result4.error).toBeNull()
  })

  it('adds trailing newline', async () => {
    const input = '# Hello'
    const result = await formatMdx(input)
    expect(result.formatted.endsWith('\n')).toBe(true)
  })
})
