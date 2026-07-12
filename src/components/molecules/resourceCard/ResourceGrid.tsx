import type { ReactNode } from "react";

type ResourceGridProps = {
  children: ReactNode;
  emptyMessage?: string;
  isEmpty?: boolean;
};

function ResourceGrid({
  children,
  emptyMessage = "No items found.",
  isEmpty = false,
}: ResourceGridProps) {
  if (isEmpty) {
    return <div className="alert alert-info">{emptyMessage}</div>;
  }

  return <div className="grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">{children}</div>;
}

export default ResourceGrid;
