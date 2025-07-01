"use client";

import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { FileText, EllipsisVertical } from "lucide-react";

import ContextMenu from "./ContextMenu";
import { Page } from "./types";

interface Props {
  item: Page;
  isActive: boolean;
  setActivePage?(item: Page): void;
  className?: string;
  clickHandler?(): void;
}
function NavigationItem({
  item,
  isActive,
  setActivePage,
  className,
  clickHandler,
}: Props) {
  const [showContextMenu, setShowContextMenu] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const Icon = item.icon;

  function onClick(e: React.SyntheticEvent) {
    e.stopPropagation();
    setShowContextMenu(!showContextMenu);
  }

  function onBtnClick() {
    clickHandler?.();
    setActivePage?.(item);
  }

  useEffect(() => {
    function onDocumentClick(e: MouseEvent) {
      const clickedBtn = buttonRef.current?.contains(e.target as Node);
      const clickedMenu = contextMenuRef.current?.contains(e.target as Node);

      if (!clickedBtn && !clickedMenu) {
        setShowContextMenu(false);
      }
    }

    document.addEventListener("click", onDocumentClick);
    return () => {
      document.removeEventListener("click", onDocumentClick);
    };
  }, [showContextMenu]);

  function handleBlur(e: React.FocusEvent<HTMLDivElement>) {
    const nextFocused = e.relatedTarget as HTMLElement | null;

    if (!contextMenuRef.current?.contains(nextFocused)) {
      setShowContextMenu(false);
    }
  }

  return (
    <div
      className={clsx(
        "flex relative cursor-pointer items-center gap-2 rounded-lg bg-default hover:bg-default-hover text-black py-[6px] px-[10px] border-[0.5px] border-secondary z-10",
        className,
        { "shadow-sm bg-white": isActive }
      )}
      onClick={onBtnClick}
    >
      <span className={clsx({ "text-brand": isActive })}>
        {item.icon ? <Icon size="16" /> : <FileText size="16" />}
      </span>
      <span>{item.title}</span>
      {isActive && (
        <button
          aria-label="Open context menu"
          ref={buttonRef}
          className="cursor-pointer focus:outline-none focus-visible:shadow-sm focus-visible:ring-[0.5px] focus-visible:ring-[#2F72E2] focus-visible:ring-offset-0 focus-visible:rounded-sm"
          onClick={onClick}
        >
          <EllipsisVertical size="16" />
        </button>
      )}
      {showContextMenu && (
        <ContextMenu onBlur={handleBlur} ref={contextMenuRef} />
      )}
    </div>
  );
}

export default NavigationItem;
