import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const Login = () => {
    const getUsers = async () => {
        const users = await fetch("http://localhost:3000/api/users", {
            method: "GET"
        });
        // console.log("Users: ",await users.json())
    }
    getUsers()
    const handleSubmit = async () => {

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
                    <Button variant="outline" className="w-full">
                        Login with Google
                    </Button>

                    <div className="my-4 text-sm text-slate-400">
                        <p>Don't have an account? <Link className="text-black hover:underline" href="/signup"> Sign up</Link></p>
                    </div>
                </CardFooter>

            </Card>
        </div>

    )
}

export default Login
