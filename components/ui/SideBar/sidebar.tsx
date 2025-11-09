import * as React from "react"
import { cn } from "@/lib/utils"



interface SideBarProps  {
    side?: "left" | "right"
    collapsible?: "offcanvas" | "icon" | "none"
    variant?: "sidebar" | "floating" | "inset"
}

const defaultProps: SideBarProps = {
    side: "left",
    collapsible: "offcanvas",
    variant: "sidebar"
}

  
const SideBar = React.forwardRef<
    HTMLDivElement, 
    React.ComponentProps<"div"> & SideBarProps> 
    (
        (
            {
               side = defaultProps.side,
               collapsible = defaultProps.collapsible,
               variant = defaultProps.variant,
               className,
               children,
               ...props
            }, 
            ref
        ) => {

    return (
        <div
          ref={ref}
          className={cn(
            "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
            className
          )}
          data-collapsible={collapsible}
          data-variant={variant}
          {...props}
        >
          {children}
        </div>
    )
    }
)

SideBar.displayName = "SideBar"

export default SideBar
