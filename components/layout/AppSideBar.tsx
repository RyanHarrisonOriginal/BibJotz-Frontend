'use client';

import SideBar from "@/components/ui/SideBar/sidebar";
import SideBarContent from "@/components/ui/SideBar/sidebarContent";
import SideBarGroup from "@/components/ui/SideBar/sidebarGroup";
import SideBarGroupContent from "@/components/ui/SideBar/sidebarGroupContent";
import SideBarMenu from "../ui/SideBar/sidebarMenu";
import SideBarMenuItem from "../ui/SideBar/sidebarMenuItem";
import SidebarMenuButton from "../ui/SideBar/sidebarMenuButton";
import { NavLink } from "./NavLink";
import { useSideBar } from "@/components/ui/SideBar/sidebarProvider";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from "@/components/ui/Collapsible/collapsible";
import {
  Home,
  BookOpen,
  Library,
  User,
  FileEdit,
  ChevronDown,
  FileText,
  Plus
} from "lucide-react";
import { useGetUserDrafts } from "@/features/guide/drafts/hooks/useDraftsApi";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { createNewDraftKey } from "@/features/guide/drafts/utility";
import { useQueryClient } from "@tanstack/react-query";
import type { Draft } from "@/features/guide/drafts/types";
import { DraftApiService } from "@/features/guide/drafts/api";
import { useEffect, useMemo, memo, useCallback } from "react";

function getRelativeTime(date: Date | string): string {
  const now = new Date();
  const created = new Date(date);
  const diffMs = now.getTime() - created.getTime();
  const mins = Math.floor(diffMs / 60000);
  const hrs = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);

  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hrs < 24) return `${hrs}h ago`;
  return `${days}d ago`;
}

// Memoized draft item to prevent rerenders
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
  // Only rerender if draftKey, name, or updatedAt changed
  return prev.draft.draftKey === next.draft.draftKey &&
         prev.draft.name === next.draft.name &&
         prev.draft.updatedAt?.toString() === next.draft.updatedAt?.toString() &&
         prev.onClick === next.onClick;
});
DraftItem.displayName = 'DraftItem';

export const AppSideBar = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { open } = useSideBar();

  const { data: userDrafts = [], refetch: refetchDrafts } = useGetUserDrafts(1);

  // Memoize drafts list - React Query already does structural sharing, so this is mainly for stability
  const memoizedDrafts = useMemo(() => userDrafts, [userDrafts]);

  // Refetch drafts when sidebar opens to ensure fresh data
  useEffect(() => {
    if (open) {
      refetchDrafts();
    }
  }, [open, refetchDrafts]);

  const handleCreateDraft = () => {
    const draftKey = createNewDraftKey("GUIDE");
    if (!draftKey) return; 
    
    const now = new Date();
    
    // Use correct query key: 'userDrafts' not 'drafts'
    queryClient.setQueryData<Partial<Draft>[]>(['userDrafts', 1], (oldDrafts = []) => {
      const optimisticDraft: Partial<Draft> = {
        id: `temp-${draftKey}`, // Temporary ID until server responds
        name: '',
        draftKey: draftKey,
        createdAt: now,
        updatedAt: now,
      };
      return [optimisticDraft, ...oldDrafts];
    });
    
    // Refetch to get the real data from server
    //queryClient.invalidateQueries({ queryKey: ['userDrafts', 1] });
    
    router.push(`/create-guide?draftKey=${draftKey}`);
  };

  const handleDraftClick = useCallback(async (draftKey: string) => {
    // Cancel any in-flight queries for other drafts
    queryClient.cancelQueries({ 
      queryKey: ['draft'], 
      predicate: (query) => {
        const queryDraftKey = query.queryKey[1];
        return queryDraftKey !== draftKey;
      }
    });
    
    // Force fetch the latest draft data before navigating
    await queryClient.fetchQuery({
      queryKey: ['draft', draftKey],
      queryFn: () => DraftApiService.getDraft(draftKey),
    });
    
    router.push(`/create-guide?draftKey=${draftKey}`);
  }, [queryClient, router]);


  return (
    <SideBar className={open ? "w-60" : "w-14"}>
      <SideBarContent>
        {/* Main nav */}
        <SideBarGroup>
          <SideBarGroupContent>
            <SideBarMenu>
              {[
                { label: "Home", href: "/", icon: Home },
                { label: "Guides", href: "/guides", icon: BookOpen },
                { label: "Library", href: "/library", icon: Library },
                { label: "Profile", href: "/profile", icon: User }
              ].map(({ label, href, icon: Icon }) => (
                <SideBarMenuItem key={href}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      href={href}
                      className="hover:bg-muted/50 transition-colors"
                      activeClassName="bg-primary/10 text-primary font-medium"
                      end
                    >
                      <Icon className="h-5 w-5" />
                      <span className="ml-3">{label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SideBarMenuItem>
              ))}
            </SideBarMenu>
          </SideBarGroupContent>
        </SideBarGroup>

        {/* Drafts */}
        <SideBarGroup>
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              <div className="flex items-center gap-2">
                <FileEdit className="h-4 w-4" />
                <span>Guide Drafts</span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SideBarGroupContent>
                <div className="py-1">
                  {userDrafts.length === 0 && (
                    <div className="px-3 py-2 text-xs text-muted-foreground">
                      No drafts yet
                    </div>
                  )}

                  {memoizedDrafts.map(draft => (
                    <DraftItem
                      key={draft.draftKey}
                      draft={draft}
                      onClick={handleDraftClick}
                    />
                  ))}
                </div>

                <Button onClick={handleCreateDraft} className="w-full mt-2">
                  <Plus className="h-4 w-4" />
                  Add New Draft
                </Button>
              </SideBarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SideBarGroup>
      </SideBarContent>
    </SideBar>
  );
};
