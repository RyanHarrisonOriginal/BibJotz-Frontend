import { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, FileText } from 'lucide-react';
import { cn } from '@/public/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/Collapsible/collapsible';

interface Reflection {
  id: string;
  title: string;
  sectionId: string;
}

interface Section {
  id: string;
  title: string;
}

interface SectionNavProps {
  sections: Section[];
  reflections: Reflection[];
  activeReflectionId: string | null;
  activeSectionId: string;
  onSectionSelect: (sectionId: string) => void;
  onReflectionSelect: (reflectionId: string) => void;
  onAddReflection: (sectionId: string) => void;
}

const SectionNav = ({
  sections,
  reflections,
  activeReflectionId,
  activeSectionId,
  onSectionSelect,
  onReflectionSelect,
  onAddReflection,
}: SectionNavProps) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set([activeSectionId])
  );

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const getReflectionsForSection = (sectionId: string) => {
    return reflections.filter((r) => r.sectionId === sectionId);
  };

  return (
    <aside className="w-72 border-r bg-card/50 h-full flex flex-col">
      {/* Header */}
      <div className="p-5 border-b bg-card">
        <h3 className="text-sm font-semibold text-foreground tracking-tight">Guide Sections</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {sections.length} sections · {reflections.length} reflection{reflections.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Scrollable nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {sections.map((section, index) => {
          const sectionReflections = getReflectionsForSection(section.id);
          const isExpanded = expandedSections.has(section.id);
          const isActive = activeSectionId === section.id;
          const hasReflections = sectionReflections.length > 0;

          return (
            <Collapsible
              key={section.id}
              open={isExpanded}
              onOpenChange={() => toggleSection(section.id)}
            >
              <div
                className={cn(
                  'group flex items-center gap-2 rounded-lg px-3 py-2.5 transition-all',
                  isActive && !activeReflectionId 
                    ? 'bg-primary/10 border border-primary/20' 
                    : 'hover:bg-muted/50'
                )}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-muted shrink-0"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </Button>
                </CollapsibleTrigger>

                <button
                  onClick={() => onSectionSelect(section.id)}
                  className={cn(
                    'flex-1 text-left transition-colors min-w-0',
                    isActive && !activeReflectionId
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground/60 tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={cn(
                      'text-sm truncate',
                      isActive && !activeReflectionId && 'font-medium'
                    )}>
                      {section.title}
                    </span>
                  </div>
                  {hasReflections && (
                    <span className="text-xs text-muted-foreground/60 ml-6 mt-0.5">
                      {sectionReflections.length} reflection{sectionReflections.length !== 1 ? 's' : ''}
                    </span>
                  )}
                </button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10 hover:text-primary shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddReflection(section.id);
                  }}
                  title="Add reflection"
                >
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>

              <CollapsibleContent>
                <div className="ml-5 pl-4 border-l-2 border-border/40 space-y-0.5 py-2 mt-1">
                  {sectionReflections.length === 0 ? (
                    <button
                      onClick={() => onAddReflection(section.id)}
                      className="flex items-center gap-2 w-full text-left text-xs text-muted-foreground/60 hover:text-primary py-2 px-3 rounded-md hover:bg-primary/5 transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                      <span>Add your first reflection</span>
                    </button>
                  ) : (
                    sectionReflections.map((reflection) => (
                      <button
                        key={reflection.id}
                        onClick={() => onReflectionSelect(reflection.id)}
                        className={cn(
                          'flex items-center gap-2.5 w-full text-left text-sm py-2 px-3 rounded-md transition-all',
                          activeReflectionId === reflection.id
                            ? 'bg-primary/10 text-foreground font-medium border border-primary/20'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        )}
                      >
                        <FileText className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">
                          {reflection.title || 'Untitled'}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </nav>
    </aside>
  );
};

export default SectionNav;
