import type { Tool } from '@/lib/tools'

interface JsonLdScriptProps {
  type: 'collection' | 'tool'
  tools: Tool[]
  /** Required when type is 'tool' */
  tool?: Tool
}

function buildCollectionSchema(tools: Tool[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'MDX Utilities',
    description:
      'Free, open-source MDX tools. Format, validate, preview, and convert MDX files — all client-side.',
    url: 'https://www.jamdesk.com/utilities',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Jamdesk',
      url: 'https://www.jamdesk.com',
    },
    hasPart: tools.map((tool) => ({
      '@type': 'WebApplication',
      name: tool.name,
      description: tool.description,
      url: `https://www.jamdesk.com/utilities/${tool.slug}`,
      applicationCategory: 'DeveloperApplication',
      isAccessibleForFree: true,
      browserRequirements: 'Requires JavaScript',
      operatingSystem: 'Any',
    })),
  }
}

function buildToolSchema(tool: Tool) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.seoDescription,
    url: `https://www.jamdesk.com/utilities/${tool.slug}`,
    applicationCategory: 'DeveloperApplication',
    isAccessibleForFree: true,
    browserRequirements: 'Requires JavaScript',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }
}

/**
 * Renders structured data for search engines.
 * Content is safe — built from our own static tool registry, not user input.
 */
export function JsonLdScript({ type, tools, tool }: JsonLdScriptProps) {
  const schema =
    type === 'collection'
      ? buildCollectionSchema(tools)
      : buildToolSchema(tool!)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
