import { cn } from "@/public/lib/utils"
import * as React from "react"


const SideBarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("group/menu-item relative", className)}
    {...props}
  />
))

SideBarMenuItem.displayName = "SidebarMenuItem"

export default SideBarMenuItem