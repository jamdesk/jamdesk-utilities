import { format } from 'prettier/standalone'
import * as prettierPluginBabel from 'prettier/plugins/babel'
import * as prettierPluginEstree from 'prettier/plugins/estree'
import * as prettierPluginMarkdown from 'prettier/plugins/markdown'
import * as prettierPluginHtml from 'prettier/plugins/html'

export interface FormatResult {
  formatted: string
  error: string | null
}

/**
 * Normalize leading whitespace on markdown lines.
 * Prettier's MDX parser formats JSX and imports but leaves markdown
 * indentation untouched (4+ spaces = code block in Markdown).
 * This preprocessor strips leading spaces from lines that are clearly
 * markdown content (headings, paragraphs, lists) rather than code blocks.
 */
function normalizeMarkdownIndentation(input: string): string {
  const lines = input.split('\n')
  const result: string[] = []
  let inFrontmatter = false
  let inCodeBlock = false

  for (const line of lines) {
    // Track frontmatter boundaries
    if (line.trim() === '---') {
      inFrontmatter = !inFrontmatter
      result.push(line.trimStart())
      continue
    }

    // Track fenced code blocks
    if (line.trimStart().startsWith('```')) {
      inCodeBlock = !inCodeBlock
      result.push(line.trimStart())
      continue
    }

    // Don't touch lines inside code blocks or frontmatter
    if (inCodeBlock || inFrontmatter) {
      result.push(line)
      continue
    }

    // Strip leading whitespace from markdown content lines
    const trimmed = line.trimStart()

    // Empty lines stay empty
    if (trimmed === '') {
      result.push('')
      continue
    }

    // These are clearly markdown, not indented code: strip leading spaces
    // Headings, list items, blockquotes, JSX tags, import/export, thematic breaks
    if (
      /^#{1,6}\s/.test(trimmed) ||     // headings
      /^[-*+]\s/.test(trimmed) ||       // unordered list items
      /^\d+[.)]\s/.test(trimmed) ||     // ordered list items
      /^>/.test(trimmed) ||             // blockquotes
      /^<[A-Z/]/.test(trimmed) ||       // JSX components
      /^import\s/.test(trimmed) ||      // import statements
      /^export\s/.test(trimmed) ||      // export statements
      /^---\s*$/.test(trimmed) ||       // thematic breaks
      /^\|/.test(trimmed)               // table rows
    ) {
      result.push(trimmed)
      continue
    }

    // For regular paragraph text: strip if it has excessive leading whitespace (4+)
    // but preserve intentional 1-3 space indentation (continuation lines)
    const leadingSpaces = line.length - trimmed.length
    if (leadingSpaces >= 4) {
      result.push(trimmed)
    } else {
      result.push(line)
    }
  }

  return result.join('\n')
}

export async function formatMdx(
  input: string,
  options?: { tabWidth?: number }
): Promise<FormatResult> {
  try {
    if (!input.trim()) {
      return { formatted: '', error: null }
    }

    // Normalize markdown indentation before Prettier (which only formats JSX/imports)
    const normalized = normalizeMarkdownIndentation(input)

    const formatted = await format(normalized, {
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
