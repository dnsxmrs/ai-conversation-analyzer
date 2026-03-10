import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";

const authPages = ["/login", "/register"];
const publicPrefixes = ["/api/auth", "/login", "/register"];

const isStaticAsset = (pathname: string) => /\.[^/]+$/.test(pathname);

const isPublicPath = (pathname: string) =>
    publicPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (isStaticAsset(pathname) || pathname.startsWith("/_next")) {
        return NextResponse.next();
    }

    // Automatically redirect landing page to sign-in
    // if (pathname === "/") {
    //     return NextResponse.redirect(new URL("/login", request.url));
    // }

    if (pathname.startsWith("/api/auth")) {
        return NextResponse.next();
    }


    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
