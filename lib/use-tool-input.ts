'use client'
import { useState, useCallback } from 'react'
import { getContentFromHash, setContentHash } from '@/lib/share'
import { trackEvent } from '@/lib/analytics'

// Debounced hash update (1 second)
let hashTimer: ReturnType<typeof setTimeout> | null = null
function debouncedSetHash(content: string) {
  if (hashTimer) clearTimeout(hashTimer)
  hashTimer = setTimeout(() => setContentHash(content), 1000)
}

export function useToolInput(sample: string, toolName: string) {
  const [input, setInput] = useState(() => getContentFromHash() ?? sample)

  const handleInputChange = useCallback((value: string) => {
    setInput(value)
    debouncedSetHash(value)
  }, [])

  const handleLoadSample = useCallback(() => {
    setInput(sample)
    setContentHash(sample)
    trackEvent('Load Sample', { tool: toolName })
  }, [sample, toolName])

  return { input, setInput, handleInputChange, handleLoadSample }
}
