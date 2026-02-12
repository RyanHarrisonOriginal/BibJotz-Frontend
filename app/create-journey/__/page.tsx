'use client';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Form/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select/select';
import { ArrowLeft, BookOpen, CheckCircle2, Sparkles, PenLine } from 'lucide-react';
import { toast } from 'sonner';
import SectionNav from '@/domain/journeys/components/SectionNav';
import { ReflectionEditor } from "@/domain/reflections/components";
import { Badge } from '@/components/ui/badge';
import { useGetGuideOptions } from '@/domain/guide/hooks/useGuideApi';

interface Guide {
  id: string;
  title: string;
  description: string;
  sections: { id: string; title: string }[];
}

interface Reflection {
  id: string;
  sectionId: string;
  title: string;
  content: string;
  tags: string[];
}


// Guides are reusable templates
const guides: Guide[] = [
  {
    id: '1',
    title: 'Character Study',
    description: 'A deep dive into a biblical character',
    sections: [
      { id: '1-1', title: 'Background & Context' },
      { id: '1-2', title: 'Key Events' },
      { id: '1-3', title: 'Character Traits' },
      { id: '1-4', title: 'Lessons & Application' },
    ]
  },
  {
    id: '2',
    title: 'Book Study',
    description: 'Chapter-by-chapter exploration of a book',
    sections: [
      { id: '2-1', title: 'Historical Context' },
      { id: '2-2', title: 'Key Themes' },
      { id: '2-3', title: 'Verse Analysis' },
      { id: '2-4', title: 'Personal Application' },
    ]
  },
  {
    id: '3',
    title: 'Topical Study',
    description: 'Explore a specific topic across Scripture',
    sections: [
      { id: '3-1', title: 'Definition & Overview' },
      { id: '3-2', title: 'Old Testament Perspective' },
      { id: '3-3', title: 'New Testament Perspective' },
      { id: '3-4', title: 'Modern Application' },
    ]
  },
  {
    id: '4',
    title: 'Prayer & Contemplation',
    description: 'A guided spiritual reflection',
    sections: [
      { id: '4-1', title: 'Scripture Reading' },
      { id: '4-2', title: 'Meditation' },
      { id: '4-3', title: 'Prayer Response' },
    ]
  }
];

