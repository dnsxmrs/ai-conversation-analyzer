"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const settingsTabs = [
    { title: "Profile", href: "/settings/profile" },
    { title: "Password", href: "/settings/password" },
    { title: "Two-factor auth", href: "/settings/two-factor" },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="px-4 py-6 md:px-8 lg:px-12">
            {/* Header */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Settings className="size-4" />
                <span>
                    {settingsTabs.find((tab) => pathname.startsWith(tab.href))?.title || "Profile"} settings
                </span>
            </div>

            <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-1">Manage your profile and account settings</p>
            </div>

            {/* Tab Navigation + Content */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Tabs */}
                <nav className="flex flex-row md:flex-col gap-1 md:w-48 shrink-0">
                    {settingsTabs.map((tab) => {
                        const isActive = pathname.startsWith(tab.href);
                        return (
                            <Link
                                key={tab.href}
                                href={tab.href}
                                className={cn(
                                    "px-3 py-2 text-sm rounded-md transition-colors whitespace-nowrap",
                                    isActive
                                        ? "bg-muted font-medium text-foreground"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                )}
                            >
                                {tab.title}
                            </Link>
                        );
                    })}
                </nav>

                {/* Tab Content */}
                <div className="flex-1 min-w-0">
                    {children}
                </div>
            </div>
        </div>
    );
}
