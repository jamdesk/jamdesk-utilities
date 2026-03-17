'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { InputPanel } from '@/components/editor/InputPanel'
import { OutputPanel } from '@/components/editor/OutputPanel'
import { MobileTabToggle } from '@/components/editor/MobileTabToggle'
import { EngineErrorBoundary } from '@/components/editor/EngineErrorBoundary'
import { trackEvent } from '@/lib/analytics'
import { mdxToMarkdownSample } from '@/lib/samples'
import { getContentFromHash, setContentHash } from '@/lib/share'

type EngineModule = typeof import('@/lib/mdx-engine')

export function MdxToMarkdown() {
  const [input, setInput] = useState(() => getContentFromHash() ?? mdxToMarkdownSample)
  const [output, setOutput] = useState('')
  const [activeTab, setActiveTab] = useState<'input' | 'output'>('input')
  const engineRef = useRef<EngineModule | null>(null)

  const runStrip = useCallback(async (text: string) => {
    if (!text.trim()) {
      setOutput('')
      return
    }

    if (!engineRef.current) {
      engineRef.current = await import('@/lib/mdx-engine')
    }

    try {
      const result = await engineRef.current.stripMdxToMarkdown(text)
      setOutput(result)
    } catch (err) {
      setOutput(
        `Error: ${err instanceof Error ? err.message : 'Failed to convert MDX to Markdown'}`
      )
    }
  }, [])

  // Run conversion on mount and whenever input changes
  useEffect(() => {
    runStrip(input)
  }, [input, runStrip])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setContentHash(value)
  }, [])

  const handleLoadSample = useCallback(() => {
    setInput(mdxToMarkdownSample)
    setContentHash(mdxToMarkdownSample)
    trackEvent('Load Sample', { tool: 'MDX to Markdown' })
  }, [])

  return (
    <EngineErrorBoundary toolName="MDX to Markdown">
      <MobileTabToggle activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="grid min-h-[400px] flex-1 grid-cols-1 sm:grid-cols-2">
        <div
          id="input-panel"
          role="tabpanel"
          aria-labelledby="input-tab"
          className={`border-r border-border ${activeTab === 'output' ? 'hidden sm:flex' : 'flex'} flex-col`}
        >
          <InputPanel
            value={input}
            onChange={handleInputChange}
            onLoadSample={handleLoadSample}
            ariaLabel="MDX input editor"
          />
        </div>
        <div
          id="output-panel"
          role="tabpanel"
          aria-labelledby="output-tab"
          className={`${activeTab === 'input' ? 'hidden sm:flex' : 'flex'} flex-col`}
        >
          <OutputPanel
            value={output}
            toolName="MDX to Markdown"
            downloadExtension=".md"
            ariaLabel="Converted Markdown output"
          />
        </div>
      </div>
    </EngineErrorBoundary>
  )
}
