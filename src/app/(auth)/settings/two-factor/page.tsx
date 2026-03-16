"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import {
    Loader2,
    ShieldCheck,
    ShieldOff,
    Eye,
    EyeOff,
    Download,
    Copy,
    Check,
} from "lucide-react";

export default function TwoFactorPage() {
    const { data: session } = authClient.useSession();
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [loading, setLoading] = useState(true);

    // Enable flow
    const [enableDialogOpen, setEnableDialogOpen] = useState(false);
    const [enableStep, setEnableStep] = useState<"qr" | "verify">("qr");
    const [password, setPassword] = useState("");
    const [totpURI, setTotpURI] = useState("");
    const [secret, setSecret] = useState("");
    const [totpCode, setTotpCode] = useState("");
    const [enabling, setEnabling] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [enableError, setEnableError] = useState("");

    // Recovery codes
    const [backupCodes, setBackupCodes] = useState<string[]>([]);
    const [showCodes, setShowCodes] = useState(false);
    const [copiedCode, setCopiedCode] = useState(false);

    // Disable flow
    const [disableDialogOpen, setDisableDialogOpen] = useState(false);
    const [disablePassword, setDisablePassword] = useState("");
    const [disabling, setDisabling] = useState(false);
    const [disableError, setDisableError] = useState("");

    useEffect(() => {
        if (session?.user) {
            // Check if 2FA is enabled via session
            setIs2FAEnabled(
                (session.user as Record<string, unknown>).twoFactorEnabled === true
            );
            setLoading(false);
        }
    }, [session]);

    // Enable 2FA - Step 1: Generate QR code
    const handleStartEnable = async () => {
        setEnabling(true);
        setEnableError("");

        try {
            const { data, error } = await authClient.twoFactor.enable({
                password,
            });

            if (error) {
                setEnableError(error.message || "Failed to enable 2FA");
            } else if (data) {
                setTotpURI(data.totpURI);
                // Extract secret from URI for manual entry
                const secretMatch = data.totpURI.match(/secret=([^&]+)/);
                if (secretMatch) setSecret(secretMatch[1]);
                setBackupCodes(data.backupCodes);
                setEnableStep("qr");
                setPassword("");
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setEnableError(err.message);
            } else {
                setEnableError("An unexpected error occurred");
            }
        } finally {
            setEnabling(false);
        }
    };

    // Enable 2FA - Step 2: Verify TOTP code
    const handleVerifyTotp = async () => {
        setVerifying(true);
        setEnableError("");

        try {
            const { error } = await authClient.twoFactor.verifyTotp({
                code: totpCode,
            });

            if (error) {
                setEnableError(error.message || "Invalid verification code");
            } else {
                setIs2FAEnabled(true);
                setEnableDialogOpen(false);
                setTotpCode("");
                setEnableStep("qr");
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setEnableError(err.message);
            } else {
                setEnableError("An unexpected error occurred");
            }
        } finally {
            setVerifying(false);
        }
    };

    // Disable 2FA
    const handleDisable = async () => {
        setDisabling(true);
        setDisableError("");

        try {
            const { error } = await authClient.twoFactor.disable({
                password: disablePassword,
            });

            if (error) {
                setDisableError(error.message || "Failed to disable 2FA");
            } else {
                setIs2FAEnabled(false);
                setDisableDialogOpen(false);
                setDisablePassword("");
                setBackupCodes([]);
                setShowCodes(false);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setDisableError(err.message);
            } else {
                setDisableError("An unexpected error occurred");
            }
        } finally {
            setDisabling(false);
        }
    };

    // Download recovery codes
    const handleDownloadCodes = () => {
        const content = [
            "AI Conversation Analyzer - Recovery Codes",
            "==========================================",
            "",
            "Keep these codes in a safe place.",
            "Each code can only be used once.",
            "",
            ...backupCodes.map((code, i) => `${i + 1}. ${code}`),
            "",
            `Generated: ${new Date().toLocaleString()}`,
        ].join("\n");

        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "aca-recovery-codes.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Copy secret to clipboard
    const handleCopySecret = async () => {
        await navigator.clipboard.writeText(secret);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
    };

    const openEnableDialog = () => {
        setEnableDialogOpen(true);
        setEnableStep("qr");
        setPassword("");
        setTotpURI("");
        setSecret("");
        setTotpCode("");
        setEnableError("");
    };

    if (loading) {
        return <div className="text-muted-foreground">Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold">Two-factor authentication</h2>
                <p className="text-sm text-muted-foreground mt-1">
                    Add additional security to your account using TOTP two-factor authentication
                </p>
            </div>

            {/* Status */}
            <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Status:</span>
                {is2FAEnabled ? (
                    <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                        <ShieldCheck className="size-3.5 mr-1" />
                        Enabled
                    </Badge>
                ) : (
                    <Badge variant="secondary">
                        <ShieldOff className="size-3.5 mr-1" />
                        Disabled
                    </Badge>
                )}
            </div>

            {is2FAEnabled ? (
                /* ===== 2FA Enabled State ===== */
                <div className="space-y-6">
                    {/* Recovery Codes */}
                    {backupCodes.length > 0 && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">Recovery codes</Label>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShowCodes(!showCodes)}
                                    >
                                        {showCodes ? (
                                            <>
                                                <EyeOff className="size-3.5 mr-1" />
                                                Hide
                                            </>
                                        ) : (
                                            <>
                                                <Eye className="size-3.5 mr-1" />
                                                View
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleDownloadCodes}
                                    >
                                        <Download className="size-3.5 mr-1" />
                                        Download
                                    </Button>
                                </div>
                            </div>

                            {showCodes && (
                                <div className="grid grid-cols-2 gap-2">
                                    {backupCodes.map((code, index) => (
                                        <div
                                            key={index}
                                            className="px-3 py-2 bg-zinc-100 dark:bg-zinc-900 rounded font-mono text-center text-sm"
                                        >
                                            {code}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                                ⚠️ Store these codes securely. They can be used to access your account if you lose your authenticator.
                            </p>
                        </div>
                    )}

                    {/* Disable 2FA */}
                    <div className="border-t pt-6">
                        <Button
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:hover:bg-red-900/20"
                            onClick={() => {
                                setDisableDialogOpen(true);
                                setDisablePassword("");
                                setDisableError("");
                            }}
                        >
                            <ShieldOff className="size-4 mr-1" />
                            Disable two-factor authentication
                        </Button>
                    </div>
                </div>
            ) : (
                /* ===== 2FA Disabled State ===== */
                <div>
                    <p className="text-sm text-muted-foreground mb-4">
                        Two-factor authentication adds an additional layer of security to your account by
                        requiring a code from your authenticator app during sign-in.
                    </p>
                    <Button onClick={openEnableDialog}>
                        <ShieldCheck className="size-4 mr-1" />
                        Enable two-factor authentication
                    </Button>
                </div>
            )}

            {/* ===== Enable 2FA Dialog ===== */}
            <Dialog open={enableDialogOpen} onOpenChange={setEnableDialogOpen}>
                <DialogContent className="sm:max-w-lg z-50">
                    {!totpURI ? (
                        /* Step 0: Enter password to generate QR */
                        <div className="p-4 z-50">
                            <DialogHeader>
                                <DialogTitle>Enable two-factor authentication</DialogTitle>
                                <DialogDescription>
                                    Enter your password to get started.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-2">
                                <div className="space-y-2">
                                    <Label htmlFor="enable-password">Password</Label>
                                    <Input
                                        id="enable-password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                    />
                                </div>
                                {enableError && (
                                    <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
                                        {enableError}
                                    </div>
                                )}
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setEnableDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={handleStartEnable} disabled={enabling || !password}>
                                    {enabling ? (
                                        <>
                                            <Loader2 className="size-4 mr-1 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        "Continue"
                                    )}
                                </Button>
                            </DialogFooter>
                        </div>
                    ) : enableStep === "qr" ? (
                        /* Step 1: Show QR code */
                        <>
                            <DialogHeader>
                                <DialogTitle>Scan QR code</DialogTitle>
                                <DialogDescription>
                                    Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-2">
                                <div className="flex justify-center p-6 bg-white rounded-lg border border-border">
                                    <QRCodeSVG
                                        value={totpURI}
                                        size={200}
                                        level="M"
                                        includeMargin={false}
                                    />
                                </div>

                                {/* Manual code */}
                                <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground">
                                        Or enter this code manually:
                                    </Label>
                                    <div className="flex items-center gap-2">
                                        <code className="flex-1 px-3 py-2 bg-muted rounded-md text-sm font-mono break-all">
                                            {secret}
                                        </code>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="shrink-0"
                                            onClick={handleCopySecret}
                                        >
                                            {copiedCode ? (
                                                <Check className="size-4 text-green-600" />
                                            ) : (
                                                <Copy className="size-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setEnableDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={() => { setEnableStep("verify"); setEnableError(""); }}>
                                    Continue
                                </Button>
                            </DialogFooter>
                        </>
                    ) : (
                        /* Step 2: Verify TOTP code */
                        <>
                            <DialogHeader>
                                <DialogTitle>Verify authenticator</DialogTitle>
                                <DialogDescription>
                                    Enter the 6-digit code displayed in your authenticator app to confirm setup.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-2">
                                <div className="space-y-2">
                                    <Label htmlFor="totp-code">Verification code</Label>
                                    <Input
                                        id="totp-code"
                                        type="text"
                                        value={totpCode}
                                        onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                        placeholder="000000"
                                        className="text-center text-lg tracking-widest font-mono"
                                        maxLength={6}
                                    />
                                </div>
                                {enableError && (
                                    <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
                                        {enableError}
                                    </div>
                                )}
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setEnableStep("qr")}>
                                    Back
                                </Button>
                                <Button onClick={handleVerifyTotp} disabled={verifying || totpCode.length !== 6}>
                                    {verifying ? (
                                        <>
                                            <Loader2 className="size-4 mr-1 animate-spin" />
                                            Verifying...
                                        </>
                                    ) : (
                                        "Verify & Enable"
                                    )}
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* ===== Disable 2FA Dialog ===== */}
            <Dialog open={disableDialogOpen} onOpenChange={setDisableDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Disable two-factor authentication</DialogTitle>
                        <DialogDescription>
                            Enter your password to confirm disabling 2FA. This will make your account less secure.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div className="space-y-2">
                            <Label htmlFor="disable-password">Password</Label>
                            <Input
                                id="disable-password"
                                type="password"
                                value={disablePassword}
                                onChange={(e) => setDisablePassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                        </div>
                        {disableError && (
                            <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
                                {disableError}
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDisableDialogOpen(false)} disabled={disabling}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDisable}
                            disabled={disabling || !disablePassword}
                        >
                            {disabling ? (
                                <>
                                    <Loader2 className="size-4 mr-1 animate-spin" />
                                    Disabling...
                                </>
                            ) : (
                                "Disable 2FA"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
