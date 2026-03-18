import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";

const authPages = ["/sign-in", "/sign-up", "/forgot-password"];
const publicPaths = ["/", "/sign-in", "/sign-up", "/forgot-password"];
const publicPrefixes = ["/api/auth"];

const isStaticAsset = (pathname: string) => /\.[^/]+$/.test(pathname);

const isPublicPath = (pathname: string) =>
    publicPaths.includes(pathname) ||
    publicPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

const isSafeCallbackPath = (value: string | null) =>
    Boolean(value && value.startsWith("/") && !value.startsWith("//"));

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (isStaticAsset(pathname) || pathname.startsWith("/_next")) {
        return NextResponse.next();
    }

    // Automatically redirect landing page to sign-in
    // if (pathname === "/") {
    //     return NextResponse.redirect(new URL("/sign-in", request.url));
    // }

    if (pathname.startsWith("/api/auth")) {
        return NextResponse.next();
    }

    const session = await auth.api.getSession({
        headers: request.headers,
    });
    const isAuthenticated = Boolean(session?.user);

    if (pathname === "/" && isAuthenticated) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (authPages.includes(pathname) && isAuthenticated) {
        const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
        let destinationPath = "/dashboard";

        if (callbackUrl && isSafeCallbackPath(callbackUrl) && !authPages.includes(callbackUrl)) {
            destinationPath = callbackUrl;
        }

        return NextResponse.redirect(new URL(destinationPath, request.url));
    }

    if (!isAuthenticated && !isPublicPath(pathname)) {
        if (pathname.startsWith("/api/")) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const signInUrl = new URL("/sign-in", request.url);
        const callbackPath = `${pathname}${request.nextUrl.search}`;
        signInUrl.searchParams.set("callbackUrl", callbackPath);

        return NextResponse.redirect(signInUrl);
    }


    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
