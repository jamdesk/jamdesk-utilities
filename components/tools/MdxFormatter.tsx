'use client'

import { useState, useCallback, useEffect } from 'react'
import { InputPanel } from '@/components/editor/InputPanel'
import { OutputPanel } from '@/components/editor/OutputPanel'
import { EditorToolbar } from '@/components/editor/EditorToolbar'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { useToolInput } from '@/lib/use-tool-input'
import { useLazyModule } from '@/lib/use-lazy-module'
import { formatterSample } from '@/lib/samples'

const importFormatter = () => import('@/lib/mdx-formatter')

export function MdxFormatter() {
  const { input, handleInputChange, handleLoadSample } = useToolInput(formatterSample, 'MDX Formatter')
  const [output, setOutput] = useState('')
  const [tabWidth, setTabWidth] = useState(2)
  const getEngine = useLazyModule(importFormatter)

  useEffect(() => {
    let cancelled = false
    if (!input.trim()) {
      setOutput('')
      return
    }
    getEngine().then((engine) =>
      engine.formatMdx(input, { tabWidth })
    ).then((result) => {
      if (!cancelled) setOutput(result.formatted)
    })
    return () => { cancelled = true }
  }, [input, tabWidth, getEngine])

  const toolbarOptions = [
    {
      label: '4-space tabs',
      value: tabWidth === 4,
      onChange: (v: boolean) => setTabWidth(v ? 4 : 2),
    },
  ]

  return (
    <ToolLayout
      toolName="MDX Formatter"
      toolbar={<EditorToolbar options={toolbarOptions} />}
      inputPanel={
        <InputPanel
          value={input}
          onChange={handleInputChange}
          onLoadSample={handleLoadSample}
          ariaLabel="MDX input editor"
        />
      }
      outputPanel={
        <OutputPanel
          value={output}
          toolName="MDX Formatter"
          ariaLabel="Formatted MDX output"
        />
      }
    />
  )
}
