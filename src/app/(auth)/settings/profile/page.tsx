"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Loader2, Pencil, Trash2, X } from "lucide-react";

export default function ProfilePage() {
    const { data: session } = authClient.useSession();

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(session?.user?.name || "");
    const [email, setEmail] = useState(session?.user?.email || "");
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState("");
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Delete account state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deletePassword, setDeletePassword] = useState("");
    const [deleteStep, setDeleteStep] = useState<"password" | "confirm">("password");
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    const handleEdit = () => {
        setName(session?.user?.name || "");
        setEmail(session?.user?.email || "");
        setIsEditing(true);
        setSaveSuccess(false);
        setSaveError("");
    };

    const handleCancel = () => {
        setIsEditing(false);
        setSaveError("");
    };

    const handleSave = async () => {
        setSaving(true);
        setSaveError("");
        setSaveSuccess(false);
        try {
            const { error } = await authClient.updateUser({
                name,
            });
            if (error) {
                setSaveError(error.message || "Failed to update profile");
            } else {
                setSaveSuccess(true);
                setIsEditing(false);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setSaveError(err.message);
            } else {
                setSaveError("An unexpected error occurred");
            }
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteAccount = async () => {
        setDeleting(true);
        setDeleteError("");
        try {
            const { error } = await authClient.deleteUser({
                password: deletePassword,
            });
            if (error) {
                setDeleteError(error.message || "Failed to delete account");
            } else {
                window.location.href = "/login";
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setDeleteError(err.message);
            } else {
                setDeleteError("An unexpected error occurred");
            }
        } finally {
            setDeleting(false);
        }
    };

    const openDeleteDialog = () => {
        setDeleteDialogOpen(true);
        setDeleteStep("password");
        setDeletePassword("");
        setDeleteError("");
    };

    if (!session?.user) {
        return <div className="text-muted-foreground">Loading...</div>;
    }

    return (
        <div className="space-y-8">
            {/* Profile Information */}
            <div>
                <h2 className="text-lg font-semibold">Profile information</h2>
                <p className="text-sm text-muted-foreground mb-4">Update your name and email address</p>

                <div className="space-y-4 max-w-md">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={isEditing ? name : session.user.name || ""}
                            onChange={(e) => setName(e.target.value)}
                            readOnly={!isEditing}
                            className={isEditing ? "" : "bg-muted/50"}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            value={isEditing ? email : session.user.email || ""}
                            onChange={(e) => setEmail(e.target.value)}
                            readOnly
                            className="bg-muted/50"
                        />
                        {isEditing && (
                            <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
                        )}
                    </div>

                    {saveError && (
                        <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
                            {saveError}
                        </div>
                    )}

                    {saveSuccess && (
                        <div className="p-3 rounded-md bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm">
                            Profile updated successfully.
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        {isEditing ? (
                            <>
                                <Button onClick={handleSave} disabled={saving} size="sm">
                                    {saving ? (
                                        <>
                                            <Loader2 className="size-4 mr-1 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        "Save"
                                    )}
                                </Button>
                                <Button onClick={handleCancel} variant="outline" size="sm" disabled={saving}>
                                    <X className="size-4 mr-1" />
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <Button onClick={handleEdit} variant="outline" size="sm">
                                <Pencil className="size-4 mr-1" />
                                Edit
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Separator */}
            <div className="border-t" />

            {/* Delete Account */}
            <div>
                <h2 className="text-lg font-semibold">Delete account</h2>
                <p className="text-sm text-muted-foreground mb-4">Delete your account and all of its resources</p>

                <div className="rounded-lg border border-red-200 dark:border-red-800/50 bg-red-50/50 dark:bg-red-900/10 p-4">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="size-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-red-600 dark:text-red-400">Warning</p>
                            <p className="text-sm text-red-600/80 dark:text-red-400/80 mt-1">
                                Please proceed with caution, this cannot be undone.
                            </p>
                            <Button
                                variant="destructive"
                                size="sm"
                                className="mt-3"
                                onClick={openDeleteDialog}
                            >
                                <Trash2 className="size-4 mr-1" />
                                Delete account
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Account Modal */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    {deleteStep === "password" ? (
                        <>
                            <DialogHeader>
                                <DialogTitle>Confirm your password</DialogTitle>
                                <DialogDescription>
                                    Enter your password to confirm account deletion.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-2">
                                <div className="space-y-2">
                                    <Label htmlFor="delete-password">Password</Label>
                                    <Input
                                        id="delete-password"
                                        type="password"
                                        value={deletePassword}
                                        onChange={(e) => setDeletePassword(e.target.value)}
                                        placeholder="Enter your password"
                                    />
                                </div>
                                {deleteError && (
                                    <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
                                        {deleteError}
                                    </div>
                                )}
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        if (!deletePassword) {
                                            setDeleteError("Password is required");
                                            return;
                                        }
                                        setDeleteError("");
                                        setDeleteStep("confirm");
                                    }}
                                    disabled={!deletePassword}
                                >
                                    Continue
                                </Button>
                            </DialogFooter>
                        </>
                    ) : (
                        <>
                            <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove all of your data, including conversations and analysis reports.
                                </DialogDescription>
                            </DialogHeader>
                            {deleteError && (
                                <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
                                    {deleteError}
                                </div>
                            )}
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={deleting}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={handleDeleteAccount}
                                    disabled={deleting}
                                >
                                    {deleting ? (
                                        <>
                                            <Loader2 className="size-4 mr-1 animate-spin" />
                                            Deleting...
                                        </>
                                    ) : (
                                        "Yes, delete my account"
                                    )}
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
