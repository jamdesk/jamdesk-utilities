import { parse, stringify } from 'yaml'

interface ConversionResult {
  output: string
  error: string | null
}

export function jsonToYaml(input: string): ConversionResult {
  if (!input.trim()) return { output: '', error: null }

  try {
    const parsed = JSON.parse(input)
    const output = stringify(parsed, {
      indent: 2,
      lineWidth: 120,
    })
    return { output, error: null }
  } catch (e) {
    return {
      output: '',
      error: e instanceof Error ? e.message : 'Invalid JSON',
    }
  }
}

export function yamlToJson(input: string): ConversionResult {
  if (!input.trim()) return { output: '', error: null }

  try {
    const parsed = parse(input)
    const output = JSON.stringify(parsed, null, 2)
    return { output, error: null }
  } catch (e) {
    return {
      output: '',
      error: e instanceof Error ? e.message : 'Invalid YAML',
    }
  }
}
