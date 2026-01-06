import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BookOpen, X } from 'lucide-react';
import TiptapEditor from '@/components/editor/TipTapEditor';

interface ReflectionEditorProps {
  title: string;
  content: string;
  tags: string[];
  tagInput: string;
  sectionTitle: string;
  guideTitle: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onTagInputChange: (value: string) => void;
  onAddTag: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onRemoveTag: (tag: string) => void;
}

const ReflectionEditor = ({
  title,
  content,
  tags,
  tagInput,
  sectionTitle,
  guideTitle,
  onTitleChange,
  onContentChange,
  onTagInputChange,
  onAddTag,
  onRemoveTag,
}: ReflectionEditorProps) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="py-8 px-8 lg:px-16 xl:px-24">
        <div className="space-y-6 max-w-4xl">
          {/* Context badges */}
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="font-normal">
              <BookOpen className="h-3 w-3 mr-1" />
              {guideTitle}
            </Badge>
            <span className="text-muted-foreground">/</span>
            <Badge variant="outline" className="font-normal">
              {sectionTitle}
            </Badge>
          </div>

          {/* Title */}
          <input
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Untitled Reflection"
            className="w-full border-0 bg-transparent text-4xl font-bold font-serif outline-none placeholder:text-muted-foreground/40 focus:outline-none"
          />

          {/* TipTap Editor */}
          <TiptapEditor
            content={content}
            onChange={onContentChange}
            placeholder="Start writing your reflection... What stood out to you? What questions arose? How might this apply to your life?"
          />

          <Separator />

          {/* Tags */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-sm font-medium">Tags</span>
              <span className="text-xs text-muted-foreground/60">
                (press Enter to add)
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors group"
                  onClick={() => onRemoveTag(tag)}
                >
                  {tag}
                  <X className="ml-1 h-3 w-3 opacity-50 group-hover:opacity-100" />
                </Badge>
              ))}

              <input
                value={tagInput}
                onChange={(e) => onTagInputChange(e.target.value)}
                onKeyDown={onAddTag}
                placeholder={tags.length === 0 ? 'Add tags...' : '+'}
                className="border-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground/40 focus:outline-none min-w-[80px] flex-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReflectionEditor;
