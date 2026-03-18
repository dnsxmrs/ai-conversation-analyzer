// src/lib/mailer.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD, // Gmail App Password
    },
});

interface SendOtpOptions {
    to: string;
    otp: string;
}

export async function sendPasswordResetOtp({ to, otp }: SendOtpOptions) {
    await transporter.sendMail({
        from: `"Conversation AI" <${process.env.GMAIL_USER}>`,
        to,
        subject: "Your password reset code",
        text: `Your password reset code is: ${otp}\n\nThis code expires in 10 minutes. If you didn't request this, you can safely ignore this email.`,
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Reset</title>
</head>
<body style="margin:0;padding:0;background-color:#0A0A0F;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0A0F;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;">

          <!-- Logo -->
          <tr>
            <td style="padding-bottom:32px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#6366f1;width:32px;height:32px;border-radius:8px;text-align:center;vertical-align:middle;">
                    <span style="color:#fff;font-size:14px;font-weight:700;">C</span>
                  </td>
                  <td style="padding-left:10px;color:rgba(255,255,255,0.8);font-size:14px;font-weight:600;vertical-align:middle;">
                    Conversation AI
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:40px 36px;">

              <!-- Eyebrow -->
              <p style="margin:0 0 12px;font-family:monospace;font-size:10px;letter-spacing:0.3em;color:rgba(99,102,241,0.6);text-transform:uppercase;">
                Account Recovery
              </p>

              <!-- Headline -->
              <h1 style="margin:0 0 12px;font-size:28px;font-weight:700;color:#ffffff;line-height:1.2;letter-spacing:-0.02em;">
                Reset your<br/>
                <span style="color:rgba(255,255,255,0.3);">password.</span>
              </h1>

              <!-- Body -->
              <p style="margin:0 0 32px;font-size:14px;color:rgba(255,255,255,0.4);line-height:1.6;">
                Use the code below to reset your password. It expires in <strong style="color:rgba(255,255,255,0.6);">10 minutes</strong>.
              </p>

              <!-- OTP Box -->
              <div style="background-color:rgba(99,102,241,0.07);border:1px solid rgba(99,102,241,0.2);border-radius:12px;padding:24px;text-align:center;margin-bottom:32px;">
                <p style="margin:0 0 8px;font-family:monospace;font-size:10px;letter-spacing:0.3em;color:rgba(99,102,241,0.6);text-transform:uppercase;">Your code</p>
                <p style="margin:0;font-family:monospace;font-size:36px;font-weight:700;letter-spacing:0.4em;color:#ffffff;">${otp}</p>
              </div>

              <!-- Warning -->
              <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.2);line-height:1.5;">
                If you didn't request this, you can safely ignore this email. Your password won't change.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:24px;text-align:center;">
              <p style="margin:0;font-family:monospace;font-size:10px;color:rgba(255,255,255,0.1);letter-spacing:0.2em;text-transform:uppercase;">
                v1.0 · Secure Connection
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    });
}
