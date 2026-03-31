import { parse } from 'yaml'

export interface YamlValidationError {
  line: number
  column: number
  message: string
  severity: 'error' | 'warning'
}

export interface YamlValidationResult {
  valid: boolean
  errors: YamlValidationError[]
  parsed: string
}

export function validateYaml(input: string): YamlValidationResult {
  if (!input.trim()) {
    return { valid: true, errors: [], parsed: '' }
  }

  const errors: YamlValidationError[] = []

  // Check for tabs in indentation (common YAML mistake)
  const lines = input.split('\n')
  for (let i = 0; i < lines.length; i++) {
    if (/^\t/.test(lines[i])) {
      errors.push({
        line: i + 1,
        column: 1,
        message: 'Tabs are not allowed for indentation in YAML. Use spaces.',
        severity: 'error',
      })
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors, parsed: '' }
  }

  try {
    // uniqueKeys: true makes the yaml package throw on duplicate keys
    // at any nesting level — no custom regex detection needed
    const parsed = parse(input, { uniqueKeys: true, strict: true })
    const prettyJson = JSON.stringify(parsed, null, 2)
    return { valid: true, errors: [], parsed: prettyJson }
  } catch (e) {
    const err = e as Error & { linePos?: [{ line: number; col: number }] }
    const pos = err.linePos?.[0]
    // The yaml package reports duplicate keys as "Map keys must be unique" —
    // normalise to "duplicate key" wording for consistency in error messages.
    const message = /unique/i.test(err.message)
      ? err.message.replace(/Map keys must be unique/i, 'Duplicate key found')
      : err.message
    return {
      valid: false,
      errors: [
        {
          line: pos?.line ?? 1,
          column: pos?.col ?? 1,
          message,
          severity: 'error',
        },
      ],
      parsed: '',
    }
  }
}
