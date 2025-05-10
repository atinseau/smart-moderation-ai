import { auth } from "@/auth";
import { SignIn } from "@/components/SignIn";
import { SignOut } from "@/components/SignOut";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {

  const session = await auth()

  return (<div>
    {!session ? <SignIn /> : <SignOut />}
    <Button>
      <Link href="/me">Me</Link>
    </Button>
  </div>);
}
