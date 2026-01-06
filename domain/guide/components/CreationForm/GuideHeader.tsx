import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type GuideHeaderProps = {
  actionButtonCallback: () => void;
  actionButtonText: string;
  title: string;
  description: string;
}

const GuideHeader = ({ actionButtonCallback, actionButtonText, title, description }: GuideHeaderProps) => {
    return (
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={actionButtonCallback}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          {actionButtonText}
        </Button>
      </div>
    )
  }

export default GuideHeader;