import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PageHeaderToolbarProps {
    onBack: () => void;
}

export const PageHeaderToolbar = ({ onBack }: PageHeaderToolbarProps) => {
    return (
        <div className="sticky top-0 z-10 border-b border-border/40 bg-background/80 backdrop-blur-sm">
            <div className="container flex h-14 items-center max-w-7xl mx-auto px-6">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onBack}
                    className="gap-2 -ml-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="text-sm">Back</span>
                </Button>
            </div>
        </div>
    );
};

