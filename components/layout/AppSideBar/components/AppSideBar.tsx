'use client';

import SideBar from "@/components/ui/SideBar/sidebar";
import SideBarContent from "@/components/ui/SideBar/sidebarContent";
import SideBarGroup from "@/components/ui/SideBar/sidebarGroup";
import SideBarGroupContent from "@/components/ui/SideBar/sidebarGroupContent";
import SideBarMenu from "../../../ui/SideBar/sidebarMenu";
import SideBarMenuItem from "../../../ui/SideBar/sidebarMenuItem";
import SidebarMenuButton from "../../../ui/SideBar/sidebarMenuButton";
import { NavLink } from "../../NavLink";
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
import { Button } from "../../../ui/button";
import  DraftItem from "./DraftItems";
import { useAppSideBar } from "../hooks/useAppSideBar";

export const AppSideBar = () => {
  const { memoizedDrafts, handleCreateDraft, handleDraftClick } = useAppSideBar();
  const { open } = useSideBar();

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
                  {memoizedDrafts.length === 0 && (
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
