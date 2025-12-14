'use client'
import SideBar from "@/components/ui/SideBar/sidebar"
import SideBarContent from "@/components/ui/SideBar/sidebarContent"
import SideBarGroup from "@/components/ui/SideBar/sidebarGroup"
import SideBarGroupContent from "@/components/ui/SideBar/sidebarGroupContent"
import SideBarMenu from "../ui/SideBar/sidebarMenu"
import SideBarMenuItem from "../ui/SideBar/sidebarMenuItem"
import SidebarMenuButton from "../ui/SideBar/sidebarMenuButton"
import { NavLink } from "./NavLink"
import { useSideBar } from "@/components/ui/SideBar/sidebarProvider"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/Collapsible/collapsible"
import { Home, BookOpen, Library, User, Users, FileEdit, ChevronDown, FileText } from 'lucide-react';
import { useGetUserDrafts } from "@/features/guide/drafts/hooks/useDraftsApi"

const menuItems = [
    {
        label: "Home",
        href: "/",
        icon: Home,
    },
    {
        label: "Guides",
        href: "/guides",
        icon: BookOpen,
    },
    {
        label: "Library",
        href: "/library",
        icon: Library,
    },
    {
        label: "Profile",
        href: "/profile",
        icon: User,
    },
]

export const AppSideBar = () => {

    const { open } = useSideBar()
    const { data: userDrafts } = useGetUserDrafts(1)
    return (
        <SideBar className={open ? "w-60" : "w-14"}>
            <SideBarContent >
                <SideBarGroup>
                    <SideBarGroupContent>
                        <SideBarMenu>
                            {menuItems.map((item) => {
                                const Icon = item.icon
                                return (
                                    <SideBarMenuItem key={item.href}>
                                        <SidebarMenuButton asChild>
                                            <NavLink
                                                href={item.href}
                                                className="hover:bg-muted/50 transition-colors font-sans"
                                                activeClassName="bg-primary/10 text-primary font-medium"
                                                end
                                            >
                                                <Icon className="h-5 w-5" />
                                                <span className="ml-3">{item.label}</span>
                                            </NavLink>
                                        </SidebarMenuButton>
                                    </SideBarMenuItem>
                                )
                            })}
                        </SideBarMenu>
                    </SideBarGroupContent>
                </SideBarGroup>


                <SideBarGroup>
                    <Collapsible defaultOpen className="group/collapsible">
                        <CollapsibleTrigger className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            <div className="flex items-center gap-2">
                                <FileEdit className="h-4 w-4" />
                                <span>Guide Drafts</span>
                            </div>
                            <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <SideBarGroupContent>
                                <div className="py-1">
                                    {userDrafts?.map((draft) => (
                                        <NavLink
                                            key={draft.id}
                                            href={`/create-guide?draft=${draft.id}`}
                                            className="flex items-center justify-between gap-2 px-3 py-1.5 hover:bg-muted/50 transition-colors group"
                                        >
                                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                                <FileText className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                                                <span className="text-xs font-medium truncate group-hover:text-primary transition-colors">
                                                    {draft.name}
                                                </span>
                                            </div>
                                            <span className="text-[10px] text-muted-foreground shrink-0">
                                                {draft.updatedAt ? new Date(draft.updatedAt).toLocaleDateString() : ''}
                                            </span>
                                        </NavLink>
                                    ))}
                                    {userDrafts?.length === 0 && (
                                        <div className="px-3 py-2 text-center text-xs text-muted-foreground">
                                            No drafts yet
                                        </div>
                                    )}
                                </div>
                            </SideBarGroupContent>
                        </CollapsibleContent>
                    </Collapsible>
                </SideBarGroup>
            </SideBarContent>
        </SideBar>
    )
}
