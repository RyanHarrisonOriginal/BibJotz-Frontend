import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/Card/card";
import { Search, Home, ArrowLeft, BookOpen, FileText, User, Library } from "lucide-react";
import { cn } from "@/public/lib/utils";

type EntityType = 
  | "Guide" 
  | "Page" 
  | "User" 
  | "Library" 
  | "Draft"
  | "Resource"
  | string; // Allow custom entity types

interface EntityNotFoundProps {
  entityType?: EntityType;
  message?: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  homeHref?: string;
  className?: string;
}

const entityConfig: Record<string, { icon: typeof Search; defaultMessage: string; defaultDescription: string }> = {
  Guide: {
    icon: BookOpen,
    defaultMessage: "This guide has wandered off",
    defaultDescription: "The guide you're looking for might have been moved, deleted, or perhaps it's still being written. Let's get you back on track.",
  },
  Page: {
    icon: FileText,
    defaultMessage: "This page is missing",
    defaultDescription: "The page you're seeking seems to have vanished into the digital void. Don't worry, we'll help you find your way.",
  },
  User: {
    icon: User,
    defaultMessage: "User not found",
    defaultDescription: "This user profile doesn't exist or may have been removed. Let's explore other paths.",
  },
  Library: {
    icon: Library,
    defaultMessage: "Library section not found",
    defaultDescription: "This section of the library seems to be empty or doesn't exist yet. Time to start building your collection!",
  },
  Draft: {
    icon: FileText,
    defaultMessage: "Draft not found",
    defaultDescription: "This draft might have been published, deleted, or perhaps it's still waiting to be created. Let's create something new!",
  },
  Resource: {
    icon: Library,
    defaultMessage: "Resource not found",
    defaultDescription: "The resource you're looking for isn't available. Let's find something else to explore.",
  },
};

const defaultConfig = {
  icon: Search,
  defaultMessage: "Not found",
  defaultDescription: "What you're looking for doesn't exist here. Let's help you find your way back.",
};

export function EntityNotFound({
  entityType = "Page",
  message,
  description,
  backHref,
  backLabel,
  homeHref = "/",
  className,
}: EntityNotFoundProps) {
  const config = entityConfig[entityType] || defaultConfig;
  const Icon = config.icon;
  
  const displayMessage = message || config.defaultMessage;
  const displayDescription = description || config.defaultDescription;

  return (
    <div className={cn("min-h-[60vh] flex items-center justify-center p-6", className)}>
      <Card className="max-w-lg w-full border-2 border-dashed bg-muted/20 shadow-lg">
        <CardContent className="p-12">
          <div className="text-center space-y-6">
            {/* Icon with animated background */}
            <div className="relative mx-auto w-24 h-24">
              <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse" />
              <div className="relative w-full h-full rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/30">
                <Icon className="h-12 w-12 text-primary" strokeWidth={1.5} />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-3">
              <h1 className="text-3xl font-serif font-bold text-foreground">
                {displayMessage}
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
                {displayDescription}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              {backHref && (
                <Button
                  asChild
                  variant="outline"
                  className="gap-2 border-primary/20 hover:border-primary/40"
                >
                  <Link href={backHref}>
                    <ArrowLeft className="h-4 w-4" />
                    {backLabel || "Go Back"}
                  </Link>
                </Button>
              )}
              <Button
                asChild
                className="gap-2"
              >
                <Link href={homeHref}>
                  <Home className="h-4 w-4" />
                  Return Home
                </Link>
              </Button>
            </div>

            {/* Decorative element */}
            <div className="pt-4">
              <div className="flex items-center justify-center gap-2 text-muted-foreground/40">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-border" />
                <span className="text-xs font-serif italic">404</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-border" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

