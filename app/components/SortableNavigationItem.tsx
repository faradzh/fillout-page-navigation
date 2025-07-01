"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  id: string;
  index: number;
  setActivePage(): void;
  children: React.ReactNode;
}
function SortableNavigationItem({ id, index, setActivePage, children }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    left: `-${index * 2}px`,
  };

  function onEnter(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter") {
      setActivePage();
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative focus:outline-none focus-visible:shadow-sm focus-visible:ring-2 focus-visible:ring-[#2F72E2]/50 focus-visible:ring-offset-0 focus-visible:rounded-lg"
      onKeyDown={onEnter}
    >
      {children}
    </div>
  );
}

export default SortableNavigationItem;
