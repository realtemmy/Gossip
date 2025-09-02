import { FaFacebookF } from "react-icons/fa";
import { signIn } from "@/auth";
import { Button } from "./ui/button";

export default function SignInFacebook() {
  return (
    <form
      className="w-full"
      action={async () => {
        "use server";
        await signIn("facebook");
      }}
    >
      <Button variant="outline" className="w-full">
        <FaFacebookF className="mr-2 size-5" />
      </Button>
    </form>
  );
}
