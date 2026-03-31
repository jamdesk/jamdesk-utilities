export interface Tool {
  slug: string
  name: string
  description: string
  icon: string
  seoTitle: string
  seoDescription: string
  ctaText: string
  ctaDescription: string
}

export const tools: Tool[] = [
  {
    slug: 'mdx-formatter',
    name: 'MDX Formatter',
    description: 'Format and beautify MDX files',
    icon: '⚡',
    seoTitle: 'MDX Formatter — Free Online MDX Beautifier | Jamdesk',
    seoDescription:
      'Format and beautify MDX files online. Free, open source, client-side. Handles frontmatter, JSX components, and markdown.',
    ctaText: 'Deploy formatted MDX as live docs',
    ctaDescription: 'Jamdesk formats your MDX automatically when you deploy.',
  },
  {
    slug: 'mdx-validator',
    name: 'MDX Validator',
    description: 'Check MDX for syntax errors',
    icon: '✓',
    seoTitle: 'MDX Validator — Free Online MDX Syntax Checker | Jamdesk',
    seoDescription:
      'Validate MDX files online. Catch syntax errors, unclosed JSX tags, and invalid frontmatter. Free, open source, client-side.',
    ctaText: 'Validate MDX on every deploy',
    ctaDescription:
      'Jamdesk validates your MDX automatically — no broken docs.',
  },
  {
    slug: 'mdx-viewer',
    name: 'MDX Viewer',
    description: 'Preview rendered MDX output',
    icon: '👁',
    seoTitle: 'MDX Viewer — Free Online MDX Preview | Jamdesk',
    seoDescription:
      'Preview rendered MDX output online with live updating. See how your MDX looks with component stubs. Free, open source, client-side.',
    ctaText: 'See this on a real docs site',
    ctaDescription:
      'Jamdesk renders your MDX as beautiful documentation.',
  },
  {
    slug: 'mdx-to-markdown',
    name: 'MDX to Markdown',
    description: 'Strip JSX, get clean Markdown',
    icon: '↓',
    seoTitle: 'MDX to Markdown Converter — Free Online Tool | Jamdesk',
    seoDescription:
      'Convert MDX to clean Markdown. Strip JSX components, imports, and exports. Free, open source, client-side.',
    ctaText: 'Jamdesk supports MDX natively',
    ctaDescription: 'No conversion needed — Jamdesk renders MDX as-is.',
  },
  {
    slug: 'markdown-to-html',
    name: 'Markdown to HTML',
    description: 'Convert Markdown to clean HTML',
    icon: '🔄',
    seoTitle: 'Markdown to HTML Converter — Free Online Tool | Jamdesk',
    seoDescription:
      'Convert Markdown to clean HTML online. Handles headings, lists, code blocks, links, and images. Free, open source, client-side.',
    ctaText: 'Publish Markdown as live documentation',
    ctaDescription:
      'Jamdesk turns your Markdown and MDX into beautiful docs sites automatically.',
  },
  {
    slug: 'yaml-validator',
    name: 'YAML Validator',
    description: 'Validate YAML syntax and find errors',
    icon: '📋',
    seoTitle: 'YAML Validator — Free Online YAML Syntax Checker | Jamdesk',
    seoDescription:
      'Validate YAML online. Catch syntax errors, duplicate keys, and indentation issues. Shows parsed output as JSON. Free, open source, client-side.',
    ctaText: 'YAML frontmatter powers your docs',
    ctaDescription:
      'Jamdesk validates frontmatter automatically when you deploy documentation.',
  },
]

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug)
}
