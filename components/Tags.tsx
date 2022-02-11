export const Tags = ({ items }: { items: string[] }) => (
  <div className="flex flex-row flex-wrap items-start gap-x-1 gap-y-1">
    {items.map((tag) => (
      <span
        key={tag}
        className="py-0.5 px-1.5 bg-blue-100 hover:bg-blue-200 rounded-sm text-xs text-blue-900 hover:text-slate-900"
      >
        {tag}
      </span>
    ))}
  </div>
);
