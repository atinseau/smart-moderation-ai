import { auth } from "@/auth";
import { SignIn } from "@/components/SignIn";
import { SignOut } from "@/components/SignOut";
import Link from "next/link";

export default async function Home() {

  const session = await auth()

  return (<div>
    {!session ? <SignIn/> : <SignOut/>}
    <Link href="/me">Me</Link>
  </div>);
}
