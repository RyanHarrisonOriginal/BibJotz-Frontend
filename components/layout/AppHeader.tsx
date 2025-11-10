import { Compass } from "lucide-react"
import SideBarTrigger from "@/components/ui/SideBar/sidebarTrigger"

export const AppHeader = () => {

    return (
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10 flex items-center px-6">
            <SideBarTrigger className="mr-4" /> 
            <div className="flex items-center gap-3">
              <Compass className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-serif font-bold text-foreground">
                BibJotz
              </h1>
            </div>
          </header>
    )
}