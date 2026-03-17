interface FaqItem {
  question: string
  answer: string
}

interface FaqSectionProps {
  items: FaqItem[]
}

export function FaqSection({ items }: FaqSectionProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-lg border border-border bg-card"
        >
          <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-foreground transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
            <span className="pr-4 font-medium">{item.question}</span>
            <span
              className="shrink-0 text-muted-foreground transition-transform group-open:rotate-45"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <div className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted-foreground">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  )
}
