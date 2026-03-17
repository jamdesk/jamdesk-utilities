import { describe, it, expect } from 'vitest'
import { encodeContent, decodeContent } from '../lib/share'

describe('share link encoding', () => {
  it('round-trips plain text', () => {
    const text = 'Hello, world!'
    expect(decodeContent(encodeContent(text))).toBe(text)
  })

  it('round-trips empty string', () => {
    expect(decodeContent(encodeContent(''))).toBe('')
  })

  it('round-trips unicode content', () => {
    const text = 'Frontmatter: title: "Uber"'
    expect(decodeContent(encodeContent(text))).toBe(text)
  })

  it('round-trips emoji and CJK characters', () => {
    const text = 'Hello! CJK test'
    expect(decodeContent(encodeContent(text))).toBe(text)
  })

  it('returns null for invalid base64', () => {
    expect(decodeContent('!!!not-base64!!!')).toBeNull()
  })

  it('round-trips special characters (HTML entities, quotes)', () => {
    const text = `<div class="test">&amp; 'single' "double" \`backtick\`</div>`
    expect(decodeContent(encodeContent(text))).toBe(text)
  })

  it('round-trips very long content (>10KB)', () => {
    const text = 'a'.repeat(15_000)
    expect(decodeContent(encodeContent(text))).toBe(text)
  })

  it('round-trips MDX with frontmatter and JSX', () => {
    const text = `---
title: Test
---

import { Card } from '@/components/Card'

# Hello

<Card title="test">
  Content here
</Card>
`
    expect(decodeContent(encodeContent(text))).toBe(text)
  })
})
