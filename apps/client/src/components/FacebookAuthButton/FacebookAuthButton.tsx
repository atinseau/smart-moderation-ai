import { getFacebookAuthUrl } from "@/lib/functions/getFacebookAuthUrl.server";
import { LinkPopup } from "../LinkPopup";
import { FacebookAuthButtonWrapper } from "./FacebookAuthButtonWrapper";

export function FacebookAuthButton() {
  return <FacebookAuthButtonWrapper>
    <LinkPopup
      url={getFacebookAuthUrl()}
      title="Facebook Auth"
    >
      Facebook oauth
    </LinkPopup>
  </FacebookAuthButtonWrapper>
}
