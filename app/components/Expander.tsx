import { useDndContext } from "@dnd-kit/core";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";

interface Props {
  index: number;
}
function Expander({ index }: Props) {
  const [showAddBtn, setShowAddBtn] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { active } = useDndContext();

  function mouseOverHandler() {
    timeoutRef.current = setTimeout(() => setShowAddBtn(true), 100);
  }

  function mouseLeaveHandler() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowAddBtn(false);
  }
  return (
    <div
      tabIndex={0}
      className={clsx(
        "relative py-3 w-[26px] transition-all duration-200 delay-100 ease-in-out hover:w-[66px] cursor-pointer focus:outline-none focus-visible:shadow-sm focus-visible:ring-[0.5px] focus-visible:ring-[#2F72E2] focus-visible:ring-offset-0 focus-visible:rounded-sm",
        { invisible: active }
      )}
      onMouseOver={mouseOverHandler}
      onMouseLeave={mouseLeaveHandler}
      onFocus={() => setShowAddBtn(true)}
      style={{ left: `-${index * 2}px` }}
    >
      <div
        className={`flex justify-center cursor-pointer items-center relative h-[1.5px] bg-[repeating-linear-gradient(to_right,_#bbb_0px,_#bbb_4px,_transparent_4px,_transparent_8px)] -z-1`}
      >
        {showAddBtn && (
          <button
            aria-label="Add a new page"
            className="absolute bg-white border-[0.5px] border-[#E1E1E1] rounded-full h-4 w-4 focus:outline-none focus-visible:shadow-sm focus-visible:ring-[0.5px] focus-visible:ring-[#2F72E2] focus-visible:ring-offset-0 focus-visible:rounded-lg"
            style={{
              left: `calc(50% + ${index * 2}px)`,
              transform: `translate(calc(-50% - ${index * 2 - 1}px))`,
            }}
            onBlur={() => setShowAddBtn(false)}
          >
            <span className="absolute text-black top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 h-[8px] w-[8px]">
              <Plus size="8" />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Expander;
