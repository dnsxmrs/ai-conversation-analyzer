import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { twoFactor, emailOTP } from "better-auth/plugins";
import prisma from "@/lib/prisma";
import { sendPasswordResetOtp } from "@/lib/mailer";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        twoFactor(),
        emailOTP({
            // OTP is valid for 10 minutes
            expiresIn: 600,
            async sendVerificationOTP({ email, otp, type }) {
                if (type === "forget-password") {
                    await sendPasswordResetOtp({ to: email, otp });
                }
            },
        }),
    ],
});