const CreateJourney = () => {
  const { data: guideOptions } = useGetGuideOptions();
  const router = useRouter();
  
  // Journey state - a journey is an instance of a guide
  const [journeyName, setJourneyName] = useState('');
  const [selectedGuide, setSelectedGuide] = useState('');
  const [journeyStarted, setJourneyStarted] = useState(false);
  
  // Reflection state
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [activeReflectionId, setActiveReflectionId] = useState<string | null>(null);
  const [activeSectionId, setActiveSectionId] = useState('');
  const [tagInput, setTagInput] = useState('');

  const selectedGuideData = guides.find(g => g.id === selectedGuide);
  const activeReflection = reflections.find(r => r.id === activeReflectionId);
  const activeSectionData = selectedGuideData?.sections.find(s => s.id === activeSectionId);

  const handleGuideSelect = (guideId: string) => {
    setSelectedGuide(guideId);
  };

  const handleStartJourney = () => {
    if (!journeyName.trim()) {
      toast.error('Please name your journey');
      return;
    }
    if (!selectedGuide) {
      toast.error('Please select a guide template');
      return;
    }
    
    const guide = guides.find(g => g.id === selectedGuide);
    if (guide && guide.sections.length > 0) {
      setActiveSectionId(guide.sections[0].id);
    }
    setJourneyStarted(true);
  };

  const createReflection = useCallback((sectionId: string) => {
    const newReflection: Reflection = {
      id: `ref-${Date.now()}`,
      sectionId,
      title: '',
      content: '',
      tags: [],
    };
    setReflections(prev => [...prev, newReflection]);
    setActiveReflectionId(newReflection.id);
    setActiveSectionId(sectionId);
  }, []);

  const updateReflection = useCallback((id: string, updates: Partial<Reflection>) => {
    setReflections(prev =>
      prev.map(r => (r.id === id ? { ...r, ...updates } : r))
    );
  }, []);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() && activeReflection) {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase();
      if (!activeReflection.tags.includes(newTag)) {
        updateReflection(activeReflection.id, {
          tags: [...activeReflection.tags, newTag],
        });
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    if (activeReflection) {
      updateReflection(activeReflection.id, {
        tags: activeReflection.tags.filter(t => t !== tag),
      });
    }
  };

  const handleSubmit = () => {
    if (!journeyName.trim()) {
      toast.error('Please name your journey');
      return;
    }
    if (reflections.length === 0) {
      toast.error('Please add at least one reflection');
      return;
    }
    const emptyReflections = reflections.filter(r => !r.title.trim() && !r.content.trim());
    if (emptyReflections.length === reflections.length) {
      toast.error('Please write at least one reflection');
      return;
    }

    toast.success(`Journey "${journeyName}" saved with ${reflections.length} reflection(s)!`);
    router.push('/library');
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => journeyStarted ? setJourneyStarted(false) : router.back()}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            
            {journeyStarted && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-normal">
                  {selectedGuideData?.title}
                </Badge>
                <span className="text-muted-foreground">/</span>
                <span className="font-medium">{journeyName}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {journeyStarted && (
              <>
                <Button variant="outline" size="sm" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Bible Reader
                </Button>

                <Button onClick={handleSubmit} className="gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Save Journey
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Journey Setup - if journey not started */}
      {!journeyStarted ? (
        <div className="flex-1 flex items-center justify-center p-4 min-h-0 -mt-14">
          <div className="w-full max-w-lg space-y-8 mx-auto">
            <div className="text-center space-y-2">
              <Sparkles className="h-10 w-10 mx-auto text-primary/60" />
              <h2 className="text-2xl font-serif font-semibold">Start a New Journey</h2>
              <p className="text-muted-foreground">
                A journey is your personal study using a guide as a template.
              </p>
            </div>

            <div className="space-y-6">
              {/* Guide Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Choose a Guide Template</label>
                <Select value={selectedGuide} onValueChange={handleGuideSelect}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a guide..." />
                  </SelectTrigger>
                  <SelectContent>
                    {guideOptions?.guides.map((guide) => (
                      <SelectItem key={guide?.id?.toString()} value={guide?.id?.toString()}>
                        <div className="flex flex-col items-start">
                          <span>{guide?.name}</span>
                          <span className="text-xs text-muted-foreground">{guide?.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedGuideData && (
                  <p className="text-xs text-muted-foreground">
                    {selectedGuideData.sections.length} sections to explore
                  </p>
                )}
              </div>

              {/* Journey Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Name Your Journey</label>
                <div className="relative">
                  <PenLine className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={journeyName}
                    onChange={(e) => setJourneyName(e.target.value)}
                    placeholder={selectedGuideData?.title === 'Character Study' 
                      ? 'e.g., Peter, Moses, Ruth...' 
                      : selectedGuideData?.title === 'Book Study'
                      ? 'e.g., Romans, James, Psalms...'
                      : 'e.g., Grace, Prayer, Faith...'}
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {selectedGuideData?.title === 'Character Study' 
                    ? 'Enter the name of the character you want to study'
                    : selectedGuideData?.title === 'Book Study'
                    ? 'Enter the book you want to study'
                    : 'Give your journey a meaningful name'}
                </p>
              </div>

              <Button 
                onClick={handleStartJourney} 
                className="w-full gap-2"
                disabled={!selectedGuide || !journeyName.trim()}
              >
                <Sparkles className="h-4 w-4" />
                Begin Journey
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* Main Content with Section Nav */
        <div className="flex-1 flex min-h-0">
          <SectionNav
            sections={selectedGuideData?.sections || []}
            reflections={reflections}
            activeReflectionId={activeReflectionId}
            activeSectionId={activeSectionId}
            onSectionSelect={(sectionId) => {
              setActiveSectionId(sectionId);
              setActiveReflectionId(null);
            }}
            onReflectionSelect={setActiveReflectionId}
            onAddReflection={createReflection}
          />

          {/* Editor Area */}
          {activeReflection && activeSectionData ? (
            <ReflectionEditor
              title={activeReflection.title}
              content={activeReflection.content}
              tags={activeReflection.tags}
              tagInput={tagInput}
              sectionTitle={activeSectionData.title}
              guideTitle={`${journeyName} · ${selectedGuideData?.title || ''}`}
              onTitleChange={(value) => updateReflection(activeReflection.id, { title: value })}
              onContentChange={(value) => updateReflection(activeReflection.id, { content: value })}
              onTagInputChange={setTagInput}
              onAddTag={handleAddTag}
              onRemoveTag={handleRemoveTag}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-center">
              <div className="space-y-3 max-w-sm">
                <p className="text-muted-foreground">
                  {activeSectionData
                    ? `Select a reflection or create one for "${activeSectionData.title}"`
                    : 'Select a section to begin'}
                </p>
                {activeSectionData && (
                  <Button
                    variant="outline"
                    onClick={() => createReflection(activeSectionId)}
                    className="gap-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    New Reflection
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateJourney;
