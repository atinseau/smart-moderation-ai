import { auth } from "@/auth";
import { AccessTokenGuard } from "@/guards/AccessTokenGuard";
import { getSessionToken } from "@/lib/functions/getSessionToken.server";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth()
  if (!session) {
    return redirect("/")
  }
  return <AccessTokenGuard accessTokenPromise={getSessionToken()}>
    {children}
  </AccessTokenGuard>
}
