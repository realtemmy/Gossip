"use client"
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SignInFacebook from "@/components/sign-in-facebook";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const handleGoogleSignIn = async () => {
      await signIn("google", { callbackUrl: "/" });
  }
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Welcome back</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-300"></div>
              <span className="text-sm text-gray-500">Or continue with</span>
              <div className="h-px flex-1 bg-gray-300"></div>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
            <FcGoogle className="mr-2 size-5" />
          </Button>
          {/* <SignInFacebook /> */}
          <div className="my-4 text-sm text-slate-400">
            <p>
              Don't have an account?{" "}
              <Link className="text-black hover:underline" href="/signup">
                {" "}
                Sign up
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
