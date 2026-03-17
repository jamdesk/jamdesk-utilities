export function encodeContent(content: string): string {
  return btoa(encodeURIComponent(content))
}

export function decodeContent(hash: string): string | null {
  try {
    return decodeURIComponent(atob(hash))
  } catch {
    return null
  }
}

export function getContentFromHash(): string | null {
  if (typeof window === 'undefined') return null
  const hash = window.location.hash
  if (!hash.startsWith('#content=')) return null
  return decodeContent(hash.slice('#content='.length))
}

export function setContentHash(content: string): void {
  const encoded = encodeContent(content)
  window.history.replaceState(null, '', `#content=${encoded}`)
}
