"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";

import NavigationItem from "./NavigationItem";
import { Page } from "./types";

// dynamically import the dnd's component on the client to avoid server-client content mismatch
const SortableNavigationItem = dynamic(
  () => import("./SortableNavigationItem"),
  { ssr: false }
);
const Expander = dynamic(() => import("./Expander"), { ssr: false });

function Navigation(props: { pages: Page[] }) {
  const [pages, setPages] = useState<Page[]>(props.pages);
  const [activePage, setActivePage] = useState<Page>(props.pages[0]);

  const insertNewPage = useCallback(
    function (prevId: string) {
      const newPage = {
        id: crypto.randomUUID(),
        title: "New Page",
        icon: "",
      } as Page;
      const index = pages.findIndex((page) => page.id === prevId);
      pages.splice(index, 0, newPage);
      setPages([...pages]);
    },
    [pages]
  );

  const pushNewPage = useCallback(function () {
    const newPage = {
      id: crypto.randomUUID(),
      title: "New Page",
      icon: "",
    } as Page;
    setPages((prevPages) => [...prevPages, newPage]);
  }, []);

  function onNewPageBtnDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      pushNewPage();
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1, // only start drag after 8px movement
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <nav className="flex relative">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToHorizontalAxis]}
      >
        <SortableContext items={pages} strategy={horizontalListSortingStrategy}>
          {pages.map((page, index) => (
            <div key={page.id} className="flex items-center relative">
              {index > 0 && (
                <Expander
                  id={page.id}
                  index={index}
                  addPageHandler={insertNewPage}
                />
              )}
              <SortableNavigationItem
                id={page.id}
                index={index}
                setActivePage={() => setActivePage(page)}
              >
                <NavigationItem
                  item={page}
                  isActive={activePage.id === page.id}
                  setActivePage={setActivePage}
                />
              </SortableNavigationItem>
            </div>
          ))}
          <div className="flex items-center relative">
            <Expander index={pages.length} addPageHandler={pushNewPage} />
            <div
              tabIndex={0}
              className="relative focus:outline-none focus-visible:shadow-sm focus-visible:ring-2 focus-visible:ring-[#2F72E2]/50 focus-visible:ring-offset-0 focus-visible:rounded-lg"
              style={{ left: `-${pages.length * 2}px` }}
              onClick={pushNewPage}
              onKeyDown={onNewPageBtnDown}
            >
              <NavigationItem
                isActive={false}
                item={{ id: "1", title: "Add page", icon: "plus" }}
                className="bg-white shadow-sm"
                clickHandler={pushNewPage}
              />
            </div>
          </div>
        </SortableContext>
      </DndContext>
    </nav>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setPages((pages) => {
        const oldIndex = pages.findIndex((page) => page.id === active.id);
        const newIndex = pages.findIndex((page) => page.id === over?.id);
        return arrayMove(pages, oldIndex, newIndex);
      });
    }
  }
}

export default Navigation;
