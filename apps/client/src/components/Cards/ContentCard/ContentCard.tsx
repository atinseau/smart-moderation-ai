import { ExternalLink, Heart, MessageCircle, Eye, Check, BadgeCheck } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import Image from "next/image";
import { Content } from "@smart-moderation-ai/db";
import { ContentCardIcon } from "./ContentCardIcon";
import { getPlatformTitle } from "./utils/getPlatformTitle";
import { ContentCardReaction } from "./ContentCardReaction";
import { ContentCardActionButton } from "./ContentCardActionButton";
import Link from "next/link";
import { useMemo } from "react";
import { ContentCardHeaderDropdown } from "./ContentCardHeaderDropdown";
import { cn } from "@/lib/utils";

type ContentCardProps = {
  content: Content
  selectionMode?: boolean
  isSelected?: boolean
  isModerated?: boolean
  onSelect?: (id: string) => void
  onDelete?: (content: Content) => void | Promise<void>
}

export function ContentCard({ content, onDelete, isSelected, onSelect, ...props }: ContentCardProps) {
  const platformUrl = useMemo(() => {
    const metadata = typeof content.metadata === "object" && !Array.isArray(content.metadata) && content.metadata ? content.metadata : {};
    if (content.platform === "META" && metadata && metadata.type === "instagram") {
      const shortcode = metadata.shortcode || content.id;
      return `https://www.instagram.com/p/${shortcode}/`;
    }
    return null
  }, [])

  return <Card
    onClick={() => {
      if (props.selectionMode) {
        onSelect?.(content.id);
      }
    }}
    className={cn(
      "relative group overflow-hidden hover:shadow-md transition-all gap-4 py-4",
      props.selectionMode ? "cursor-pointer" : null,
      props.selectionMode && !isSelected ? "animate-pulse" : null,
      props.selectionMode && isSelected ? "duration-200 ring-2 ring-primary ring-offset-2" : null
    )}>

    <CardHeader className="gap-0">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <div className="flex gap-4">
              <Badge variant="secondary" className={`text-white bg-gradient-to-r from-purple-500 to-pink-500 h-fit`}>
                <ContentCardIcon content={content} />
                <span className="ml-1 text-xs">{getPlatformTitle(content)}</span>
              </Badge>
            </div>
            {props.isModerated
              ? <BadgeCheck className="text-yellow-500" />
              : null
            }
            {props.selectionMode
              ? <button
                onClick={() => onSelect?.(content.id)}
                className={cn(
                  "cursor-pointer w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center",
                  isSelected
                    ? "bg-primary border-primary text-primary-foreground shadow-sm"
                    : "border-muted-foreground/30 hover:border-muted-foreground/50 bg-background",
                )}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
              : null
            }
          </div>
          {/* DISABLED IN SELECTION MODE */}
          {!props.selectionMode
            ? <ContentCardHeaderDropdown onDelete={() => onDelete?.(content)} />
            : null
          }
        </div>
        <p className="text-xs text-muted-foreground">
          il y a plus d’un an
        </p>
      </div>
    </CardHeader>

    <CardContent className="px-0">
      {content.imageUrl ? <div className="mb-3 overflow-hidden">
        <Image
          src={content.imageUrl}
          alt="Contenu"
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
      </div> : null}
      <p className="text-sm text-gray-700 line-clamp-3 px-4">{content.title}</p>
    </CardContent>

    <CardFooter>
      <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <ContentCardReaction iconClassName="text-red-500" icon={Heart} label="1000" />
          <ContentCardReaction iconClassName="text-blue-500" icon={MessageCircle} label="1000" />
          <ContentCardReaction iconClassName="text-gray-400" icon={Eye} label="1000" />
        </div>
        {(platformUrl && !props.selectionMode)
          ? <Link href={platformUrl} target="_blank">
            <ContentCardActionButton icon={ExternalLink} />
          </Link>
          : null
        }
      </div>
    </CardFooter>
  </Card>
}

// function getPlatformColor(platform: PlatformEnum) {
//   switch (platform) {
//     case "INSTAGRAM":
//       return "bg-gradient-to-r from-purple-500 to-pink-500"
//     case "TWITTER":
//       return "bg-blue-500"
//     case "FACEBOOK":
//       return "bg-blue-600"
//     case "YOUTUBE":
//       return "bg-red-500"
//     case "LINKEDIN":
//       return "bg-blue-700"
//     default:
//       return "bg-gray-500"
//   }
// }
