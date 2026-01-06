'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Plus, Sparkles, BookOpen, ArrowRight, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/Progress/progress";
import { createNewDraftKey } from "@/domain/guide-draft/utility";
import { handleCreateGuide } from "@/domain/guide-draft/utility";

export default function Home() {
  const router = useRouter();


  // Recent reflections with journey/guide context
  const recentReflections = [
    {
      id: '1',
      title: "God's Omnipresence in Daily Life",
      journeyName: 'Peter',
      guideTitle: 'Character Study',
      sectionTitle: 'Key Events',
      date: '2 hours ago'
    },
    {
      id: '2',
      title: 'Wrestling with Sovereignty',
      journeyName: 'Romans',
      guideTitle: 'Book Study',
      sectionTitle: 'Key Themes',
      date: 'Yesterday'
    },
    {
      id: '3',
      title: 'Holiness and Humility',
      journeyName: 'Grace',
      guideTitle: 'Topical Study',
      sectionTitle: 'New Testament Perspective',
      date: '3 days ago'
    },
    {
      id: '4',
      title: 'The Mystery of Divine Love',
      journeyName: 'Peter',
      guideTitle: 'Character Study',
      sectionTitle: 'Lessons & Application',
      date: '1 week ago'
    },
  ];

  // Recently used guides
  const recentGuides = [
    {
      id: '1',
      title: 'Character Study',
      description: 'A deep dive into a biblical character',
      sections: 4,
      activeJourneys: 2,
      lastUsed: '2 hours ago'
    },
    {
      id: '2',
      title: 'Book Study',
      description: 'Chapter-by-chapter exploration',
      sections: 4,
      activeJourneys: 1,
      lastUsed: 'Yesterday'
    },
    {
      id: '3',
      title: 'Topical Study',
      description: 'Explore a topic across Scripture',
      sections: 4,
      activeJourneys: 1,
      lastUsed: '3 days ago'
    },
  ];

  // Active journeys for quick access
  const activeJourneys = [
    {
      id: '1',
      name: 'Peter',
      guideTitle: 'Character Study',
      progress: 65,
      currentSection: 'Key Events'
    },
    {
      id: '2',
      name: 'Romans',
      guideTitle: 'Book Study',
      progress: 33,
      currentSection: 'Key Themes'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground">
            Welcome back
          </h1>
          <p className="text-muted-foreground mt-1">
            Pick up where you left off or start something new
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <Button
            variant="outline"
            className="h-auto py-4 px-5 justify-start gap-4 hover:border-primary/50 hover:bg-primary/5 transition-all"
            onClick={() => router.push('/create-journey')}
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="font-medium text-foreground">New Journey</p>
              <p className="text-xs text-muted-foreground">Start a guided study</p>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto py-4 px-5 justify-start gap-4 hover:border-primary/50 hover:bg-primary/5 transition-all"
            onClick={() => handleCreateGuide(router)}
          >
            <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center shrink-0">
              <Plus className="h-5 w-5 text-foreground" />
            </div>
            <div className="text-left">
              <p className="font-medium text-foreground">Create Guide</p>
              <p className="text-xs text-muted-foreground">Build your own template</p>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto py-4 px-5 justify-start gap-4 hover:border-primary/50 hover:bg-primary/5 transition-all"
            onClick={() => router.push('/guides')}
          >
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="text-left">
              <p className="font-medium text-foreground">Explore Guides</p>
              <p className="text-xs text-muted-foreground">Browse community guides</p>
            </div>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column - Recent Reflections Command Center */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-serif font-semibold text-foreground">
                  Recent Reflections
                </h2>
                <p className="text-sm text-muted-foreground">
                  Your latest logged thoughts
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => router.push('/library')}>
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {recentReflections.map((reflection) => (
                <Card
                  key={reflection.id}
                  className="hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer group"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <Badge variant="secondary" className="text-xs font-normal">
                            {reflection.journeyName}
                          </Badge>
                          <span className="text-muted-foreground/50">·</span>
                          <span className="text-xs text-muted-foreground">
                            {reflection.guideTitle}
                          </span>
                          <span className="text-muted-foreground/50">·</span>
                          <span className="text-xs text-muted-foreground">
                            {reflection.sectionTitle}
                          </span>
                        </div>
                        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {reflection.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {reflection.date}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Active Journeys */}
            <div className="pt-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-serif font-semibold text-foreground">
                  Active Journeys
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeJourneys.map((journey) => (
                  <Card
                    key={journey.id}
                    className="hover:border-primary/30 transition-all cursor-pointer"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-serif font-medium text-foreground">
                            {journey.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {journey.guideTitle}
                          </p>
                        </div>
                        <Button size="sm" variant="ghost" className="h-8 px-3">
                          Resume
                        </Button>
                      </div>
                      <Progress value={journey.progress} className="h-1.5 mb-1.5" />
                      <p className="text-xs text-muted-foreground">
                        Currently on: {journey.currentSection}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Recently Used Guides */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">
                    Recently Used Guides
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => router.push('/guides')}
                  >
                    See All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {recentGuides.map((guide) => (
                  <div
                    key={guide.id}
                    className="p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                          {guide.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                          {guide.description}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                          <span>{guide.sections} sections</span>
                          <span>{guide.activeJourneys} active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-border/50">
              <CardContent className="p-5">
                <h3 className="text-sm font-medium text-foreground mb-4">Your Activity</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-muted/30">
                    <p className="text-2xl font-serif font-bold text-foreground">12</p>
                    <p className="text-xs text-muted-foreground">Reflections</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/30">
                    <p className="text-2xl font-serif font-bold text-foreground">3</p>
                    <p className="text-xs text-muted-foreground">Journeys</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/30">
                    <p className="text-2xl font-serif font-bold text-foreground">2</p>
                    <p className="text-xs text-muted-foreground">Guides Used</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/30">
                    <p className="text-2xl font-serif font-bold text-foreground">7</p>
                    <p className="text-xs text-muted-foreground">Day Streak</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

}
