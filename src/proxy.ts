import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWTExtended } from "./types/Auth";
import { getToken } from "next-auth/jwt";
import environment from "./config/environment";

export async function proxy(request: NextRequest) {
  const token: JWTExtended | null = await getToken({
    req: request,
    secret: environment.AUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  if (pathname === "/auth/login" || pathname === "/auth/register") {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      const url = new URL("/auth/login", request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }

    if (token?.user?.roles !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/member")) {
    if (!token) {
      const url = new URL("/auth/login", request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }

    if (pathname === "/member") {
      return NextResponse.redirect(new URL("/member/dashboard", request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/admin/:path*", "/member/:path*"],
};
