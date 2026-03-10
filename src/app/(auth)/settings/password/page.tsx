"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default function PasswordPage() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Validation state
    const [validations, setValidations] = useState({
        minLength: false,
        notSameAsCurrent: true,
        passwordsMatch: true,
    });

    useEffect(() => {
        setValidations({
            minLength: newPassword.length >= 12,
            notSameAsCurrent: !currentPassword || !newPassword || newPassword !== currentPassword,
            passwordsMatch: !confirmPassword || newPassword === confirmPassword,
        });
    }, [currentPassword, newPassword, confirmPassword]);

    const isValid =
        currentPassword.length > 0 &&
        newPassword.length >= 12 &&
        newPassword !== currentPassword &&
        newPassword === confirmPassword;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid) return;

        setSaving(true);
        setError("");
        setSuccess(false);

        try {
            const { error: changeError } = await authClient.changePassword({
                currentPassword,
                newPassword,
            });

            if (changeError) {
                setError(changeError.message || "Failed to change password");
            } else {
                setSuccess(true);
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            <h2 className="text-lg font-semibold">Update password</h2>
            <p className="text-sm text-muted-foreground mb-6">
                Ensure your account is using a long, random password to stay secure
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div className="space-y-2">
                    <Label htmlFor="current-password">Current password</Label>
                    <Input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => {
                            setCurrentPassword(e.target.value);
                            setError("");
                            setSuccess(false);
                        }}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="new-password">New password</Label>
                    <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => {
                            setNewPassword(e.target.value);
                            setError("");
                            setSuccess(false);
                        }}
                        required
                    />
                    {/* Validation hints */}
                    {newPassword.length > 0 && (
                        <div className="space-y-1 mt-2">
                            <ValidationHint
                                valid={validations.minLength}
                                message="At least 12 characters"
                            />
                            <ValidationHint
                                valid={validations.notSameAsCurrent}
                                message="Must be different from current password"
                                showOnlyInvalid={!currentPassword}
                            />
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm new password</Label>
                    <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setError("");
                            setSuccess(false);
                        }}
                        required
                    />
                    {confirmPassword.length > 0 && !validations.passwordsMatch && (
                        <div className="flex items-center gap-1.5 text-xs text-red-500 mt-1">
                            <XCircle className="size-3.5" />
                            <span>Passwords do not match</span>
                        </div>
                    )}
                </div>

                {error && (
                    <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                        <AlertCircle className="size-4 shrink-0" />
                        {error}
                    </div>
                )}

                {success && (
                    <div className="p-3 rounded-md bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm flex items-center gap-2">
                        <CheckCircle2 className="size-4 shrink-0" />
                        Password updated successfully.
                    </div>
                )}

                <Button type="submit" disabled={saving || !isValid} size="sm">
                    {saving ? (
                        <>
                            <Loader2 className="size-4 mr-1 animate-spin" />
                            Updating...
                        </>
                    ) : (
                        "Update password"
                    )}
                </Button>
            </form>
        </div>
    );
}

function ValidationHint({
    valid,
    message,
    showOnlyInvalid = false,
}: {
    valid: boolean;
    message: string;
    showOnlyInvalid?: boolean;
}) {
    if (showOnlyInvalid && valid) return null;

    return (
        <div className={`flex items-center gap-1.5 text-xs ${valid ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}>
            {valid ? <CheckCircle2 className="size-3.5" /> : <XCircle className="size-3.5 text-red-400" />}
            <span>{message}</span>
        </div>
    );
}
