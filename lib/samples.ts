/**
 * Sample MDX content for each tool. These are loaded as defaults
 * when no URL hash content is present.
 */

/** Messy MDX with unsorted frontmatter, cramped JSX, bad indentation, extra blank lines */
export const formatterSample = `---
description: Learn how to set up your project
sidebar_position: 1
title: Getting Started
tags: [setup, guide]
---

import {Card} from '@/components/Card'
import  {Steps}  from  '@/components/Steps'



         # Getting Started

   Welcome to the **getting started** guide.


      <Steps>

      ## Install dependencies

\`\`\`bash
npm install my-package
\`\`\`

         ## Configure your project

   Create a \`config.json\` file:

\`\`\`json
{
  "name": "my-project",
  "version": "1.0.0"
}
\`\`\`

      </Steps>
<Card   title="Need help?"  >
   Check out our [support page](/support) for more information.
</Card>
`

/** Valid MDX with various features: frontmatter, headings, JSX, code blocks */
export const validatorSample = `---
title: Example Page
description: A sample MDX file to validate
---

import { Alert } from '@/components/Alert'
import { Tabs, Tab } from '@/components/Tabs'

# Welcome

This is a **valid** MDX file with multiple features.

<Alert type="info">
  This is an informational alert with [a link](/docs).
</Alert>

## Code Example

\`\`\`tsx
function Hello() {
  return <div>Hello World</div>
}
\`\`\`

## Tabbed Content

<Tabs>
  <Tab label="JavaScript">
    \`\`\`js
    console.log('hello')
    \`\`\`
  </Tab>
  <Tab label="Python">
    \`\`\`python
    print('hello')
    \`\`\`
  </Tab>
</Tabs>

### Lists

- First item
- Second item with \`inline code\`
- Third item with **bold text**

> A blockquote for good measure.
`

/** Rich MDX with multiple JSX component types */
export const viewerSample = `---
title: API Reference
description: Complete API documentation
---

import { Callout } from '@/components/Callout'
import { CodeBlock } from '@/components/CodeBlock'
import { Tab, Tabs } from '@/components/Tabs'
import { ApiEndpoint } from '@/components/ApiEndpoint'

# API Reference

The API provides access to all **core resources**. All endpoints return JSON.

<Callout type="warning">
  Authentication is required for all endpoints. See the [auth guide](/docs/auth).
</Callout>

## Endpoints

<ApiEndpoint method="GET" path="/api/users" />

Returns a list of users. Supports pagination via \`?page=1&limit=20\`.

\`\`\`bash
curl -H "Authorization: Bearer <token>" \\
  https://api.example.com/api/users
\`\`\`

<ApiEndpoint method="POST" path="/api/users" />

Create a new user:

\`\`\`json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
\`\`\`

<CodeBlock title="Response" />

<Tabs>
  <Tab label="Success">
    Status 201 — user created successfully.
  </Tab>
  <Tab label="Error">
    Status 400 — validation failed.
  </Tab>
</Tabs>

> **Note:** Rate limiting applies. See [rate limits](/docs/rate-limits) for details.
`

/** MDX with imports, JSX wrappers, self-closing components, regular markdown */
export const mdxToMarkdownSample = `---
title: Migration Guide
description: How to migrate from v1 to v2
---

import { Steps } from '@/components/Steps'
import { Callout } from '@/components/Callout'
import { Card } from '@/components/Card'

export const version = '2.0'

# Migration Guide

Follow these steps to migrate your project from **v1** to **v2**.

<Callout type="warning">
  Back up your data before starting the migration.
</Callout>

<Steps>

## Update dependencies

\`\`\`bash
npm install my-package@latest
\`\`\`

## Update configuration

Replace the old config format:

\`\`\`json
{
  "version": 2,
  "features": ["new-api"]
}
\`\`\`

</Steps>

<Card title="Breaking Changes" />

For a complete list of changes, see the [changelog](/changelog).

<Callout type="info">
  Need help? Visit our [support page](/support).
</Callout>
`
