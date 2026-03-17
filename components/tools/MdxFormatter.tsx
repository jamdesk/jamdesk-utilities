'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { InputPanel } from '@/components/editor/InputPanel'
import { OutputPanel } from '@/components/editor/OutputPanel'
import { EditorToolbar } from '@/components/editor/EditorToolbar'
import { MobileTabToggle } from '@/components/editor/MobileTabToggle'
import { EngineErrorBoundary } from '@/components/editor/EngineErrorBoundary'
import { trackEvent } from '@/lib/analytics'
import { formatterSample } from '@/lib/samples'
import { getContentFromHash, setContentHash } from '@/lib/share'

type FormatModule = typeof import('@/lib/mdx-formatter')

export function MdxFormatter() {
  const [input, setInput] = useState(() => getContentFromHash() ?? formatterSample)
  const [output, setOutput] = useState('')
  const [tabWidth, setTabWidth] = useState(2)
  const [activeTab, setActiveTab] = useState<'input' | 'output'>('input')
  const engineRef = useRef<FormatModule | null>(null)

  const runFormat = useCallback(async (text: string, tw: number) => {
    if (!text.trim()) {
      setOutput('')
      return
    }

    if (!engineRef.current) {
      engineRef.current = await import('@/lib/mdx-formatter')
    }

    const result = await engineRef.current.formatMdx(text, { tabWidth: tw })
    setOutput(result.formatted)
  }, [])

  // Run format on mount and whenever input/options change
  useEffect(() => {
    runFormat(input, tabWidth)
  }, [input, tabWidth, runFormat])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setContentHash(value)
  }, [])

  const handleLoadSample = useCallback(() => {
    setInput(formatterSample)
    setContentHash(formatterSample)
    trackEvent('Load Sample', { tool: 'MDX Formatter' })
  }, [])

  const toolbarOptions = [
    {
      label: '4-space tabs',
      value: tabWidth === 4,
      onChange: (v: boolean) => setTabWidth(v ? 4 : 2),
    },
  ]

  return (
    <EngineErrorBoundary toolName="MDX Formatter">
      <EditorToolbar options={toolbarOptions} />
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
            toolName="MDX Formatter"
            ariaLabel="Formatted MDX output"
          />
        </div>
      </div>
    </EngineErrorBoundary>
  )
}
