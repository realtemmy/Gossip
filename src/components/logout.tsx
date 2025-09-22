"use server"
import { signOut } from "@/auth";
import { Button } from "./ui/button";

export const LogOutButton = async () => {
  const handleLogout = async () => signOut();
  return <Button onClick={handleLogout}>Logout</Button>;
};
