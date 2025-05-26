import { ExternalLink, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
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

export function ContentCard({ content }: ContentCardProps) {
  return <Card className="overflow-hidden hover:shadow-lg transition-shadow">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={"/placeholder.svg"} alt={"content.user.name"} />
            <AvatarFallback>CD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{"content.user.name"}</p>
            <p className="text-xs text-muted-foreground">
              il y a plus d’un an
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className={`text-white bg-gradient-to-r from-purple-500 to-pink-500`}>
            <ContentCardIcon content={content} />
            <span className="ml-1 text-xs">{getPlatformTitle(content)}</span>
          </Badge>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardHeader>

    <CardContent className="pb-3">
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

    <CardFooter className="pt-3 border-t">
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
