'use client';

import { Compass } from "lucide-react"
import SideBarTrigger from "@/components/ui/SideBar/sidebarTrigger"
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs"

export const AppHeader = () => {
    const { user } = useUser();

    return (
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-between px-6">
            <div className="flex items-center">
                <SideBarTrigger className="mr-4" /> 
                <div className="flex items-center gap-3">
                  <Compass className="h-6 w-6 text-primary" />
                  <h1 className="text-2xl font-serif font-bold text-foreground">
                    BibJotz
                  </h1>
                </div>
            </div>
            
            {/* User Info Section */}
            <div className="flex items-center">
                <SignedIn>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-foreground">
                            {user?.fullName || user?.emailAddresses[0]?.emailAddress || 'User'}
                        </span>
                        <UserButton />
                    </div>
                </SignedIn>
                <SignedOut>
                    <SignInButton mode="modal">
                        <button className="text-sm font-medium text-primary hover:underline">
                            Sign In
                        </button>
                    </SignInButton>
                </SignedOut>
            </div>
        </header>
    )
}