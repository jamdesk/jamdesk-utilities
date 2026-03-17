import { format } from 'prettier/standalone'
import * as prettierPluginBabel from 'prettier/plugins/babel'
import * as prettierPluginEstree from 'prettier/plugins/estree'
import * as prettierPluginMarkdown from 'prettier/plugins/markdown'
import * as prettierPluginHtml from 'prettier/plugins/html'

export interface FormatResult {
  formatted: string
  error: string | null
}

export async function formatMdx(
  input: string,
  options?: { tabWidth?: number }
): Promise<FormatResult> {
  if (typeof input === 'string' && !input.trim()) {
    return { formatted: '', error: null }
  }

  try {
    const formatted = await format(input, {
      parser: 'mdx',
      plugins: [
        prettierPluginBabel,
        prettierPluginEstree,
        prettierPluginMarkdown,
        prettierPluginHtml,
      ],
      tabWidth: options?.tabWidth ?? 2,
      proseWrap: 'preserve',
    })
    return { formatted, error: null }
  } catch (err) {
    return {
      formatted: input,
      error: err instanceof Error ? err.message : 'Unknown formatting error',
    }
  }
}
