interface ComponentStubProps {
  name: string
  attributes: Record<string, string>
  children?: React.ReactNode
}

export function ComponentStub({ name, attributes, children }: ComponentStubProps) {
  const attrString = Object.entries(attributes)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ')

  if (children) {
    // Block component with children
    return (
      <div className="my-3 rounded-md border border-[#2a2640] bg-[#0f0d17]">
        <div className="flex items-center gap-2 border-b border-[#2a2640] px-3 py-1.5">
          <span className="text-xs font-medium text-[#a78bfa]">
            &lt;{name}&gt;
          </span>
          {attrString && (
            <span className="text-xs text-[#4a4858]">({attrString})</span>
          )}
        </div>
        <div className="px-3 py-2">{children}</div>
      </div>
    )
  }

  // Self-closing component — compact inline badge
  return (
    <span className="mx-0.5 inline-flex items-center gap-1 rounded border border-[#2a2640] bg-[#0f0d17] px-2 py-0.5">
      <span className="text-xs font-medium text-[#a78bfa]">
        &lt;{name} /&gt;
      </span>
      {attrString && (
        <span className="text-xs text-[#4a4858]">({attrString})</span>
      )}
    </span>
  )
}
