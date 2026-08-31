import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { ConversionCta } from '@/components/seo/ConversionCta'

afterEach(() => {
  cleanup()
})

describe('ConversionCta', () => {
  it('links to signup, not pricing, and carries the tool slug', () => {
    render(
      <ConversionCta
        text="Mermaid renders natively in Jamdesk docs"
        description="Paste a diagram straight into an MDX page."
        toolSlug="mermaid-editor"
      />,
    )
    const link = screen.getByRole('link')
    const href = link.getAttribute('href') ?? ''

    expect(href).toContain('dashboard.jamdesk.com/signup')
    // pathname-shaped `from`, matching marketing's getSignupUrl convention
    expect(href).toContain('from=%2Futilities%2Fmermaid-editor')
    expect(href).not.toContain('/pricing')
  })

  it('uses the Start for Free label', () => {
    render(<ConversionCta text="T" description="D" toolSlug="mdx-validator" />)
    expect(screen.getByText('Start for Free')).toBeDefined()
  })

  // Opens in a new tab DELIBERATELY. Two independent reasons, both verified:
  //
  // 1. `lib/analytics.ts` calls `window.plausible(name, { props })` with no
  //    callback. Plausible sends by XHR, so a same-tab navigation races the
  //    unload and the `CTA Click` event is dropped — the single signal Phase 1
  //    needs to prove the CTA works.
  // 2. `components/tools/MermaidEditor.tsx` persists only the theme, never the
  //    document. Same-tab navigation silently discards whatever the visitor
  //    pasted in.
  //
  // Do not "clean this up" — `rel="noopener noreferrer"` is what makes it safe.
  it('opens in a new tab so the beacon lands and in-progress work survives', () => {
    render(<ConversionCta text="T" description="D" toolSlug="mdx-validator" />)
    const link = screen.getByRole('link')
    expect(link.getAttribute('target')).toBe('_blank')
    expect(link.getAttribute('rel')).toContain('noopener')
  })

  it('falls back to the hub path when no toolSlug is given', () => {
    render(<ConversionCta text="T" description="D" />)
    const href = screen.getByRole('link').getAttribute('href') ?? ''
    expect(href).toContain('dashboard.jamdesk.com/signup')
    expect(href).toContain('from=%2Futilities')
    expect(href).not.toContain('undefined')
  })
})
