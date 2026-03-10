"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, Trash2, ArrowRight } from "lucide-react";

export function NewAnalysisLink() {
    return (
        <Link
            href="/conversations/upload"
            className={buttonVariants({
                className: "gap-2 rounded-full px-5 font-medium bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-neutral-200"
            })}
        >
            <Plus className="w-4 h-4" />
            Analyze New Chat
        </Link>
    );
}

export function UploadConversationLink() {
    return (
        <Link href="/conversations/upload" className={buttonVariants({ className: "rounded-full" })}>
            Upload Conversation
        </Link>
    );
}

export function DeleteButton() {
    return (
        <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 -ml-2"
        >
            <Trash2 className="w-4 h-4 mr-1.5" />
            Delete
        </Button>
    );
}

export function ViewReportLink({ id, status }: { id: string; status: string }) {
    return (
        <Link
            href={`/conversations/${id}`}
            className={buttonVariants({
                size: "sm",
                variant: status === "completed" ? "default" : "secondary",
            })}
        >
            {status === "completed" ? "View Report" : "View"}
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
        </Link>
    );
}
