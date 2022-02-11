import { ReactNode, useState } from "react";
import { maxExpandedLimit } from "../lib/constants";

export function ViewMoreBuilder<T>({
  items,
  label,
  builder,
}: {
  items: T[];
  label: string;
  builder: (item: T) => ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      {items.slice(0, isExpanded ? undefined : maxExpandedLimit).map(builder)}
      {items.length > maxExpandedLimit && (
        <a
          className="inline-block text-sm"
          style={{ cursor: "pointer" }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          View {isExpanded ? "less" : "more"} {label}
        </a>
      )}
    </>
  );
}
