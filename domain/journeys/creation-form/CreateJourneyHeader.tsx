import { Compass } from "lucide-react";

export const CreateJourneyHeader = () => {
    return (
        <div>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4">
                <Compass className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-4xl font-serif font-semibold tracking-tight mb-3">
                Start a New Journey
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
                Create a personalized study using a guide template. Select a guide that matches your learning goals, then give your journey a meaningful name.
            </p>
        </div>
    );
};

