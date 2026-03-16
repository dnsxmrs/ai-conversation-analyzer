"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { buttonVariants } from "./ui/button";

export function Navbar() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto px-4 flex h-14 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <MessageSquare className="h-6 w-6 text-primary" />
                    <span className="font-medium">
                        AI Conversation Analyzer
                    </span>
                </Link>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    {pathname !== "/sign-in" && pathname !== "/register" && (
                        <Link href="/sign-in" className={buttonVariants({ size: "sm" })}>
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
