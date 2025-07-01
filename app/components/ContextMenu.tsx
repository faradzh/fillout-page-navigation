import { Flag, PencilLine, Clipboard, Copy, Trash2 } from "lucide-react";

import ContextMenuItem from "./ContextMenuItem";
import { forwardRef } from "react";

interface Props {
  onBlur: React.FocusEventHandler<HTMLDivElement>;
}

export default forwardRef<HTMLDivElement, Props>(function ContextMenu(
  { onBlur },
  ref
) {
  return (
    <div
      ref={ref}
      tabIndex={-1}
      onBlur={onBlur}
      className="absolute bg-white w-[240px] rounded-xl border-[0.5px] border-secondary shadow-sm text-black bottom-full mb-2 left-0 z-50"
    >
      <div className="bg-[#FAFBFC] rounded-t-xl p-3 border-b-[0.5px] border-b-secondary">
        <h2 className="text-[#1A1A1A] font-medium text-base">Settings</h2>
      </div>
      <ul className="p-3 text-lg space-y-2">
        <ContextMenuItem
          icon={Flag}
          iconColor="blue"
          text="Set as first page"
        />
        <ContextMenuItem icon={PencilLine} text="Rename" />
        <ContextMenuItem icon={Clipboard} text="Copy" />
        <ContextMenuItem icon={Copy} text="Duplicate" />
        <hr className="my-3 border-t transform scale-y-[0.5] origin-top border-secondary" />
        <ContextMenuItem
          icon={Trash2}
          iconColor="red"
          text="Delete"
          textColor="red"
        />
      </ul>
    </div>
  );
});
