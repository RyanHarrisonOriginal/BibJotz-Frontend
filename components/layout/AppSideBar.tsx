'use client'
import SideBar from "@/components/ui/SideBar/sidebar"
import SideBarContent from "@/components/ui/SideBar/sidebarContent"
import SideBarGroup from "@/components/ui/SideBar/sidebarGroup"
import SideBarGroupContent from "@/components/ui/SideBar/sidebarGroupContent"
import SideBarMenu from "../ui/SideBar/sidebarMenu"
import SideBarMenuItem from "../ui/SideBar/sidebarMenuItem"
import SidebarMenuButton from "../ui/SideBar/sidebarMenuButton"
import { Home, BookOpen, Library, User } from 'lucide-react'
import { NavLink } from "./NavLink"
import { useSideBar } from "@/components/ui/SideBar/sidebarProvider"

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
    return (
        <SideBar className= { open ? "w-60" : "w-14"}>
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
            </SideBarContent>
        </SideBar>
    )
}
