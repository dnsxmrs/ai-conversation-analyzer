"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function signInAction(values: { email: string; password: string; rememberMe: boolean }) {
    const { email, password, rememberMe } = values;

    try {
        const response = await auth.api.signInEmail({
            body: {
                email,
                password,
                rememberMe,
            },
            headers: await headers(),
        });

        return { success: true, data: response };
    } catch (e: unknown) {
        const error = e as Error;
        return { success: false, error: error.message || "An unexpected error occurred" };
    }
}

export async function signUpAction(values: { email: string; password: string; name: string; rememberMe: boolean }) {
    const { email, password, name, rememberMe } = values;

    try {
        const response = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name,
            },
            headers: await headers(),
        });

        // If rememberMe is true, we might want to extend the session
        // in a real-world scenario, but Better Auth handles registration auto-sign-in
        // with default session settings.
        console.log("Registered with rememberMe:", rememberMe);

        return { success: true, data: response };
    } catch (e: unknown) {
        const error = e as Error;
        return { success: false, error: error.message || "An unexpected error occurred" };
    }
}
