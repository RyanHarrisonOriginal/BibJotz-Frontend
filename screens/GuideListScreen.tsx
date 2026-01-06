'use client';
import { useState } from 'react';
import GuideCard from '@/domain/guide/components/GuideCard/GuideCard';
import { GuideListItem } from '@/domain/guide/types';
import { useGetGuides, useDeleteGuide } from '@/domain/guide/hooks/useGuideApi';
import {
  GuidesPageHeader,
  GuidesOwnershipTabs,
  GuidesFilters,
  NoGuidesFound,
  GuideListItemComponent,
} from '@/domain/guide/components/GuideList';

const Guides = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterOwnership, setFilterOwnership] = useState<'all' | 'mine' | 'community'>('all');
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');

  // Mock current user name - would come from auth context in real app
  const currentUserName = 'Ryan Harrison';

  const guides = useGetGuides();
  const deleteGuide = useDeleteGuide();

  const categories = ['all', 'Theology', 'Doctrine', 'Spiritual Practices', 'Biblical Studies'];


  const myGuidesCount = guides.data?.counts.myGuides || 0;
  const communityGuidesCount = guides.data?.counts.communityGuides || 0;

  const handleStartGuide = (guide: GuideListItem) => {
    console.log('Starting guide:', guide);
  };

  const handleDeleteGuide = (guideId: number) => {
      deleteGuide.mutate(guideId);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <GuidesPageHeader />
        <GuidesOwnershipTabs
          filterOwnership={filterOwnership}
          setFilterOwnership={setFilterOwnership}
          myGuidesCount={myGuidesCount}
          communityGuidesCount={communityGuidesCount}
        />
        <GuidesFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          categories={categories}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* Guide cards */}
        {guides.data?.guides.length === 0 ? (
          <NoGuidesFound />
        ) : viewMode === 'card' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.data?.guides.map((guide) => (
              <GuideCard
                key={guide.id}
                guide={guide}
                onStart={handleStartGuide}
                onDelete={handleDeleteGuide}
                currentUserName={currentUserName}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {guides.data?.guides.map((guide) => (
              <GuideListItemComponent
                key={guide.id}
                guide={guide}
                currentUserName={currentUserName}
                onStart={handleStartGuide}
                onDelete={handleDeleteGuide}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Guides;
