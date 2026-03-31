import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { visit, SKIP } from 'unist-util-visit'
import type { Root } from 'mdast'

interface ConvertOptions {
  stripFrontmatter?: boolean
}

function remarkFrontmatterToHtml() {
  return (tree: Root) => {
    visit(tree, 'yaml', (node, index, parent) => {
      if (parent && typeof index === 'number') {
        ;(parent.children as unknown[])[index] = {
          type: 'html',
          value: `<pre class="frontmatter"><code>${(node as { value: string }).value}</code></pre>`,
        }
      }
    })
  }
}

function remarkStripFrontmatter() {
  return (tree: Root) => {
    visit(tree, 'yaml', (_node, index, parent) => {
      if (parent && typeof index === 'number') {
        parent.children.splice(index, 1)
        return [SKIP, index]
      }
    })
  }
}

export async function convertMdToHtml(
  input: string,
  options: ConvertOptions = {}
): Promise<string> {
  const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])

  if (options.stripFrontmatter) {
    processor.use(remarkStripFrontmatter)
  } else {
    processor.use(remarkFrontmatterToHtml)
  }

  const result = await processor
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(input)

  return String(result)
}
