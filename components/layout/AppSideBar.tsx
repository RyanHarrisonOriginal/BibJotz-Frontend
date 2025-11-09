import SideBar from "@/components/ui/SideBar/sidebar"
import SideBarContent from "@/components/ui/SideBar/sidebarContent"
import SideBarGroup from "@/components/ui/SideBar/sidebarGroup"
import SideBarGroupContent from "@/components/ui/SideBar/sidebarGroupContent"
import SideBarMenu from "../ui/SideBar/sidebarMenu"
import SideBarMenuItem from "../ui/SideBar/sidebarMenuItem"
import SidebarMenuButton from "../ui/SideBar/sidebarMenuButton"
import { Home, BookOpen, Library, User } from 'lucide-react'
import Link from 'next/link'

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
        label: "Reflections",
        href: "/reflections",
        icon: Library,
    },
    {
        label: "Profile",
        href: "/profile",
        icon: User,
    },
]

export const AppSideBar = () => {
    return (
        <SideBar>
            <SideBarContent >
                <SideBarGroup>
                    <SideBarGroupContent>
                        <SideBarMenu>
                            {menuItems.map((item) => {
                                const Icon = item.icon
                                return (
                                    <SideBarMenuItem key={item.href}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.href}>
                                                <Icon />
                                                <p>{item.label}</p>
                                            </Link>
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
