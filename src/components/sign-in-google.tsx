import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/auth"
import { Button } from "./ui/button";

export default function SignInGoogle() {
  return (
    <form
     className="w-full"
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <Button variant="outline" className="w-full">
        <FcGoogle className="mr-2 size-5" />
      </Button>
    </form>
  )
} 