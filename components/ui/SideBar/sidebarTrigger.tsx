'use client'
import { cn } from "@/public/lib/utils"
import { Button } from "@/components/ui/button"
import { useSideBar } from "@/components/ui/SideBar/sidebarProvider"
import { PanelLeft } from "lucide-react"
import * as React from "react"



const SideBarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSideBar()

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SideBarTrigger.displayName = "SideBarTrigger"

export default SideBarTrigger