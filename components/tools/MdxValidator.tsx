'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { InputPanel } from '@/components/editor/InputPanel'
import { EditorToolbar } from '@/components/editor/EditorToolbar'
import { MobileTabToggle } from '@/components/editor/MobileTabToggle'
import { EngineErrorBoundary } from '@/components/editor/EngineErrorBoundary'
import { trackEvent } from '@/lib/analytics'
import { validatorSample } from '@/lib/samples'
import { getContentFromHash, setContentHash } from '@/lib/share'
import type { ValidationError, ValidationResult } from '@/lib/mdx-engine'

type EngineModule = typeof import('@/lib/mdx-engine')

export function MdxValidator() {
  const [input, setInput] = useState(() => getContentFromHash() ?? validatorSample)
  const [result, setResult] = useState<ValidationResult | null>(null)
  const [activeTab, setActiveTab] = useState<'input' | 'output'>('input')
  const engineRef = useRef<EngineModule | null>(null)

  const runValidation = useCallback(async (text: string) => {
    if (!text.trim()) {
      setResult({ valid: true, errors: [] })
      return
    }

    if (!engineRef.current) {
      engineRef.current = await import('@/lib/mdx-engine')
    }

    const validationResult = await engineRef.current.validateMdx(text)
    setResult(validationResult)
  }, [])

  // Run validation on mount and whenever input changes
  useEffect(() => {
    runValidation(input)
  }, [input, runValidation])

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    setContentHash(value)
  }, [])

  const handleLoadSample = useCallback(() => {
    setInput(validatorSample)
    setContentHash(validatorSample)
    trackEvent('Load Sample', { tool: 'MDX Validator' })
  }, [])

  const handleCopyErrors = useCallback(async () => {
    if (!result || result.errors.length === 0) return

    const text = result.errors
      .map((e) => `${e.line}:${e.column} [${e.severity}] ${e.message}`)
      .join('\n')

    try {
      await navigator.clipboard.writeText(text)
      trackEvent('Copy', { tool: 'MDX Validator' })
    } catch {
      // Clipboard API not available
    }
  }, [result])

  const handleDownloadErrors = useCallback(() => {
    if (!result || result.errors.length === 0) return

    const text = result.errors
      .map((e) => `${e.line}:${e.column} [${e.severity}] ${e.message}`)
      .join('\n')

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'validation-errors.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    trackEvent('Download', { tool: 'MDX Validator' })
  }, [result])

  const status = result
    ? { valid: result.valid, errorCount: result.errors.length }
    : undefined

  return (
    <EngineErrorBoundary toolName="MDX Validator">
      <EditorToolbar status={status} />
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
          <ValidationOutput
            result={result}
            onCopy={handleCopyErrors}
            onDownload={handleDownloadErrors}
          />
        </div>
      </div>
    </EngineErrorBoundary>
  )
}

function ValidationOutput({
  result,
  onCopy,
  onDownload,
}: {
  result: ValidationResult | null
  onCopy: () => void
  onDownload: () => void
}) {
  if (!result) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Validating...
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col" aria-live="polite">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="text-sm font-medium text-foreground">
          {result.valid ? 'Validation Result' : `${result.errors.length} ${result.errors.length === 1 ? 'Issue' : 'Issues'}`}
        </span>
        {result.errors.length > 0 && (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onCopy}
              className="min-h-[44px] rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              Copy
            </button>
            <button
              type="button"
              onClick={onDownload}
              className="min-h-[44px] rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              Download
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {result.valid ? (
          <div className="flex h-full flex-col items-center justify-center gap-2">
            <span className="text-3xl text-success" aria-hidden="true">
              &#10003;
            </span>
            <span className="text-sm font-medium text-success">
              Valid MDX
            </span>
            <span className="text-xs text-muted-foreground">
              No syntax errors found
            </span>
          </div>
        ) : (
          <ul className="space-y-2" role="list" aria-label="Validation errors">
            {result.errors.map((error, i) => (
              <ErrorItem key={i} error={error} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function ErrorItem({ error }: { error: ValidationError }) {
  return (
    <li className="rounded-md border border-border bg-surface-deep p-3">
      <div className="flex items-start gap-2">
        <span
          className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-xs font-medium ${
            error.severity === 'error'
              ? 'bg-destructive/20 text-destructive'
              : 'bg-warning/20 text-warning'
          }`}
        >
          {error.severity}
        </span>
        <div className="min-w-0 flex-1">
          <span className="text-xs text-muted-foreground">
            {error.line}:{error.column}
          </span>
          <p className="mt-0.5 break-words text-sm text-foreground">
            {error.message}
          </p>
        </div>
      </div>
    </li>
  )
}
