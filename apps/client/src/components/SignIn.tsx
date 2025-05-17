import { signIn } from "@/auth"
import { Button } from "./ui/button"

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn('google')
      }}
    >
      <Button variant="secondary" type="submit">Sign in</Button>
    </form>
  )
}
