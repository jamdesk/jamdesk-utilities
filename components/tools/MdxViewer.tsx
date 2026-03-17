'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import type { Root } from 'mdast'
import { InputPanel } from '@/components/editor/InputPanel'
import { MobileTabToggle } from '@/components/editor/MobileTabToggle'
import { EngineErrorBoundary } from '@/components/editor/EngineErrorBoundary'
import { MdxRenderer } from './viewer/MdxRenderer'
import { trackEvent } from '@/lib/analytics'
import { viewerSample } from '@/lib/samples'
import { getContentFromHash, setContentHash } from '@/lib/share'

type EngineModule = typeof import('@/lib/mdx-engine')

export function MdxViewer() {
  const [input, setInput] = useState(() => getContentFromHash() ?? viewerSample)
  const [ast, setAst] = useState<Root | null>(null)
  const [parseError, setParseError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'input' | 'output'>('input')
  const engineRef = useRef<EngineModule | null>(null)

  const runParse = useCallback(async (text: string) => {
    if (!text.trim()) {
      setAst(null)
      setParseError(null)
      return
    }

    if (!engineRef.current) {
      engineRef.current = await import('@/lib/mdx-engine')
    }

    try {
      const result = await engineRef.current.parseMdxToAst(text)
      setAst(result)
      setParseError(null)
    } catch (err) {
      setParseError(err instanceof Error ? err.message : 'Failed to parse MDX')
      setAst(null)
    }
  }, [])

  // Run parse on mount and whenever input changes
  useEffect(() => {
    runParse(input)
  }, [input, runParse])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setContentHash(value)
  }, [])

  const handleLoadSample = useCallback(() => {
    setInput(viewerSample)
    setContentHash(viewerSample)
    trackEvent('Load Sample', { tool: 'MDX Viewer' })
  }, [])

  return (
    <EngineErrorBoundary toolName="MDX Viewer">
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
          <PreviewPanel ast={ast} parseError={parseError} />
        </div>
      </div>
    </EngineErrorBoundary>
  )
}

function PreviewPanel({
  ast,
  parseError,
}: {
  ast: Root | null
  parseError: string | null
}) {
  return (
    <div className="flex h-full flex-col" aria-live="polite">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="text-sm font-medium text-foreground">Preview</span>
      </div>

      {/* Preview area */}
      <div className="flex-1 overflow-y-auto p-4">
        {parseError ? (
          <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3">
            <span className="text-sm font-medium text-destructive">
              Parse Error
            </span>
            <p className="mt-1 text-sm text-muted-foreground">{parseError}</p>
          </div>
        ) : ast ? (
          <MdxRenderer ast={ast} />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Enter MDX to preview
          </div>
        )}
      </div>
    </div>
  )
}
