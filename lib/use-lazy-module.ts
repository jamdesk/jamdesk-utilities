'use client'
import { useRef, useCallback } from 'react'

export function useLazyModule<T>(importFn: () => Promise<T>) {
  const moduleRef = useRef<T | null>(null)

  const getModule = useCallback(async () => {
    if (!moduleRef.current) {
      moduleRef.current = await importFn()
    }
    return moduleRef.current
  }, [importFn])

  return getModule
}
