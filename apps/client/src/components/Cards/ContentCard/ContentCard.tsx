import { ExternalLink, MoreVertical } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
import { Button } from "../../ui/button";
import Image from "next/image";
import { Content } from "@smart-moderation-ai/db";
import { ContentCardIcon } from "./ContentCardIcon";
import { getPlatformTitle } from "./utils/getPlatformTitle";

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
  return <Card className="overflow-hidden hover:shadow-lg transition-shadow gap-4 py-4">
    <CardHeader className="gap-0">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">

          <Badge variant="secondary" className={`text-white bg-gradient-to-r from-purple-500 to-pink-500`}>
            <ContentCardIcon content={content} />
            <span className="ml-1 text-xs">{getPlatformTitle(content)}</span>
          </Badge>
          <p className="text-xs text-muted-foreground">
            il y a plus d’un an
          </p>
        </div>
        <div className="flex items-center space-x-2">

          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardHeader>

    <CardContent>
      {content.imageUrl ? <div className="mb-3 rounded-lg overflow-hidden">
        <Image
          src={content.imageUrl}
          alt="Contenu"
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
      </div> : null}
      <p className="text-sm text-gray-700 line-clamp-3">{content.title}</p>
    </CardContent>

    <CardFooter className="pt-4! border-t">
      <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span>❤️ 1000</span>
          <span>💬 1000</span>
          <span>👁️ 1000</span>
        </div>
        <Button variant="ghost" size="sm" className="h-6 px-2">
          <ExternalLink className="h-3 w-3" />
        </Button>
      </div>
    </CardFooter>
  </Card>
}
