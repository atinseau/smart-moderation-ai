import { LinkPopup } from "@/components/LinkPopup";
import { getFacebookAuthUrl } from "@/lib/functions/getFacebookAuthUrl.server";



export default async function Home() {

  return (<div>
    <LinkPopup url={getFacebookAuthUrl()}>Facebook oauth</LinkPopup>
  </div>);
}
