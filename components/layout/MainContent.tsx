'use client'

import { useSideBar } from "@/components/ui/SideBar/sidebarProvider"
import { cn } from "@/lib/utils"

interface MainContentProps {
  children: React.ReactNode
  className?: string
}

export function MainContent({ children, className }: MainContentProps) {
  const { state, isMobile } = useSideBar()

  return (
    <div
      className={cn(
        "flex-1 flex flex-col transition-[margin-left] duration-200 ease-linear",
        // On mobile, no margin needed (sidebar is overlay)
        isMobile && "ml-0",
        // On desktop: when expanded, use full sidebar width; when collapsed (offcanvas), no margin (sidebar slides off)
        !isMobile && state === "expanded" && "md:ml-[var(--sidebar-width)]",
        !isMobile && state === "collapsed" && "md:ml-0",
        className
      )}
    >
      {children}
    </div>
  )
}

