interface LibraryPageHeaderProps {
  journeyCount: number;
  reflectionCount: number;
}

export function LibraryPageHeader({
  journeyCount,
  reflectionCount,
}: LibraryPageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-serif font-semibold mb-1">
        Journey Library
      </h1>
      <p className="text-sm text-muted-foreground">
        {journeyCount} journeys · {reflectionCount} reflections
      </p>
    </div>
  );
}
