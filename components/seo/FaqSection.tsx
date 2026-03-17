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
          className="group rounded-lg border border-[#2a2640] bg-[#1a1725]"
        >
          <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-[#e0e0e4] transition-colors hover:text-[#a78bfa] [&::-webkit-details-marker]:hidden">
            <span className="pr-4 font-medium">{item.question}</span>
            <span
              className="shrink-0 text-[#6b6b78] transition-transform group-open:rotate-45"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <div className="border-t border-[#2a2640] px-5 py-4 text-sm leading-relaxed text-[#6b6b78]">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  )
}
