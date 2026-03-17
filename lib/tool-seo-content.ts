interface ToolSeoContent {
  howToTitle: string
  howToContent: string
  faq: { question: string; answer: string }[]
}

export const toolSeoContent: Record<string, ToolSeoContent> = {
  'mdx-formatter': {
    howToTitle: 'How to Format MDX',
    howToContent:
      'Paste your MDX into the editor and the formatter will apply consistent indentation, normalize frontmatter spacing, and clean up JSX component formatting. The formatter preserves your content while fixing whitespace issues, aligning attributes, and ensuring consistent line breaks between sections. It handles mixed Markdown and JSX syntax correctly, so component props stay readable alongside your prose. The output is ready to commit — no manual cleanup needed.',
    faq: [
      {
        question: 'Does the formatter change my content?',
        answer:
          'No. The formatter only adjusts whitespace, indentation, and formatting. Your actual content, component props, and frontmatter values are preserved exactly as written.',
      },
      {
        question: 'Does it handle frontmatter?',
        answer:
          'Yes. The formatter correctly handles YAML frontmatter blocks, preserving their structure while normalizing spacing and indentation within the frontmatter section.',
      },
      {
        question: 'What formatting rules does it follow?',
        answer:
          'The formatter uses Prettier with MDX support. It applies standard Prettier rules for Markdown and JSX, including consistent indentation, line wrapping, and attribute alignment.',
      },
      {
        question: 'Can I configure the formatting options?',
        answer:
          'The formatter uses sensible defaults that work for most MDX files. Custom configuration options like tab width and print width are planned for a future update.',
      },
    ],
  },
  'mdx-validator': {
    howToTitle: 'How to Validate MDX',
    howToContent:
      'Paste your MDX content into the editor and validation runs automatically. The validator checks for common issues: unclosed JSX tags, malformed frontmatter, unbalanced curly braces in expressions, and invalid Markdown syntax. Errors appear inline with line numbers and descriptions so you can find and fix problems quickly. The validator uses the same MDX compiler that documentation platforms use, so if your content passes validation here, it will compile correctly in your project.',
    faq: [
      {
        question: 'What errors does the validator catch?',
        answer:
          'The validator catches JSX syntax errors (unclosed tags, mismatched components), frontmatter issues (invalid YAML), expression errors (unbalanced braces), and Markdown problems (malformed links, broken references).',
      },
      {
        question: 'Does validation run automatically?',
        answer:
          'Yes. Validation runs as you type with a short debounce delay. You do not need to click a button — errors and warnings appear inline as you edit.',
      },
      {
        question: 'Is this the same as my build-time validator?',
        answer:
          'The validator uses the standard remark-mdx parser, which is the same parser used by most MDX build tools. If your content validates here, it should compile in your project.',
      },
      {
        question: 'Can I validate multiple files at once?',
        answer:
          'Currently the validator handles one MDX file at a time. Paste your content into the editor to validate it. Batch validation across a project is better handled by your build toolchain.',
      },
    ],
  },
  'mdx-viewer': {
    howToTitle: 'How to Preview MDX',
    howToContent:
      'Paste MDX content into the editor and the viewer renders a live preview alongside it. The preview updates as you type, showing how your headings, paragraphs, lists, code blocks, and other Markdown elements will look. JSX components are rendered as labeled stubs showing the component name and props, so you can verify your content structure without needing the actual component implementations. The viewer is useful for checking content layout, verifying frontmatter, and catching formatting issues before committing.',
    faq: [
      {
        question: 'Does the viewer render my custom components?',
        answer:
          'Custom JSX components are rendered as labeled placeholder stubs that show the component name and its props. This lets you verify content structure without needing the actual component code.',
      },
      {
        question: 'Does the preview update in real time?',
        answer:
          'Yes. The preview updates as you type with a short debounce to keep the editor responsive. Changes appear in the preview panel within a fraction of a second.',
      },
      {
        question: 'Can I preview MDX with frontmatter?',
        answer:
          'Yes. The viewer parses frontmatter and displays it separately from the rendered content, so you can verify both your metadata and your content in one view.',
      },
    ],
  },
  'mdx-to-markdown': {
    howToTitle: 'How to Convert MDX to Markdown',
    howToContent:
      'Paste your MDX content into the editor and the converter strips JSX-specific syntax to produce clean Markdown. Import statements, export statements, and JSX component tags are removed. Content inside JSX components is preserved where possible, so your text is not lost. The output is standard Markdown that works in any Markdown renderer — GitHub, GitLab, VS Code preview, or static site generators that do not support MDX. Use this when migrating content away from MDX or when you need a plain Markdown version of your documentation.',
    faq: [
      {
        question: 'What gets removed during conversion?',
        answer:
          'Import statements, export statements, and JSX component tags are removed. Standard Markdown syntax (headings, lists, links, code blocks, images) is preserved. Content inside JSX components is kept where possible.',
      },
      {
        question: 'Is the conversion lossless?',
        answer:
          'No. JSX components that have no Markdown equivalent are removed, which means interactive elements, custom layouts, and component-specific styling are lost. The converter preserves all standard Markdown content.',
      },
      {
        question: 'Does it handle frontmatter?',
        answer:
          'Yes. YAML frontmatter is preserved in the Markdown output since frontmatter is valid in both MDX and standard Markdown.',
      },
      {
        question: 'Can I convert Markdown back to MDX?',
        answer:
          'Standard Markdown is already valid MDX, so no conversion is needed. You can add JSX components and imports to any Markdown file to turn it into MDX.',
      },
    ],
  },
}
