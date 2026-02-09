"use client";

import { Button } from "@/components/ui/button";

interface ReflectionEditorNoDataProps {
  onStartJourney: () => void;
}

export function ReflectionEditorNoData({
  onStartJourney,
}: ReflectionEditorNoDataProps) {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <p className="text-muted-foreground">No journey data found.</p>
        <Button onClick={onStartJourney}>Start a Journey</Button>
      </div>
    </div>
  );
}
