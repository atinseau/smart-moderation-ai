import { auth } from "@/auth";
import { SignIn } from "@/components/SignIn";
import { SignOut } from "@/components/SignOut";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {

  const session = await auth()

  return (<div className="flex gap-2 p-2">
    {!session ? <SignIn /> : <SignOut />}
    {session
      ? <Button>
        <Link href="/me">Me</Link>
      </Button> : null}
  </div>);
}
