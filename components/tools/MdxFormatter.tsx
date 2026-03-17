'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { InputPanel } from '@/components/editor/InputPanel'
import { OutputPanel } from '@/components/editor/OutputPanel'
import { EditorToolbar } from '@/components/editor/EditorToolbar'
import { MobileTabToggle } from '@/components/editor/MobileTabToggle'
import { EngineErrorBoundary } from '@/components/editor/EngineErrorBoundary'
import { trackEvent } from '@/lib/analytics'

const SAMPLE_MDX = `---
title: Getting Started
description: Learn how to set up your project
---

import { Card } from '@/components/Card'
import { Steps } from '@/components/Steps'

# Getting Started

Welcome to the **getting started** guide. Follow these steps to set up your project.

<Steps>

## Install dependencies

\`\`\`bash
npm install my-package
\`\`\`

## Configure your project

Create a \`config.json\` file in your project root:

\`\`\`json
{
  "name": "my-project",
  "version": "1.0.0"
}
\`\`\`

</Steps>

<Card title="Need help?">
  Check out our [support page](/support) for more information.
</Card>
`

type FormatModule = typeof import('@/lib/mdx-formatter')

export function MdxFormatter() {
  const [input, setInput] = useState(SAMPLE_MDX)
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

  const handleLoadSample = useCallback(() => {
    setInput(SAMPLE_MDX)
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
            onChange={setInput}
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
