import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

const protectedRoutes = ["user"];

export default async function midddleware(request: NextRequest) {
  const session = await auth();

  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if(isProtected && !session){
    return NextResponse.redirect(new URL("/auth"));
  }

  return NextResponse.next();
}
