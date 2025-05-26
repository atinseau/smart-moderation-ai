import { Content } from "@smart-moderation-ai/db";



export function getPlatformTitle(content: Content) {
  if (content.platform === "META" && (content.metadata as { type: string }).type === "instagram") {
    return "Instagram";
  }
  return "unknown platform";
}
