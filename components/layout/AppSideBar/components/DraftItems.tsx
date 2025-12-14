import { memo } from "react";
import { Draft } from "@/features/guide/drafts/types";
import { FileText } from "lucide-react";
import { getRelativeTime } from "../Utility";

const DraftItem = memo(({ draft, onClick }: { draft: Partial<Draft>, onClick: (draftKey: string) => void }) => {
    return (
      <div
        key={draft.draftKey}
        onClick={() => onClick(draft.draftKey ?? '')}
        className="flex items-center justify-between gap-2 px-3 py-1.5 hover:bg-muted/50 cursor-pointer"
      >
        <div className="flex items-center gap-2 min-w-0">
          <FileText className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs font-medium truncate">
            {draft.name || "Untitled Guide"}
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground">
          {draft.updatedAt && getRelativeTime(draft.updatedAt)}
        </span>
      </div>
    );
  }, (prev, next) => {
    return prev.draft.draftKey === next.draft.draftKey &&
           prev.draft.name === next.draft.name &&
           prev.draft.updatedAt?.toString() === next.draft.updatedAt?.toString() &&
           prev.onClick === next.onClick;
  });
  
  export default DraftItem;