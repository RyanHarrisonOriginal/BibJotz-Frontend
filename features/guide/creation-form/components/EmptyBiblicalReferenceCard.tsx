import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/Card/card";
import { Plus } from "lucide-react";
import { BiblicalReference } from "./BiblicalReferenceList";

type EmptyBiblicalReferenceCardProps = {
    openBibleReader: () => void;
    onAddReference: (reference: BiblicalReference) => void;
}

export function EmptyBiblicalReferenceCard({ openBibleReader, onAddReference }: EmptyBiblicalReferenceCardProps) {
    return (
      <Card className="p-8 border-dashed border-2 bg-muted/20">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-medium mb-1">No biblical references yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Select verses from the Bible reader or add them manually
            </p>
            <div className="flex gap-2 justify-center">
              <Button
                type="button"
                onClick={openBibleReader}
                className="gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Select from Bible
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onAddReference({ book: '', chapter: 1, startVerse: 1, endVerse: 1 })}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Manually
              </Button>
            </div>
          </div>
        </div>
      </Card>
    )
  }