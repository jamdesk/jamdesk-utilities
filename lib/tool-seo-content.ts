interface DetailSection {
  heading: string
  content: string
  /** Optional external reference rendered as a link beneath the content (e.g. official docs). */
  link?: { href: string; label: string }
}

interface ToolSeoContent {
  howToTitle: string
  howToContent: string
  detailSections?: DetailSection[]
  faq: { question: string; answer: string }[]
}

export const toolSeoContent: Record<string, ToolSeoContent> = {
  'mdx-formatter': {
    howToTitle: 'How to Format MDX',
    howToContent:
      'Paste MDX into the editor and the formatted version appears beside it as you type. Indentation gets normalized, frontmatter spacing is tidied up, and JSX attributes line up the way Prettier would align them in your own repo. Your writing itself is untouched. Only whitespace moves, so prose, component props, and frontmatter values come out exactly as you wrote them. Markdown and JSX mixed in the same file are handled in one pass, and the result is ready to paste into a commit.',
    detailSections: [
      {
        heading: 'What the formatter does',
        content:
          'Prettier 3.x does the work through its official MDX parser, with one pre-pass in front of it. Prettier deliberately leaves Markdown indentation alone, because four leading spaces mean a code block, so stray indentation on headings and paragraphs would otherwise survive untouched. The pre-pass strips that first, then hands the file over. Frontmatter between --- delimiters stays put, and its keys can be sorted alphabetically. Imports and exports come back with consistent quotes and spacing. All of it runs in your browser: the file you paste never reaches a server.',
      },
      {
        heading: 'Formatting options',
        content:
          'Five toggles sit above the editor. Tab width switches between 2-space and 4-space indentation; print width sets the wrap point at 80 or 120 characters. Sorting frontmatter alphabetically is the one worth turning on for a shared repo, since it stops key order drifting between contributors. The last two clean up invisible mess: trailing spaces at the ends of lines, and runs of three or more blank lines collapsed back to two. Every toggle re-formats immediately, so you can see what each one does before you commit to it.',
      },
      {
        heading: 'When to use an MDX formatter',
        content:
          'Before a commit, mostly. Inconsistent whitespace turns a one-line content edit into a twelve-line diff, and that noise is what makes documentation pull requests tedious to review. The other common moment is right after pasting content in from Notion, Google Docs, or an old wiki, where indentation rarely survives the trip. Format first, then run the result through the MDX Validator.',
      },
    ],
    faq: [
      {
        question: 'Does the formatter change my content?',
        answer:
          'No. Only whitespace, indentation, and line wrapping change. Your text, your component props, and your frontmatter values come out exactly as you wrote them.',
      },
      {
        question: 'Does it handle frontmatter?',
        answer:
          'Yes. YAML frontmatter is preserved, with spacing and indentation normalized inside the block. An optional toggle sorts the keys alphabetically.',
      },
      {
        question: 'What formatting rules does it follow?',
        answer:
          "Prettier's, via the MDX parser. That means standard Prettier behavior for Markdown and JSX: consistent indentation, wrapping at the print width you pick, and aligned component attributes.",
      },
      {
        question: 'Can I configure the formatting options?',
        answer:
          'Yes. The toolbar above the editor controls indentation (2 or 4 spaces), print width (80 or 120 characters), alphabetical frontmatter sorting, trailing whitespace trimming, and blank line collapsing. Changes apply as you type.',
      },
    ],
  },
  'mdx-validator': {
    howToTitle: 'How to Validate MDX',
    howToContent:
      "Paste MDX into the editor and validation runs on its own, about a third of a second after you stop typing. Unclosed JSX tags, mismatched components, unbalanced curly braces, and import statements that won't parse all surface inline with a line number, a column, and a message describing what broke. The parser is remark-mdx, the same one your build uses, so a file that comes back clean here compiles in your project.",
    detailSections: [
      {
        heading: 'How validation works',
        content:
          'Your content goes through remark-mdx, the parser behind Next.js, Docusaurus, and Astro. It runs a full parse pass and collects every message the unified pipeline produces, each tagged with a line, a column, and a severity. Validation re-runs 300ms after your last keystroke, which keeps the editor responsive while you type into a large file.',
      },
      {
        heading: 'Common errors the validator catches',
        content:
          'The usual culprit is a JSX tag nobody closed: a <Callout> with no </Callout>, or a </Note> closing something that was never opened. After that come unbalanced curly braces in expressions, and import statements that fail with an acorn parse error. Strict mode filters the list down to errors only and hides warnings.',
      },
      {
        heading: "What it doesn't check",
        content:
          "Frontmatter is treated as an opaque block. remark-mdx marks where it starts and ends but never parses the YAML inside it, so a duplicate key or a tab used for indentation in your frontmatter passes here and still causes trouble at build time. Paste that block into the YAML Validator instead. Imports aren't resolved either, so <Callout> validates whether or not anything named Callout exists in your project.",
      },
      {
        heading: 'Checking a whole project',
        content:
          "This page handles one file at a time. For a repository, add remark-mdx to CI and fail the build on parse errors. It's the same parser running here, so the results match.",
      },
    ],
    faq: [
      {
        question: 'What errors does the validator catch?',
        answer:
          'JSX syntax errors (unclosed tags, mismatched components), unbalanced braces in MDX expressions, and import or export statements that fail to parse. Markdown itself is forgiving, so genuine Markdown errors are rare.',
      },
      {
        question: 'Does the validator check my frontmatter?',
        answer:
          "No. remark-mdx treats frontmatter as an opaque block and doesn't parse the YAML inside it, so invalid YAML passes validation here. Use the YAML Validator for that.",
      },
      {
        question: 'Does validation run automatically?',
        answer:
          'Yes. It re-runs 300ms after you stop typing. No button to press, and errors appear inline as you edit.',
      },
      {
        question: 'Is this the same as my build-time validator?',
        answer:
          "It runs remark-mdx, which is what most MDX build tools parse with, so syntax that validates here parses in your project too. It won't catch failures that happen later in a build, such as a component that's imported but doesn't exist.",
      },
      {
        question: 'Can I validate multiple files at once?',
        answer:
          'Not here. The editor takes one file at a time. Batch validation belongs in your build toolchain, where remark-mdx can run over every file on every commit.',
      },
    ],
  },
  'mdx-viewer': {
    howToTitle: 'How to Preview MDX',
    howToContent:
      'Paste MDX content into the editor and the viewer renders a live preview alongside it. The preview updates as you type, showing how your headings, paragraphs, lists, code blocks, and other Markdown elements will look. JSX components are rendered as labeled stubs showing the component name and props, so you can verify your content structure without needing the actual component implementations. The viewer is useful for checking content layout, verifying frontmatter, and catching formatting issues before committing.',
    detailSections: [
      {
        heading: 'What the preview shows',
        content:
          'The MDX Viewer parses your content into an abstract syntax tree (AST) and renders each node: headings with proper hierarchy (h1–h6), paragraphs, ordered and unordered lists, code blocks with syntax highlighting, blockquotes, links, images, bold, italic, and inline code. YAML frontmatter is displayed in a separate metadata box above the rendered content.',
      },
      {
        heading: 'How JSX components render',
        content:
          'Since the viewer runs without your component library, JSX components are rendered as labeled placeholder stubs. Block components (like <Callout> with children) show a bordered container with the component name and its props. Self-closing components (like <ApiEndpoint />) render as inline badges. This lets you verify content structure and prop values without needing actual component implementations.',
      },
      {
        heading: 'Using the viewer for documentation review',
        content:
          'The viewer is useful for reviewing documentation pull requests, verifying frontmatter metadata, and checking that heading hierarchy is correct before publishing. Combined with the MDX Formatter, you can clean up and preview content in one workflow — format, then switch to the viewer to see the result.',
      },
    ],
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
      "Paste MDX into the editor and the Markdown version appears beside it. Imports, exports, JSX tags, and curly-brace expressions are stripped out, while the text inside your components is kept and folded into the surrounding prose. What comes back is plain Markdown that renders anywhere: GitHub, GitLab, a VS Code preview, a static site generator with no MDX support. Reach for it when you're moving content off an MDX platform, or when someone needs a copy of the docs without component markup in the way.",
    detailSections: [
      {
        heading: 'What gets converted',
        content:
          "Everything MDX-specific comes out. Import and export statements go first, then JSX tags and curly-brace expressions. A wrapper component with children, like <Callout>Watch out.</Callout>, is unwrapped and its text stays where it was. A self-closing one, like <Image />, has nothing to unwrap, so it's dropped. Ordinary Markdown passes through untouched: headings, lists, links, code blocks, images, emphasis.",
      },
      {
        heading: 'Frontmatter handling',
        content:
          'Frontmatter is valid in plain Markdown too, so it\'s kept by default. Toggle "Strip frontmatter" when the destination has no use for it, which is usually the case if you\'re pasting into a wiki or an email.',
      },
      {
        heading: 'Migration use cases',
        content:
          'The common one is moving docs off an MDX platform (Next.js, Docusaurus, Jamdesk) onto something that only speaks Markdown, such as a GitHub wiki, GitLab pages, or Confluence. It is also the quickest way to get a readable plain-text copy of a page for a newsletter, or for a reviewer who should be reading the words, not the component markup wrapped around them.',
      },
    ],
    faq: [
      {
        question: 'What gets removed during conversion?',
        answer:
          'Imports, exports, JSX tags, and curly-brace expressions. Text inside a component is kept wherever that component has children. Standard Markdown (headings, lists, links, code blocks, images) is left alone.',
      },
      {
        question: 'Is the conversion lossless?',
        answer:
          "No. A JSX component with no Markdown equivalent is removed, so interactive elements, custom layouts, and component styling don't survive the trip. Standard Markdown content does.",
      },
      {
        question: 'Does it handle frontmatter?',
        answer:
          "Yes. YAML frontmatter is kept by default, since it's valid in plain Markdown as well as MDX. A toggle strips it if you'd rather it went.",
      },
      {
        question: 'Can I convert Markdown back to MDX?',
        answer:
          "There's nothing to convert: Markdown is already valid MDX. Add imports and JSX components to any .md file, rename it .mdx, and it works.",
      },
    ],
  },
  'html-to-mdx': {
    howToTitle: 'How to Convert HTML to MDX',
    howToContent:
      'Paste HTML into the editor and the converter produces MDX-compatible Markdown. Headings, paragraphs, lists, links, and code blocks become standard Markdown. Tables, complex nested markup, and unknown elements are preserved as raw HTML — which is valid MDX. The output is ready to paste into a Next.js, Docusaurus, or Astro MDX file.',
    detailSections: [
      {
        heading: 'What gets converted',
        content:
          'Standard HTML elements with Markdown equivalents are converted: h1 through h6, p, strong, em, code, pre, a, ul, ol, li, blockquote, hr, img. Code blocks preserve language hints from class="language-*" attributes. Simple tables become Markdown tables; complex tables (with rowspan or colspan) stay as raw HTML.',
      },
      {
        heading: 'Migration use cases',
        content:
          'Use this converter when migrating content from a CMS that exports HTML — Notion, Confluence, WordPress, Ghost, or static-site exports. The output drops cleanly into any MDX-based docs platform (Next.js, Docusaurus, Astro, Gatsby) without further processing.',
      },
      {
        heading: 'Why preserve raw HTML',
        content:
          'MDX accepts raw HTML inline. When markup cannot be expressed in Markdown (complex tables, custom elements, embedded iframes), the converter leaves the original HTML in place rather than dropping data. Content survives the conversion — only executable markup is removed for safety (see below).',
      },
      {
        heading: 'What is removed for safety',
        content:
          'Executable HTML is stripped: <script> blocks, <style> blocks, and inline event handlers like onclick or onload. MDX compiles to a React component tree that runs in your app, so passing arbitrary scripts through would be an XSS footgun for anyone migrating content from a CMS. Visible content (text, links, images, structure) is always preserved.',
      },
    ],
    faq: [
      {
        question: 'What HTML elements does it convert?',
        answer:
          'Standard elements with Markdown equivalents: headings, paragraphs, bold, italic, links, lists, code blocks, blockquotes, horizontal rules, and images. Tables convert when simple; complex tables stay as raw HTML.',
      },
      {
        question: 'Is any content dropped during conversion?',
        answer:
          'Visible content is preserved — markup that cannot be expressed in Markdown stays as raw HTML, which is valid MDX. The only things stripped are executable elements: <script> tags, <style> tags, and inline event handlers like onclick. This prevents XSS when migrating HTML into an MDX docs site.',
      },
      {
        question: 'Can I convert content from Notion or Confluence?',
        answer:
          'Yes. Export from Notion or Confluence as HTML (or copy as HTML), paste into the editor, and the output is ready for any MDX-based site.',
      },
      {
        question: 'Does it preserve syntax highlighting hints?',
        answer:
          'Yes. <code class="language-typescript"> and similar attributes are converted to fenced code blocks with the matching language tag.',
      },
    ],
  },
  'yaml-validator': {
    howToTitle: 'How to Validate YAML',
    howToContent:
      "Paste YAML into the editor and it's checked as you type. Syntax errors, duplicate keys at any nesting level, and tabs used for indentation come back with a line number, a column, and a message. Anything that parses cleanly is shown as formatted JSON in the output panel, which is the fastest way to confirm that the structure you got is the structure you meant.",
    detailSections: [
      {
        heading: 'What the validator checks',
        content:
          'Three things, in order. Tabs at the start of a line are caught first, because YAML requires spaces and a tab there fails every parser you hand the file to. Then the yaml package parses the document in strict mode with uniqueKeys enabled, which surfaces malformed key-value pairs, broken indentation, and duplicate keys. Whatever survives is serialized back out as JSON, so you can read the parsed structure instead of guessing at it.',
      },
      {
        heading: 'Duplicate key detection',
        content:
          "Duplicate keys are the ones that hurt. YAML doesn't complain about them. The later value quietly wins, and the config you thought you shipped isn't the config running. Strict mode turns that into an error with a line number. Keys sharing a name under different parents are fine, as they should be, and only a real collision at the same level gets flagged.",
      },
      {
        heading: 'Common YAML mistakes',
        content:
          'Tabs instead of spaces. A missing colon after a key. Nesting that sits one level off from what you meant, which parses fine and quietly means something else. Duplicate keys. And the subtle one: values that are not the type you assumed. Write version: 1.10 and the JSON panel shows 1.1, because YAML read it as a number. Write country: no and this parser keeps the string "no", but a YAML 1.1 parser on the other end will hand your application false. The error list catches the syntax problems; the JSON output is what catches the rest.',
      },
    ],
    faq: [
      {
        question: 'Does it catch duplicate keys?',
        answer:
          'Yes, at any nesting level. The parser runs in strict mode with uniqueKeys enabled, so a key repeated at the same level is reported as an error with its line number instead of quietly overwriting the earlier value.',
      },
      {
        question: 'What is the difference between YAML and JSON?',
        answer:
          'YAML uses indentation for structure, JSON uses braces and brackets. YAML adds comments, multi-line strings, and anchors, none of which JSON has, and JSON is accepted by far more tooling in return. The data model underneath is the same, which is why you can convert between them.',
      },
      {
        question: 'Why does YAML not allow tabs?',
        answer:
          'Because tab width is an editor setting, not a fixed value. A file indented with tabs looks correctly nested in one editor and wrong in another, and the parser has no way to tell which one you meant. The spec sidesteps the problem by requiring spaces.',
      },
    ],
  },
  'json-yaml-converter': {
    howToTitle: 'How to Convert JSON to YAML (and YAML to JSON)',
    howToContent:
      'Paste JSON or YAML into the editor and toggle the direction to convert. JSON to YAML produces clean, readable YAML with 2-space indentation. YAML to JSON produces formatted JSON with proper nesting. Errors in the input are shown with descriptive messages. Copy or download the converted output.',
    detailSections: [
      {
        heading: 'Bidirectional conversion',
        content:
          'The converter works in both directions. Toggle between JSON → YAML and YAML → JSON using the toolbar switch. The conversion preserves all data types: strings, numbers, booleans, null values, arrays, and nested objects. YAML-specific features like comments and anchors are not preserved when converting to JSON since JSON does not support them.',
      },
      {
        heading: 'When to use JSON vs YAML',
        content:
          'JSON is the standard for APIs, package.json, and tsconfig.json. YAML is preferred for configuration files (Docker Compose, GitHub Actions, Kubernetes), CI/CD pipelines, and documentation frontmatter. Use this converter when moving configuration between systems or when you need to read a JSON config in a more human-friendly YAML format.',
      },
      {
        heading: 'Error handling',
        content:
          'Invalid input produces a clear error message instead of silent failure. For JSON input, syntax errors like missing quotes, trailing commas, or unmatched brackets are caught. For YAML input, indentation errors, invalid nesting, and malformed values are flagged with line numbers where possible.',
      },
    ],
    faq: [
      {
        question: 'Is the conversion lossless?',
        answer:
          'Data is preserved losslessly in both directions for standard types (strings, numbers, booleans, arrays, objects). YAML-only features like comments, anchors, and aliases are not preserved when converting to JSON because JSON has no equivalent syntax.',
      },
      {
        question: 'Does it handle nested objects?',
        answer:
          'Yes. Deeply nested objects and arrays are converted correctly in both directions. YAML uses indentation for nesting while JSON uses braces and brackets.',
      },
      {
        question: 'Can I convert YAML with comments?',
        answer:
          'YAML comments (lines starting with #) are parsed but not included in the JSON output since JSON does not support comments. The data values are converted correctly.',
      },
    ],
  },
  'markdown-table-generator': {
    howToTitle: 'How to Generate Markdown Tables',
    howToContent:
      'Paste CSV or TSV data into the editor and the generator produces a formatted Markdown table instantly. The first row becomes the table header. Toggle between CSV and TSV input formats using the toolbar. Copy the output or download it as a .md file. You can also paste data directly from spreadsheets — most spreadsheet applications copy as TSV.',
    detailSections: [
      {
        heading: 'CSV and TSV support',
        content:
          'The generator accepts both CSV (comma-separated) and TSV (tab-separated) input. CSV handles quoted fields correctly — commas inside double quotes are preserved as cell content, not treated as delimiters. TSV mode splits on tab characters, which is the default format when copying from Excel, Google Sheets, or Numbers.',
      },
      {
        heading: 'Pipe character escaping',
        content:
          'Pipe characters (|) in cell content are automatically escaped with a backslash (\\|) to prevent them from breaking the Markdown table syntax. This means you can safely include pipe characters in your data without manual escaping.',
      },
      {
        heading: 'Spreadsheet to Markdown workflow',
        content:
          'Copy cells from any spreadsheet application (Excel, Google Sheets, Numbers, LibreOffice Calc), switch to TSV mode, and paste directly into the editor. The tab-separated values are converted to a clean Markdown table. This is faster than manually typing pipe characters and alignment dashes for every row.',
      },
    ],
    faq: [
      {
        question: 'Can I paste from Excel or Google Sheets?',
        answer:
          'Yes. Copy cells from your spreadsheet, switch to TSV mode in the toolbar, and paste. Spreadsheets copy data as tab-separated values by default, which the TSV parser handles correctly.',
      },
      {
        question: 'How are special characters handled?',
        answer:
          'Pipe characters (|) are escaped automatically. Commas inside quoted CSV fields are preserved as content. Other characters like asterisks, brackets, and backticks pass through unchanged.',
      },
      {
        question: 'Does it support column alignment?',
        answer:
          'The generator produces standard left-aligned tables with --- separators. For center or right alignment, add colons to the separator row manually after generating: :--- for left, :---: for center, ---: for right.',
      },
    ],
  },
  'markdown-to-html': {
    howToTitle: 'How to Convert Markdown to HTML',
    howToContent:
      'Paste Markdown into the editor and the HTML appears beside it as you type. Headings become <h1> through <h6>, lists become <ul>, <ol>, and <li>, fenced code becomes <pre><code>, and emphasis maps to <strong> and <em>. No wrapper divs, no classes, no inline styles. Copy the result out, or download it as an .html file.',
    detailSections: [
      {
        heading: 'What gets converted',
        content:
          'Core Markdown, as CommonMark defines it: headings, paragraphs, bold and italic, inline code, fenced code blocks with the language recorded as class="language-js" or similar, links, images, blockquotes, horizontal rules, and both kinds of list. YAML frontmatter is rendered as a pre block, or dropped entirely when you toggle it off. GitHub extensions aren\'t enabled, so pipe tables, task lists, and strikethrough come through as literal text.',
      },
      {
        heading: 'HTML output quality',
        content:
          "The output is semantic HTML5 with nothing bolted on. No inline styles, no framework classes, no wrapper elements to strip out later. remark-rehype does the conversion, which is the same pipeline running behind most static site generators, so the result is safe to drop into a CMS field, an email template, or a page you're assembling by hand.",
      },
      {
        heading: 'Common use cases',
        content:
          "Migrating Markdown into a CMS that only stores HTML is the usual reason people land here. It also works for prepping a post for email, or for pulling out a snippet to embed somewhere that won't run a Markdown renderer. If you're building a Markdown pipeline of your own, it's a quick way to see what remark-rehype produces before you wire it into anything.",
      },
    ],
    faq: [
      {
        question: 'Does it support GitHub Flavored Markdown?',
        answer:
          "No. The converter handles CommonMark: headings, lists, code blocks, links, images, emphasis, and blockquotes. GFM extensions aren't enabled, so pipe tables, task lists, strikethrough, and bare-URL autolinks pass through as plain text rather than being converted.",
      },
      {
        question: 'Can I use the HTML output in an email?',
        answer:
          'Yes, with one caveat. The HTML is clean and has no CSS or JavaScript dependencies, which email clients handle well, but it carries no styling at all. Most clients need inline styles to render consistently, so run the output through an inliner before sending.',
      },
      {
        question: 'Does it handle code syntax highlighting?',
        answer:
          'It records the language rather than applying the highlighting. A fenced block tagged js comes out as <code class="language-js">, which is exactly what Prism.js and highlight.js look for, so the colors come from whichever library you load on the page.',
      },
    ],
  },
  'mermaid-editor': {
    howToTitle: 'How to Edit Mermaid Diagrams Online',
    howToContent:
      'Type or paste Mermaid syntax into the editor and the preview renders the diagram instantly. The editor supports every Mermaid diagram type: flowcharts, sequence diagrams, timelines, pie charts, Gantt charts, class diagrams, state diagrams, and entity relationship diagrams. Syntax errors show inline with the parser message, and the last valid diagram stays visible while you fix them. When the diagram looks right, copy the Mermaid source into any tool that renders Mermaid: GitHub, GitLab, Notion, or a documentation platform.',
    detailSections: [
      {
        heading: 'What are Mermaid diagrams?',
        content:
          'Mermaid is a text-based diagramming syntax. You describe a diagram in plain words (A --> B means "A points to B"), and a renderer turns that into a flowchart, sequence diagram, timeline, or any of a dozen other types. Because the source is just text, it lives in a code block next to your prose, versions cleanly in Git, and updates with a one-line edit instead of a round-trip through a drawing app. That\'s why you find Mermaid in GitHub issues, project READMEs, and most modern documentation tools. This editor runs the same Mermaid library those tools use, so whatever previews here renders the same way once you paste it back.',
        link: {
          href: 'https://mermaid.js.org/',
          label: 'Official Mermaid documentation',
        },
      },
      {
        heading: 'Mermaid timeline example',
        content:
          'A timeline diagram starts with the timeline keyword, an optional title, and one line per period with events separated by colons. For example: timeline / title Product Launch Timeline / 2024 : Research : First prototype / 2025 : Private beta : Public beta / 2026 : GA launch. Each year (or any label) becomes a column, and each colon-separated entry becomes an event in that period. Load the built-in sample to see a rendered timeline you can edit.',
      },
      {
        heading: 'Mermaid pie chart example',
        content:
          'A pie chart begins with pie title followed by the chart name, then one quoted label and value per line. For example: pie title Browser Market Share / "Chrome" : 65 / "Safari" : 19 / "Firefox" : 9 / "Other" : 7. Values are relative, so Mermaid computes the percentages and they don\'t need to add up to 100.',
      },
      {
        heading: 'Flowcharts, sequence diagrams, and more',
        content:
          'Flowcharts use flowchart TD (top-down) or flowchart LR (left-right) with nodes and arrows like A[Start] --> B{Decision}. Sequence diagrams use sequenceDiagram with participant declarations and message arrows. The editor renders whatever the Mermaid parser accepts, so every diagram type in the Mermaid documentation works here. It runs Mermaid in strict security mode and sanitizes the rendered SVG, so a pasted diagram can\'t smuggle in a script.',
        link: {
          href: 'https://jamdesk.com/docs/components/mermaid',
          label: 'More Mermaid examples in the Jamdesk docs',
        },
      },
    ],
    faq: [
      {
        question: 'What is Mermaid?',
        answer:
          'Mermaid is an open-source JavaScript library that turns text definitions into diagrams: flowcharts, sequence diagrams, timelines, pie charts, Gantt charts, and more. You write a few lines of its plain-text syntax and Mermaid renders an SVG. GitHub, GitLab, and many documentation platforms render Mermaid code blocks automatically, so the same source works in an issue, a README, or your docs.',
      },
      {
        question: 'How do I make a timeline diagram in Mermaid?',
        answer:
          'Start the diagram with the timeline keyword, add an optional title line, then write one line per time period in the form 2025 : First event : Second event. Each period becomes a column with its events stacked beneath it. The editor ships with a timeline sample. Click Load Sample to start from a working example.',
      },
      {
        question: 'How do I make a pie chart in Mermaid?',
        answer:
          'Begin with pie title Your Chart Name, then list one entry per line as a quoted label, a colon, and a number, like "Chrome" : 65. Mermaid calculates the slice percentages from the values automatically.',
      },
      {
        question: 'Why does my Mermaid diagram show a syntax error?',
        answer:
          'The editor runs the official Mermaid parser and surfaces its error message, which usually names the unexpected token and line. Common causes: a missing diagram-type keyword on the first line, unclosed brackets in node labels, or special characters that need quoting. The last valid diagram stays visible while you fix the error.',
      },
      {
        question: 'Can I use these diagrams in my documentation?',
        answer:
          'Yes. Copy the Mermaid source into any platform that renders Mermaid code blocks — GitHub, GitLab, Notion, Obsidian, or a docs platform. Jamdesk renders mermaid fenced code blocks as SVG at build time, so the same source works in your docs unchanged.',
      },
    ],
  },
  'opengraph-preview': {
    howToTitle: 'How to Preview Open Graph Tags',
    howToContent:
      'Enter any public URL and press Preview. A Jamdesk server fetches the page (browsers cannot read other websites directly), extracts every og:*, twitter:*, and standard HTML tag, and renders faithful preview cards for X, Facebook, LinkedIn, Slack, Discord, WhatsApp, iMessage, and Google search results. The validator then checks the metadata against each platform’s requirements — missing tags, image dimensions and file size, truncation limits — and explains how to fix every issue it finds. Share a report by copying the page URL: the ?url= parameter re-runs the same check.',
    detailSections: [
      {
        heading: 'What the validator checks',
        content:
          'The validator verifies that og:title, og:description, og:image, and twitter:card are present, that the image URL is absolute and served over HTTPS, and that the image actually loads. It downloads the image to measure real pixel dimensions, flagging anything below Facebook’s 200×200 minimum or the recommended 1200×630, aspect ratios that stray far from 1.91:1, files over the 5 MB limit X enforces, and mismatches between declared og:image:width/height and the actual file. It also flags titles and descriptions long enough to truncate, and missing nice-to-haves like og:site_name and og:url.',
      },
      {
        heading: 'How platforms choose their card data',
        content:
          'Each platform reads tags in a different order, and the preview cards replicate those fallback chains exactly. X reads twitter:* tags first and falls back to og:*; without twitter:card it renders only a small summary card. Facebook, LinkedIn, Slack, Discord, WhatsApp, and iMessage read og:* tags and fall back to the plain <title> and meta description. Google search ignores Open Graph for its snippet and uses the <title> tag and meta description directly. Discord additionally reads theme-color for its embed accent bar, and Slack shows your favicon and og:site_name above the title.',
      },
      {
        heading: 'Recommended image setup',
        content:
          'Use a 1200×630 JPEG or PNG (1.91:1 aspect ratio) under 5 MB, referenced by an absolute HTTPS URL in og:image. That single image renders crisply everywhere: full-width on X with twitter:card set to summary_large_image, large cards on Facebook and LinkedIn, and inline embeds on Slack and Discord. Keep critical text away from the edges — messaging apps crop more aggressively than feeds.',
      },
    ],
    faq: [
      {
        question: 'Why does this tool need a server when the other tools run client-side?',
        answer:
          'Browsers enforce the same-origin policy: JavaScript on one site cannot read HTML from another site unless that site explicitly allows it with CORS headers, which virtually none do. A Jamdesk server fetches the page exactly the way X or Slack would, parses the tags, and returns them. The URL and parsed metadata are never stored or logged.',
      },
      {
        question: 'Why does my page show no image on X?',
        answer:
          'The two most common causes are a missing twitter:card tag (X needs it to choose a card layout) and a relative og:image path — the Open Graph spec requires an absolute URL. The validator flags both, along with images that fail to load or exceed X’s 5 MB limit.',
      },
      {
        question: 'What size should my og:image be?',
        answer:
          'Use 1200×630 pixels (1.91:1) as a JPEG or PNG under 5 MB. Facebook ignores images smaller than 200×200, and images below 1200×630 render as low-resolution or thumbnail cards on X and LinkedIn.',
      },
      {
        question: 'The preview here differs from what the platform actually shows. Why?',
        answer:
          'Platforms cache scraped metadata aggressively — sometimes for weeks. If you recently changed your tags, the platform may still show the old version. Use the platform’s own refresh tool (Facebook Sharing Debugger, LinkedIn Post Inspector, or X Card Validator) to force a re-scrape. This tool always fetches the live page.',
      },
    ],
  },
}
