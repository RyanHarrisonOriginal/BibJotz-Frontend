import { cn } from "@/lib/utils"
import * as React from "react"

const SideBarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn("flex w-full min-w-0 flex-col gap-1", className)}
    {...props}
  />
))

SideBarMenu.displayName = "SideBarMenu"

export default SideBarMenu