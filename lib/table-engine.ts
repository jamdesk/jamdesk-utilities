function parseCSVRow(row: string): string[] {
  const cells: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < row.length; i++) {
    const char = row[i]
    if (char === '"') {
      if (inQuotes && row[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      cells.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  cells.push(current.trim())
  return cells
}

function escapeCell(cell: string): string {
  return cell.replace(/\|/g, '\\|')
}

function buildTable(rows: string[][]): string {
  if (rows.length === 0) return ''

  const header = rows[0]
  const body = rows.slice(1)

  const headerRow = `| ${header.map(escapeCell).join(' | ')} |`
  const separator = `| ${header.map(() => '---').join(' | ')} |`
  const bodyRows = body.map(
    (row) => `| ${row.map(escapeCell).join(' | ')} |`
  )

  return [headerRow, separator, ...bodyRows].join('\n')
}

export function csvToMarkdownTable(input: string): string {
  if (!input.trim()) return ''
  const lines = input.trim().split('\n')
  const rows = lines.map(parseCSVRow)
  return buildTable(rows)
}

export function tsvToMarkdownTable(input: string): string {
  if (!input.trim()) return ''
  const lines = input.trim().split('\n')
  const rows = lines.map((line) => line.split('\t').map((c) => c.trim()))
  return buildTable(rows)
}
