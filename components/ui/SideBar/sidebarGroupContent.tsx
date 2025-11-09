import * as React from "react"
import { cn } from "@/lib/utils"

const SideBarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("w-full text-sm", className)}
    {...props}
  />
))

SideBarGroupContent.displayName = "SideBarGroupContent"

export default SideBarGroupContent