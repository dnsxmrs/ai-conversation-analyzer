// (auth)/layout.tsx — Server Component
// Reads session on the server → redirects instantly if not authenticated.
// No client-side session waterfall.

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SidebarNav } from "./sidebar-nav";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // Hard redirect — happens before any HTML is sent to the browser
    if (!session?.user) {
        redirect("/sign-in");
    }

    return <SidebarNav>{children}</SidebarNav>;
}
