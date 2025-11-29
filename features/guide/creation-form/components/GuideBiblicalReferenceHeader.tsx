import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
import { Plus } from "lucide-react"
import { BiblicalReference } from "./BiblicalReferenceList";


type GuideBiblicalReferenceHeaderProps = {
    openBibleReader: () => void;
    onAddReference: (reference: BiblicalReference) => void;
}

export function GuideBiblicalReferenceHeader({ openBibleReader, onAddReference }: GuideBiblicalReferenceHeaderProps) {
    return (
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif font-semibold">Biblical Foundation</h2>
          <p className="text-sm text-muted-foreground">
            Primary scripture references for this guide
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={openBibleReader}
            className="gap-2"
          >
            <BookOpen className="h-4 w-4" />
            Select from Bible
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onAddReference({ book: '', chapter: 1, startVerse: 1, endVerse: 1 })}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Manually
          </Button>
        </div>
      </div>
    )
  }