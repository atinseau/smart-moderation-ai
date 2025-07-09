import { ExternalLink, MoreHorizontal, Heart, MessageCircle, Eye } from "lucide-react";
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

type ContentCardProps = {
  content: Content
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

export function ContentCard({ content }: ContentCardProps) {

  const platformUrl = useMemo(() => {
    const metadata = typeof content.metadata === "object" && !Array.isArray(content.metadata) && content.metadata ? content.metadata : {};
    if (content.platform === "META" && metadata && metadata.type === "instagram") {
      const shortcode = metadata.shortcode || content.id;
      return `https://www.instagram.com/p/${shortcode}/`;
    }
    return null
  }, [])

  return <Card className="group overflow-hidden hover:shadow-md transition-shadow gap-4 py-4">
    <CardHeader className="gap-0">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className={`text-white bg-gradient-to-r from-purple-500 to-pink-500 h-fit`}>
            <ContentCardIcon content={content} />
            <span className="ml-1 text-xs">{getPlatformTitle(content)}</span>
          </Badge>
          <ContentCardActionButton icon={MoreHorizontal} />
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
        {platformUrl
          ? <Link href={platformUrl} target="_blank">
            <ContentCardActionButton icon={ExternalLink} />
          </Link>
          : null
        }
      </div>
    </CardFooter>
  </Card>
}
